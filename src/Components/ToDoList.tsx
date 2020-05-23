import * as React from 'react'
import { Job, Work } from '../interfaces'
import Item from './Item'
import { greaterOrEqual, DateFr, greaterThen, equal } from '../utility'
import { Switch, Route, Link } from 'react-router-dom'
import * as d3 from 'd3'
import Svg from './Svg'

function countHour(os: Array<string>): string {
  let s = 0
  for (const o of os) {
    const l = o.split(':').map(item => parseInt(item))
    s += l[0] * 3600 + l[1] * 60 + l[2]
  }
  const HH = Math.floor(s / 3600)
  const MM = Math.floor((s - HH * 3600) / 60)
  const SS = s - HH * 3600 - MM * 60
  const time = reformate(HH) + ':' + reformate(MM) + ':' + reformate(SS)
  return time
}

function reformate(f: number | string): string {
  if (f >= 0 && f <= 9) {
    return '0' + f
  }
  return f.toString()
}

interface Props {
  index: number
  myList: Array<Job>
  working: Map<string, Map<number, Work>>
  startWork: (id: number) => void
  removeWork: (id: number) => void
}

interface State {
  staticOngle: string
}

export default class TodoAddList extends React.Component<Props, State> {
  private startWork: (id: number) => void
  private removeWork: (id: number) => void
  private myList: Array<Job>
  private hist: Array<Job>
  private working: Map<string, Map<number, Work>>

  constructor(props: Props) {
    super(props)
    this.state = { staticOngle: 'date' }
    this.startWork = this.props.startWork
    this.removeWork = this.props.removeWork
    this.myList = []
    this.hist = []
    this.working = new Map()
  }

  _list() {
    return (
      <div className="todo-list">
        {this.myList.map((item, i) => {
          if (!item.isAchieved && this.props.index !== item.id) {
            return (
              <Item
                item={item}
                key={i}
                start={this.startWork}
                controllers={true}
                remove={this.removeWork}
              />
            )
          } else {
            return ''
          }
        })}
      </div>
    )
  }

  _hist() {
    this.hist = this.myList
      .filter(item => item.isAchieved)
      .sort((a, b) => {
        if (greaterOrEqual(DateFr(a.finishedDay), DateFr(b.finishedDay))) {
          return -1
        } else {
          return 1
        }
      })
    let finishedDay = this.hist.length !== 0 ? this.hist[0].finishedDay : ''
    return this.hist.map((item, index) => {
      const showDate = index === 0 || item.finishedDay !== finishedDay
      finishedDay = showDate ? item.finishedDay : finishedDay
      if (showDate) {
        return (
          <div className="row mt-3" key={index}>
            <h3 className="col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold">
              {finishedDay}
            </h3>
            <h3 className="col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric">
              TOTAL OF HOURS:{' '}
              {countHour(
                this.hist
                  .filter(item => item.finishedDay === finishedDay)
                  .map(item => item.timeBegin)
              )}
            </h3>
            <div className="col-12">
              {this.hist
                .filter(item => item.finishedDay === finishedDay)
                .map((item, index) => (
                  <Item key={index} controllers={false} item={item} />
                ))}
            </div>
          </div>
        )
      } else {
        return undefined
      }
    })
  }

  _static() {
    this.hist = this.myList
      .filter(item => item.isAchieved)
      .sort((a, b) => {
        if (greaterThen(DateFr(a.finishedDay), DateFr(b.finishedDay))) {
          return -1
        } else if (equal(DateFr(a.finishedDay), DateFr(b.finishedDay))) {
          return 0
        } else {
          return 1
        }
      })
    if (this.state.staticOngle === 'group') {
      this.hist = this.hist.sort((a, b) => {
        if (a.group > b.group) {
          return 1
        } else if (a.group < b.group) {
          return -1
        } else {
          return 0
        }
      })
    }

    let finishedDay = this.hist.length !== 0 ? this.hist[0].finishedDay : ''
    let group = this.hist.length !== 0 ? this.hist[0].group : ''
    if (this.state.staticOngle === 'date') {
      return (
        <div>
          {this.hist.map((item, index) => {
            const showDate = index === 0 || item.finishedDay !== finishedDay
            finishedDay = showDate ? item.finishedDay : finishedDay
            if (showDate) {
              return (
                <div className="row mt-3" key={index}>
                  <h3 className="col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold">
                    {finishedDay}
                  </h3>
                  <h3 className="col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric">
                    TOTAL OF HOURS:{' '}
                    {countHour(
                      this.hist
                        .filter(item => item.finishedDay === finishedDay)
                        .map(item => item.timeBegin)
                    )}
                  </h3>
                  <div className="col-12">
                    {this.hist
                      .filter(item => item.finishedDay === finishedDay)
                      .map((item, index) => (
                        <Item key={index} controllers={false} item={item} />
                      ))}
                  </div>
                </div>
              )
            } else {
              return undefined
            }
          })}
        </div>
      )
    } else if (this.state.staticOngle === 'group') {
      return this.hist.map((item, index) => {
        const showGroup = index === 0 || item.group !== group
        group = showGroup ? item.group : group
        if (showGroup) {
          return (
            <div className="row mt-3" key={index}>
              <h3 className="col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold">
                {group}
              </h3>
              <h3 className="col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric">
                TOTAL OF HOURS:{' '}
                {countHour(
                  this.hist.filter(item => item.group === group).map(item => item.timeBegin)
                )}
              </h3>
              <div className="col-12">
                {this.hist
                  .filter(item => item.group === group)
                  .map((item, index) => (
                    <Item key={index} controllers={false} item={item} />
                  ))}
              </div>
            </div>
          )
        } else {
          return undefined
        }
      })
    }
  }

  render() {
    this.myList = this.props.myList
    this.working = this.props.working
    return (
      <div className="row mt-4">
        <Switch>
          <Route path="/" exact>
            <h1 className="col-10 text-primary">Tasks</h1>
            <Link to="add" className="h-25 btn btn-primary mx-auto align-self-center">
              <i className="fas fa-plus mx-1"></i> Add
            </Link>
            <div className="limitor col-12">
              <div className="row">
                <div className="col-12">{this._list()}</div>
              </div>
            </div>
          </Route>
          <Route path="/history">
            <h1 className="col-10 text-primary">History</h1>
            <div className="col-12">{this._hist()}</div>
          </Route>
          <Route path="/statistics">
            <h1 className="col-12  col-md-8 text-primary">Statistics</h1>
            <div className="col-12 col-md-4 btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={e => this.setState({ staticOngle: 'date' })}>
                By Date
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={e => this.setState({ staticOngle: 'group' })}>
                By Group
              </button>
            </div>
            <div className="col-12">
              <Svg working={this.working} jobs={this.myList} />
            </div>
            <div className="col-12">{this._static()}</div>
          </Route>
        </Switch>
      </div>
    )
  }
}
