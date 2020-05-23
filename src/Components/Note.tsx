import * as React from 'react'
import { Job } from '../interfaces'

interface props {
  item: Job
}

const Note: React.FC<props> = (param: props) => {
  console.log(param)
  return (
    <div className={'col-12 border border-white rounded p-4 '}>
      <div className="row">
        <h1 className="col-12 text-primary">Note</h1>
        <div className="col-12 jumbotron">
          <h1 className="display-4">{param.item.name || ''}</h1>
          <p className="lead">{(param.item.note === '' ? 'Nothing' : param.item.note) || ''}</p>
        </div>
      </div>
    </div>
  )
}

export default Note
