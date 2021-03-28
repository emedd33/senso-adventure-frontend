import { authentication } from "./firebase";
import { setValueInDatabase } from "./database";
export const resetPassword = (email: string, dispatch: any) => {
  return authentication.sendPasswordResetEmail(email);
};

export const login = (email: string, password: string) => {
  return authentication
    .signInWithEmailAndPassword(email, password)
    .then((user) => user.user);
};

export const logout = () => {
  return authentication.signOut();
};

export const getCurrentUser = () => {
  return authentication.currentUser;
};
export const createUserWithEmailPasswordAndUsername = (
  email: string,
  password: string,
  username: string
) => {
  return authentication
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .then((user) => {
      if (user) {
        user.updateProfile({
          displayName: username,
        });
      }
      return user;
    })
    .then((user) => {
      if (user) {
        setValueInDatabase(`admin/usernames/${user.uid}`, username);
      }
    });
};
