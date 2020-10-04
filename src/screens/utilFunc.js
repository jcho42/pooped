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
