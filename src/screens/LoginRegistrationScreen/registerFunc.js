import { firebase } from '../../firebase/config';

export const register = (fullName, email, password, confirmPassword, navigation) => {
  if (password !== confirmPassword) {
    alert("Passwords don't match.");
    return;
  }
  firebase
    .auth()
    // creates new account in Firebase Auth table
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        fullName,
      };
      // if registration is successful, store user data in Firestore
      const usersRef = firebase.firestore().collection('users');
      usersRef
        .doc(uid)
        .set(data)
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};
