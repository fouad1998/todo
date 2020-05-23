import * as React from 'react'
import { Job } from '../interfaces'
import { DateFr, greaterOrEqual, today, countSeconds, formateTime } from '../utility'

interface state {
  name: string
  time: string
  expectedDate: string
  note: string
  group: string
  daily: boolean
  option: boolean
  id: number
}

interface props {
  groups: Array<string>
  addElement: (item: Job) => void
  item?: Job
  modify?: boolean
}

export default class TodoAdd extends React.Component<props, state> {
  private addElement: (item: Job) => void
  private showGroupProposals: boolean
  private groups: Array<string>
  private warnings: boolean
  private successful: boolean

  constructor(props: props) {
    super(props)
    if (this.props.item) {
      const ITEM = this.props.item
      this.state = {
        name: ITEM.name,
        time: ITEM.timeBegin,
        expectedDate: ITEM.expectedDate,
        note: ITEM.note,
        group: ITEM.group,
        daily: ITEM.daily,
        option: false,
        id: ITEM.id,
      }
    } else {
      this.state = {
        name: '',
        time: '',
        expectedDate: '',
        note: '',
        group: '',
        daily: false,
        option: false,
        id: 0,
      }
    }
    this.warnings = false
    this.successful = false
    this.addElement = this.props.addElement
    this.showGroupProposals = false
    this.add = this.add.bind(this)
    this.groups = []
  }

  add() {
    const NOW = new Date()
    const expectedDate = this.state.expectedDate
    let status =
      /^[0-5]?[0-9]:[0-5]?[0-9]$/.test(this.state.time) ||
      /^[0-5]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9]$/.test(this.state.time)
    let date: boolean = /([0-2]?[0-9]|3[0-1])\/(0?[0-9]|1[0-2])\/2[0-9]{1,3}/.test(expectedDate)
    const dateExpected = DateFr(expectedDate)
    date = date && greaterOrEqual(dateExpected, NOW)
    date = date || expectedDate === ''
    status = status && date
    if (status || this.state.daily) {
      if (this.state.name !== '' && this.state.time !== '') {
        let time = this.state.time
        if (/^[0-5]?[0-9]:[0-5]?[0-9]$/.test(time)) {
          time = '00:' + time
        }
        const expectedDate =
          this.state.expectedDate === '' || this.state.daily ? today() : this.state.expectedDate
        const group = this.state.group === '' ? 'unknown' : this.state.group
        const note = this.state.note === '' ? '' : this.state.note
        this.successful = true
        const SEND = {
          id: this.state.id,
          name: this.state.name,
          timeBegin: time,
          timeLeft: time,
          isAchieved: false,
          expectedDate,
          group,
          note,
          finishedDay: '',
          daily: this.state.daily,
        }
        if (this.props.modify && this.props.item !== undefined) {
          const BEGINSECONDS = countSeconds(this.props.item.timeBegin)
          const LEFTSECONDS = countSeconds(this.props.item.timeLeft)
          const DIFFERENCE = BEGINSECONDS - LEFTSECONDS
          const WANTEDBEGIN = countSeconds(SEND.timeBegin)
          const WANTEDLEFT = WANTEDBEGIN - DIFFERENCE > 0 ? WANTEDBEGIN - DIFFERENCE : 0
          SEND.timeLeft = formateTime(WANTEDLEFT)
        }
        this.addElement(SEND)
        this.setState({
          name: '',
          time: '',
          expectedDate: '',
          note: '',
          group: '',
          option: false,
        })
      } else {
        this.setState({ option: !this.state.option })
        this.warnings = true
      }
    } else {
      this.setState({ option: !this.state.option })
      this.warnings = true
    }
  }

  render() {
    this.groups = this.props.groups || []
    return (
      <div className="col col-md-8 mx-auto my-5 bg-light border border-light rounded p-2">
        {this.warnings && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> You should check in on some of those fields below.
            <button
              type="button"
              className="close"
              onClick={() => {
                this.warnings = false
                this.setState({ option: !this.state.option })
              }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {this.successful && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Successful!</strong> {this.props.modify ? 'Modification' : 'Task Added.'}
            <button
              type="button"
              className="close"
              onClick={() => {
                this.successful = false
                this.setState({ option: !this.state.option })
              }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className={'form-row add-section ' + (this.state.option ? 'extend' : '')}>
          <div className="col-12 col-md-5 mx-md-1 form-group">
            <input
              className="form-control"
              type="text"
              placeholder="write your job..."
              value={this.state.name}
              onChange={e => {
                const name = e.currentTarget.value
                this.setState({ name })
              }}
            />
          </div>
          <div className="col-12 col-md-5 mx-md-1 form-group">
            <input
              className="form-control"
              type="text"
              placeholder="HH:MM:SS"
              value={this.state.time}
              onChange={e => {
                const time = e.currentTarget.value
                this.setState({
                  time,
                })
              }}
            />
          </div>
          <button className="h-50 btn btn-secondary mx-auto" onClick={this.add}>
            {this.props.modify ? 'Modify' : 'Add'}
          </button>
        </div>
        <fieldset className="form-row px-5">
          <legend>Optional</legend>
          <div className={'col hide ' + (this.state.option ? 'not-hide' : '')}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Date</span>
              </div>
              <input
                className="form-control"
                type="text"
                value={this.state.expectedDate}
                placeholder="Type expected date that want to execute the tache DD/MM/YY"
                readOnly={this.state.daily}
                onChange={e => {
                  this.setState({ expectedDate: e.currentTarget.value })
                }}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Group</span>
              </div>
              <input
                className="form-control"
                type="text"
                value={this.state.group}
                placeholder="Type group associated here..."
                onChange={e => {
                  this.setState({ group: e.currentTarget.value })
                }}
                onInput={e => {
                  this.showGroupProposals = true
                }}
              />
            </div>
            {this.showGroupProposals &&
              this.state.group !== '' &&
              this.groups.filter(el => el.indexOf(this.state.group) !== -1).length !== 0 && (
                <div className="form-group overflow-auto overflow-x-hidden bg-dark">
                  {this.groups
                    .filter(item => item.indexOf(this.state.group) !== -1)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="col-12 p-2 text-info stretched-link"
                        onClick={e => {
                          this.showGroupProposals = false
                          this.setState({ group: item })
                        }}>
                        {item}
                      </div>
                    ))}
                </div>
              )}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    onChange={e => {
                      this.setState({ daily: e.currentTarget.checked })
                    }}
                    checked={this.state.daily}
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Text input with checkbox"
                value="Daily"
                readOnly
              />
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Note</span>
              </div>
              <textarea
                className="form-control"
                value={this.state.note}
                placeholder="Type the note here..."
                onChange={e => {
                  this.setState({ note: e.currentTarget.value })
                }}></textarea>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}
