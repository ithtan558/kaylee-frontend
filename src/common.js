export function formatDate(date) {
  var m = ("0" + (date.getMonth() + 1)).slice(-2)// in javascript month start from 0.
  var d = ("0" + date.getDate()).slice(-2) // add leading zero
  var y = date.getFullYear()
  return y + '-' + m + '-' + d
}

export function getDateRangeOfToday() {
  const date = new Date()
  const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const obj = {
    start_date: today,
    end_date: today
  }
  return obj
}

export function getDateRangeOfWeek() {
  const curr = new Date() // get current date
  const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
  const last = first + 6 // last day is the first day + 6
  const obj = {
    start_date: formatDate(new Date(curr.setDate(first))),
    end_date: formatDate(new Date(curr.setDate(last)))
  }
  return obj
}

export function getDateRangeOfMonth() {
  const date = new Date()
  const obj = {
    start_date: formatDate(new Date(date.getFullYear(), date.getMonth(), 1)),
    end_date: formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0))
  }
  return obj
}

export function getDateRangeOfYear() {
  const date = new Date()
  const obj = {
    start_date: formatDate(new Date(date.getFullYear(), 0, 1)),
    end_date: formatDate(new Date(date.getFullYear(), 11, 0))
  }
  return obj
}
