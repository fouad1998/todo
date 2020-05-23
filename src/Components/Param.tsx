import * as React from 'react'
import { Options } from '../interfaces'
interface state {
  stay: number
  leave: number
  option: boolean
}

interface props {
  options: Options
  updateOptions: (stay: number, leave: number) => void
}

export default class Param extends React.Component<props, state> {
  private updateOptions: (stay: number, leave: number) => void
  private warnings: boolean
  private successful: boolean

  constructor(props: props) {
    super(props)
    this.state = {
      leave: this.props.options.reposeTime / 60,
      stay: this.props.options.workingTime / 60,
      option: false,
    }
    this.warnings = false
    this.successful = false
    this.updateOptions = this.props.updateOptions
  }

  render() {
    return (
      <div className="col col-md-8 mx-auto my-5 bg-light border border-light rounded p-2">
        {this.warnings && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> You should give valide value.
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
            <strong>Successful!</strong> settigns updated.
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
        <div className="form-row add-section">
          <div className="col-12 input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Working Time</span>
            </div>
            <input
              type="text"
              className="form-control"
              onChange={e => {
                const v = parseInt(e.currentTarget.value)
                if (!isNaN(v) && v > 0 && v <= 90) {
                  this.successful = true
                  this.warnings = false
                  this.props.updateOptions(v * 60, this.state.leave * 60)
                  this.setState({ stay: v })
                } else {
                  this.successful = false
                  this.warnings = true
                  this.setState({ option: !this.state.option })
                }
              }}
              value={this.state.stay}
            />
            <div className="input-group-append">
              <span className="input-group-text">min (90min max)</span>
            </div>
          </div>
          <div className="col-12 input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Break Time</span>
            </div>
            <input
              type="text"
              className="form-control"
              onChange={e => {
                const v = parseInt(e.currentTarget.value)
                if (!isNaN(v) && v > 0 && v <= 30) {
                  this.warnings = false
                  this.successful = true
                  this.props.updateOptions(this.state.stay * 60, v * 60)
                  this.setState({ leave: v })
                } else {
                  this.successful = false
                  this.warnings = true
                  this.setState({ option: !this.state.option })
                }
              }}
              value={this.state.leave}
            />
            <div className="input-group-append">
              <span className="input-group-text">min (30min max)</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
