import * as React from 'react'
import { Work, Job } from '../interfaces'
import TodayReport from './TodayReport'
import HoursPerDay from './HoursPerDay'

interface props {
  working: Map<string, Map<number, Work>>
  jobs: Array<Job>
}

const Svg: React.FC<props> = (param: props) => {
  const working = param.working
  return (
    <div className="row bg-light p-4 my-2">
      <TodayReport working={working} />
      <HoursPerDay jobs={param.jobs} />
    </div>
  )
}
export default Svg
