export function DateFr(date: string | number) {
  if (typeof date === 'string') {
    const dateq = date.split('/')
    date = dateq[1] + '/' + dateq[0] + '/' + dateq[2]
    return new Date(date)
  } else {
    return new Date(date)
  }
}
export function greaterThen(date: Date, o: Date): boolean {
  if (date.getFullYear() > o.getFullYear()) {
    return true
  }
  if (date.getFullYear() === o.getFullYear() && date.getMonth() > o.getMonth()) {
    return true
  }
  if (
    date.getFullYear() === o.getFullYear() &&
    date.getMonth() === o.getMonth() &&
    date.getDate() > o.getDate()
  ) {
    return true
  }
  return false
}
export function equal(date: Date, o: Date): boolean {
  if (
    date.getFullYear() === o.getFullYear() &&
    date.getMonth() === o.getMonth() &&
    date.getDate() === o.getDate()
  ) {
    return true
  }
  return false
}
export function greaterOrEqual(date: Date, o: Date): boolean {
  if (equal(date, o) || greaterThen(date, o)) {
    return true
  }
  return false
}
export function countSeconds(str: string | Array<string | number>): number {
  if (Array.isArray(str)) {
    let s = 0
    for (const item of str) {
      if (typeof item === 'string') {
        s += countSeconds(item)
      } else {
        s += item
      }
    }
    return s
  } else {
    const intervals = str.split(':').map(item => parseInt(item))
    const seconds = intervals[0] * 3600 + intervals[1] * 60 + intervals[2]
    return seconds
  }
}
export function reformate(f: number | string): string {
  if (f >= 0 && f <= 9) {
    return '0' + f
  }
  return f.toString()
}
export function today(): string {
  const NOW = new Date()
  return formateDate(NOW)
}
export function formateDate(NOW: Date): string {
  return `${reformate(NOW.getDate())}/${reformate(NOW.getMonth() + 1)}/${NOW.getFullYear()}`
}
export function formateTime(seconds: number): string {
  const HH = Math.floor(seconds / 3600)
  const MM = Math.floor((seconds - HH * 3600) / 60)
  const SS = seconds - HH * 3600 - MM * 60
  const time: string = reformate(HH) + ':' + reformate(MM) + ':' + reformate(SS)
  return time
}
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
export const RANGE = ['First', 'Seconde', 'Third', 'Fourth']
