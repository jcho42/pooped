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

export const typeValue = (entries, day) => {
  const filtered = entries.filter(entry => moment(entry.date, 'X').format("ddd") === day)
  if (filtered.length) return +filtered[0].type
  else return null
}
