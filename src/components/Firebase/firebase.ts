import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { UserObject } from './interface';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  auth: app.auth.Auth;
  db: app.database.Database;
  googleProvider: app.auth.GoogleAuthProvider;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser && this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser &&
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_URL ? process.env.REACT_APP_URL : '',
    });

  users = () => this.db.ref('users');

  user = (uid: string) => this.db.ref(`users/${uid}`);

  createUser = (uid: string, data: UserObject) => this.user(uid).set(data);
}

export default Firebase;
