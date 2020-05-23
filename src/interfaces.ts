export interface Job {
  name: string
  id: number
  group: string
  isAchieved: boolean
  timeLeft: string
  timeBegin: string
  finishedDay: string
  expectedDate: string
  note: string
  daily: boolean
}

export interface Work {
  hour: number
  time: number
  group: string
}

export interface Options {
  workingTime: number
  reposeTime: number
}
