import { firebase } from '../firebase/config';
import moment from 'moment'

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logged out success!')
    })
    .catch((error) => {
      alert(error)
    })
}

export const percentage = (entries, type) => {
  const count = typeCount(entries, type)
  return Math.round((count / entries.length) * 100)
}

export function typeCount(entries, type) {
  return entries.reduce((a,c) => {
    if (c.type === type) return a + 1
    return a
  }, 0)
}

export const pieDataFunc = (entries) => {
  const obj = {}
  entries.forEach(entry => {
    if (obj[entry.type]) {
      obj[entry.type]++
    } else {
      obj[entry.type] = 1
    }
  })
  return Object.keys(obj).map(key => {
    const newEntry = {}
    newEntry.x = `Type ${key}`
    newEntry.y = obj[key]
    newEntry.percent = percentage(entries, key)
    return newEntry
  })
}

export const typeValueWeek = (entries, day) => {
  const filtered = entries.filter(entry => {
    return moment(entry.date.toDate()).format("ddd") === day
  })
  if (filtered.length) {
    const sum = filtered.reduce((a,c) => {
      return a + +c.type
    }, 0)
    return sum / filtered.length
  }
  else return null
}

export const typeValueMonth = (entries, day) => {
  const filtered = entries.filter(entry => {
    return moment(entry.date.toDate()).format("D") == day
  })
  if (filtered.length) {
    const sum = filtered.reduce((a,c) => {
      return a + +c.type
    }, 0)
    return sum / filtered.length
  }
  else return null
}

export const typeValueYear = (entries, month) => {
  const filtered = entries.filter(entry => {
    return moment(entry.date.toDate()).format("MMM") == month
  })
  if (filtered.length) {
    const sum = filtered.reduce((a,c) => {
      return a + +c.type
    }, 0)
    return sum / filtered.length
  }
  else return null
}
