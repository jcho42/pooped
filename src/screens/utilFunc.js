import { firebase } from '../firebase/config';

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
  console.log('entries in percentage ---->', entries)
  const count = typeCount(entries, type)
  return Math.round((count / entries.length) * 100)
}

export function typeCount(entries, type) {
  console.log('entries ---->', entries)
  return entries.reduce((a,c) => {
    if (c.type === type) return a + 1
    return a
  }, 0)
}
