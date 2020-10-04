import { firebase } from '../../firebase/config';

export const login = (email, password, navigation) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection('users');
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert('User does not exist anymore.');
            return;
          }
          const user = firestoreDocument.data();
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};
