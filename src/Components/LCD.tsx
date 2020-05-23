import * as React from 'react'
interface Props {
  name: string
  time: string | React.ReactNode
  currentTime: string
  currentDate: string
  button: boolean
  controllers: boolean
  playPauseEffect: boolean
  pause?: () => void
  reprise?: () => void
  stop?: () => void
  remove?: () => void
  completed?: () => void
}

const Show: React.FC<Props> = (param: Props) => (
  <div className="row">
    <div
      className="col-10 col-md-8 col-xl-6 mx-auto bg-dark p-0 mt-4 numeric"
      onClick={e => !param.controllers && param.completed && param.completed()}>
      <h6 className="text-danger p-1 pl-3 numeric">job name: {param.name}</h6>
      <h1 className="text-danger text-center numeric clock">{param.time}</h1>
      <div className="row">
        <div className="col-12 d-flex justify-content-around mx-2">
          <h6 className="text-danger p-1 numeric">Current Time: {param.currentTime}</h6>
          <h6 className="text-danger p-1 numeric">Current Date: {param.currentDate}</h6>
        </div>
      </div>
      {param.controllers && (
        <div className="container-fluid">
          <div className="row">
            {param.button && (
              <button
                className="col no-outline font-weight-bold btn btn-danger mx-0 rounded-0"
                onClick={e => param.playPauseEffect && param.pause && param.pause()}>
                <i className="fas fa-pause mx-1"></i> Pause
              </button>
            )}
            {!param.button && (
              <button
                className="col no-outline font-weight-bold btn btn-danger mx-0 rounded-0"
                onClick={e => param.playPauseEffect && param.reprise && param.reprise()}>
                <i className="fas fa-play mx-1"></i> Start
              </button>
            )}
            <button
              className="col no-outline font-weight-bold btn btn-danger mx-0 rounded-0"
              onClick={e => param.stop && param.stop()}>
              <i className="fas fa-stop mx-1"></i> Stop
            </button>
            <button
              className="col no-outline font-weight-bold btn btn-danger mx-0 rounded-0"
              onClick={e => param.remove && param.remove()}>
              <i className="fas fa-trash mx-1"></i> Stop and Remove
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)

export default Show
