import * as React from 'react'
import { Job } from '../interfaces'
import { Link } from 'react-router-dom'
import { greaterOrEqual, DateFr } from '../utility'

interface props {
  item: Job
  controllers: boolean
  start?: (id: number) => void
  remove?: (id: number) => void
}

const Item: React.FC<props> = (param: props) => {
  const LATE = !greaterOrEqual(
    DateFr(param.item.expectedDate),
    param.item.isAchieved ? DateFr(param.item.finishedDay) : new Date()
  )
  return (
    <div className={'row border border-white rounded p-4 ' + (!LATE ? 'bg-light' : 'bg-warning')}>
      <div className="col-10">
        <h3 className="text-dark font-weight-bold">{param.item.name.toLocaleUpperCase()}</h3>
      </div>
      {LATE && (
        <div className="col-2 font-weight-bold text-center ">
          <i className="fas fa-clock px-1 py-0"></i> LATE
        </div>
      )}
      {param.item.daily && (
        <div className="col-2 font-weight-bold text-center text-warning ">
          <i className="fas fa-star px-1 py-0"></i> DAILY
        </div>
      )}
      <div className="col-12 col-sm-10 mx-auto row">
        <div className="col-12 col-sm-4 p-2 text-center">
          <h6 className="text-dark font-weight-bold">Initiale Time:</h6>{' '}
          <strong className="text-info">{param.item.timeBegin}</strong>
        </div>
        <div className="col-12 col-sm-4 p-2 text-center">
          <h6 className="text-dark font-weight-bold">Time Left:</h6>{' '}
          <strong className="text-info">{param.item.timeLeft}</strong>
        </div>
        <div className="col-12 col-sm-4 p-2 text-center">
          <h6 className="text-dark font-weight-bold">Expected Date:</h6>{' '}
          <strong className="text-danger">{param.item.expectedDate}</strong>
        </div>
      </div>
      {param.controllers && (
        <div className="col-12 row justify-content-end text-center p-2">
          <button
            className="btn btn-success m-2"
            onClick={e => param.start && param.start(param.item.id)}>
            <i className="fas fa-play m-1"></i> Start
          </button>
          <button
            className="btn btn-danger m-2 "
            onClick={e => param.remove && param.remove(param.item.id)}>
            <i className="fas fa-trash m-1"></i> Remove
          </button>
          <Link to={`modify/${param.item.id}`} className="btn btn-secondary m-2">
            <i className="fas fa-sliders-h m-1"></i> Modify
          </Link>
          <Link to={`note/${param.item.id}`} className="btn btn-info m-2">
            <i className="fas fa-sticky-note m-1"></i> Note
          </Link>
        </div>
      )}
    </div>
  )
}

export default Item
