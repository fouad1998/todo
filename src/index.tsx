import * as React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import TodoAdd from './Components/Adder'
import TodoAddList from './Components/ToDoList'
import Show from './Components/LCD'
import Header from './Components/Header'
import { Job, Work, Options } from './interfaces'
import Param from './Components/Param'
import Note from './Components/Note'
import './css/font-awesome.css'
import './css/bootstrap4.css'
import './css/style.scss'
import { today, reformate, countSeconds, formateTime, greaterOrEqual, DateFr } from './utility'
const alarm = require('./media/alarm.mp3')
const breakTimeSound = require('./media/break-time.mp3')
const ticToc = require('./media/ticToc.mp3')

interface Props {}
interface State {
  alter: boolean
}

class Container extends React.Component<Props, State> {
  private index: number
  private selected = false
  private interval: NodeJS.Timeout
  private beep: HTMLAudioElement = new Audio()
  private ticToc: HTMLAudioElement = new Audio()
  private breakTimeSound: HTMLAudioElement = new Audio()
  private groups: Array<string> = new Array()
  private myList: Array<Job> = new Array()
  private daily: Array<Job> = new Array()
  private working: Map<string, Map<number, Work>> = new Map<string, Map<number, Work>>()
  private showContent: string | number | React.ReactNode
  private counter: number
  private options: Options
  private stayWorking: number
  private leaveWorking: number
  private modifyIndex: number
  private button: boolean
  private playPauseEffect: boolean
  private ticTocPlayingStatus: boolean

  constructor(props: Props) {
    super(props)
    this.state = {
      alter: false,
    }
    // SET ATTRIBUTES
    this.interval = setTimeout(() => {}, 0)
    this.index = -1
    this.modifyIndex = -1
    this.counter = 0
    this.button = false
    this.playPauseEffect = true
    this.stayWorking = 0
    this.showContent = '00:00:00'
    this.beep.src = alarm
    this.ticToc.src = ticToc
    this.breakTimeSound.src = breakTimeSound
    this.beep.loop = true
    this.ticToc.loop = true
    this.ticTocPlayingStatus = false
    const list = JSON.parse(window.localStorage.getItem('todo-list') || '[]')
    this.working = this._createMapFromObject(
      JSON.parse(window.localStorage.getItem('working-data') || '{}'),
      this._createMapFromObject
    ) as Map<string, Map<number, Work>>

    this.options = JSON.parse(
      window.localStorage.getItem('options') ||
        JSON.stringify({ workingTime: 1500, reposeTime: 300 })
    )
    this.leaveWorking = this.options.reposeTime
    // CORRECT THE DATA FOUNDED IN PREVIOUS VERSION
    for (const item of list) {
      item.id = this.counter
      this.counter++
      if (item.finishedDay === undefined || item.finishedDay === 'unknow') {
        item.finishedDay = 'Unknown'
      }
      if (item.group === undefined || item.group === 'unknow') {
        item.group = 'Unknown'
      }
      if (item.isAchieved === undefined) {
        if (item.timeLeft === '00:00:00') {
          item.isAchieved = true
        } else {
          item.isAchieved = false
        }
      }
      if (item.daily === undefined) {
        item.daily = false
        item.group = item.group.toLowerCase()
      }
      this.myList.push(item)
    }
    const dailys = this.myList.filter(item => item.daily)
    for (const daily of dailys) {
      let found = false
      for (const item of this.daily) {
        if (
          item.name === daily.name &&
          item.group === daily.group &&
          item.timeBegin === daily.timeBegin &&
          item.note === daily.note
        ) {
          found = true
        }
      }
      if (!found) {
        this.daily.push({ ...daily, timeLeft: daily.timeBegin })
      }
    }
    // BIND
    this.addElement = this.addElement.bind(this)
    this.modify = this.modify.bind(this)
    this.startWork = this.startWork.bind(this)
    this.stopWork = this.stopWork.bind(this)
    this.stopAlarm = this.stopAlarm.bind(this)
    this.removeWork = this.removeWork.bind(this)
    this.remove = this.remove.bind(this)
    this.pause = this.pause.bind(this)
    this.reprise = this.reprise.bind(this)
    this.updateOptions = this.updateOptions.bind(this)
    // ATTRIBUTES
    this.myList.forEach(item => {
      if (this.groups.indexOf(item.group) === -1) {
        this.groups.push(item.group.toLowerCase())
      }
    })
    // DAILY TASKS
    const TODAY = today()
    this.daily.forEach(item => {
      // ADD DAILY TASKS
      let found = false
      for (const itemq of this.myList) {
        if (
          itemq.name === item.name &&
          itemq.group === item.group &&
          itemq.timeBegin === item.timeBegin &&
          itemq.note === item.note &&
          itemq.expectedDate === TODAY
        ) {
          found = true
          break
        }
      }
      if (!found) {
        const newItem = Object.assign(item, { expectedDate: TODAY, id: this.counter++ })
        this.myList.push(newItem)
      }
    })
    // REMOVE DAILY TASKS WHO ARE LATE
    this.myList = this.myList.filter(
      item => !(!greaterOrEqual(DateFr(item.expectedDate), new Date()) && item.daily)
    )
  }

  _createObjectFromMap(map: Map<string | number, any>, callback?: (v: any) => any): any {
    const object: any = {}
    map.forEach((value: any, key: string | number) => {
      if (!callback) {
        object[key] = value
      } else {
        object[key] = callback(value)
      }
    })
    return object
  }

  _createMapFromObject(obj: any, callback?: (v: any) => any) {
    const map: Map<string | number, any> = new Map<string | number, any>()
    Object.keys(obj).forEach((e: string | number) => {
      if (!callback) {
        map.set(e, obj[e])
      } else {
        map.set(e, callback(obj[e]))
      }
    })
    return map
  }

  addElement(item: Job): void {
    let tabTemp = item.timeBegin.split(':')
    tabTemp = tabTemp.map(e => reformate(parseInt(e)))
    const timeBegin = tabTemp.join(':')
    item.timeBegin = timeBegin
    item.timeLeft = timeBegin
    tabTemp = item.expectedDate.split('/')
    item.expectedDate = tabTemp.map(e => reformate(parseInt(e))).join('/')
    item.id = this.counter++
    this.myList.push(item)
    window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
    if (this.groups.indexOf(item.group) === -1) {
      this.groups.push(item.group)
    }
    this.setState({ alter: !this.state.alter })
  }

  modify(item: Job): void {
    const INDEX = this.myList.findIndex(source => source.id === item.id)
    this.myList[INDEX] = item
    window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
    if (this.groups.indexOf(item.group) === -1) {
      this.groups.push(item.group)
    }
    this.setState({ alter: !this.state.alter })
  }

  _workingOn(realTime: number, item: Job) {
    const time: string = formateTime(realTime)
    this.myList[this.index].timeLeft = time
    this.showContent = time
    const NOW = new Date()
    const TODAY = today()
    // FOR STATTISTICS PURPUSE
    const WORK: Map<number, Work> = this.working.has(TODAY)
      ? (this.working.get(TODAY) as Map<number, Work>)
      : new Map<number, Work>()
    const currentHourWork: Work = WORK.has(NOW.getHours())
      ? (WORK.get(NOW.getHours()) as Work)
      : { hour: NOW.getHours(), time: 0, group: item.group }
    currentHourWork.time++
    WORK.set(NOW.getHours(), currentHourWork)
    this.working.set(TODAY, WORK)
    this.stayWorking++

    if (realTime <= 10 && realTime >= 1 && !this.ticTocPlayingStatus) {
      this.ticTocPlayingStatus = true
      this.ticToc.play()
    }

    if (realTime <= 0) {
      if (this.ticTocPlayingStatus) {
        this.ticToc.pause()
        this.ticToc.currentTime = 0
        this.ticTocPlayingStatus = false
      }
      this.beep.play()
      clearInterval(this.interval)
      this.myList[this.index].isAchieved = true
      this.myList[this.index].finishedDay = TODAY
      this.index = -1
      this.showContent = <i className="fas fa-volume-up"></i>
    } else if (this.stayWorking >= this.options.workingTime) {
      this.showContent = 'Take Break'
      this.breakTimeSound.play()
      this.pause()
    }
    this.setState({ alter: !this.state.alter })
    window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
    window.localStorage.setItem(
      'working-data',
      JSON.stringify(this._createObjectFromMap(this.working, this._createObjectFromMap))
    )
  }

  startWork(id: number): void {
    if (this.stayWorking < this.options.workingTime) {
      clearInterval(this.interval)
      this.index = this.myList.findIndex(item => item.id === id)
      const item = this.myList[this.index]
      if (item !== undefined) {
        this.button = true
        this.selected = true
        this.playPauseEffect = true
        let realTime: number = countSeconds(item.timeLeft)
        if (realTime > 0) {
          --realTime
          this._workingOn(realTime, item)
          this.interval = setInterval(() => {
            --realTime
            this._workingOn(realTime, item)
          }, 1000)
        } else {
          this.myList[this.index].isAchieved = true
          this.myList[this.index].finishedDay = today()
          this.index = -1
          this.selected = false
          this.setState(state => ({
            ...state,
            alert: !state.alter,
          }))
          window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
          window.localStorage.setItem(
            'working-data',
            JSON.stringify(this._createObjectFromMap(this.working, this._createObjectFromMap))
          )
        }
      }
    } else {
      this.index = this.myList.findIndex(item => item.id === id)
      const item = this.myList[this.index]
      if (item !== undefined) {
        this.selected = true
      }
      this.pause()
    }
  }

  stopAlarm(): void {
    this.selected = false
    this.beep.pause()
    this.beep.currentTime = 0
    this.setState({ alter: !this.state.alter })
  }

  removeWork(id: number): void {
    this.index = this.myList.findIndex(item => item.id === id)
    if (id !== null && this.myList[this.index] !== undefined) {
      this.selected = false
      clearInterval(this.interval)
      this.myList = this.myList.filter((item, index) => index !== this.index)
      this.index = -1
      window.localStorage.setItem('todo-list', JSON.stringify(this.myList))
      this.setState(state => ({
        ...state,
        alert: !state.alter,
      }))
    }
  }

  stopWork(): void {
    if (this.index !== -1) {
      this.selected = false
      clearInterval(this.interval)
      this.index = -1
      this.setState(state => ({
        ...state,
        alert: !state.alter,
      }))
    }
  }

  reprise() {
    if (this.index !== -1) {
      this.startWork(this.myList[this.index].id)
    }
  }

  remove() {
    if (this.index !== -1) {
      clearInterval(this.interval)
      this.removeWork(this.index)
    }
  }

  pause() {
    clearInterval(this.interval)
    this.button = false
    if (this.ticTocPlayingStatus) {
      this.ticToc.pause()
      this.ticTocPlayingStatus = false
    }
    if (this.stayWorking >= this.options.workingTime) {
      this.playPauseEffect = false
    }
    this.interval = setInterval(() => {
      if (this.stayWorking >= this.options.workingTime) {
        if (this.leaveWorking > 0) {
          this.leaveWorking--
        } else {
          this.leaveWorking = this.options.reposeTime
          this.stayWorking = 0
          this.reprise()
        }
      }
      this.setState({ alter: !this.state.alter })
    }, 1000)
    this.setState({ alter: !this.state.alter })
  }

  updateOptions(stay: number, leave: number) {
    this.options.workingTime = stay
    this.options.reposeTime = leave
    window.localStorage.setItem('options', JSON.stringify(this.options))
  }

  render() {
    const NOW = new Date()
    return (
      <Switch>
        <Route path="/add" exact>
          <TodoAdd addElement={this.addElement} groups={this.groups} />
        </Route>
        <Route
          path="/modify/:id"
          render={props => (
            <TodoAdd
              item={
                (!isNaN(parseInt(props.match.params.id)) &&
                  parseInt(props.match.params.id) >= 0 &&
                  this.myList[
                    this.myList.findIndex(item => item.id === parseInt(props.match.params.id))
                  ]) as Job
              }
              addElement={this.modify}
              groups={this.groups}
              modify={true}
            />
          )}
        />
        <Route
          path="/note/:id"
          render={props => (
            <Note
              item={
                ((!isNaN(parseInt(props.match.params.id)) &&
                  parseInt(props.match.params.id) >= 0 &&
                  this.myList[
                    this.myList.findIndex(item => item.id === parseInt(props.match.params.id))
                  ]) || { name: 'Not Found', note: 'Not Found' }) as Job
              }
            />
          )}
        />
        <Route path="/settings" exact>
          <Param options={this.options} updateOptions={this.updateOptions} />
        </Route>
        <Route path="/">
          {this.selected && (
            <Show
              name={(this.index !== -1 && this.myList[this.index].name) || 'Click to stop alarm'}
              time={this.showContent}
              currentDate={today()}
              currentTime={reformate(NOW.getHours()) + ':' + reformate(NOW.getMinutes())}
              stop={this.stopWork}
              reprise={this.reprise}
              remove={this.remove}
              pause={this.pause}
              completed={this.stopAlarm}
              button={this.button}
              controllers={this.index !== -1}
              playPauseEffect={this.playPauseEffect}
            />
          )}
          <TodoAddList
            myList={this.myList}
            startWork={this.startWork}
            removeWork={this.removeWork}
            working={this.working}
            index={this.index}
          />
        </Route>
      </Switch>
    )
  }
}

render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className="container">
        <Container />
        <div className="row">
          <div className="col">
            <p className="text-center py-5 text-dark font-weight-bold">Created By @Hachour Fouad</p>
          </div>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
