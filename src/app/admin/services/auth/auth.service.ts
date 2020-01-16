import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Account } from "../../interfaces/account";
// import { DocumentReference } from '@google-cloud/firestore';

// import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Object;    // Save logged in user data

  constructor(
    public afs: AngularFirestore,     // Firestore service
    public afAuth: AngularFireAuth,   // Firebase auth service
    public router: Router,
    public ngZone: NgZone             // NgZone service to remove outside scope warning
  ) {
    // Save user data in localstorage when logged in to maintain user session, for persistence
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
      else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email and password
  SignIn(email, password) {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email and password
  SignUp(email, password) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)     
      .then((result) => {
        this.SetUserData(result.user);
        this.SendVerificationMail();       // Send a verification email to the new user 
        // this.afAuth.auth.signOut();     // Do not use custom SignOut() as that will route to 'sign-in' page
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verification 
  SendVerificationMail() {
    return this.afAuth
      .auth
      .currentUser
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  resendVerificationMail() {
    return this.SendVerificationMail()
    .then(() => {
      window.alert("Verification email sent")
    })
    .catch((error) => {
      window.alert(error)
    })
  }

  // Forget and reset password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // OAuth sign-in logic. Enable Firebase sign-in providers used, in Firebase console
  AuthLogin(provider) {
    return this.afAuth
      .auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  /* Save/Update users in database 
  TO-DO: Update users only if there are changes (use accountRef.valueChanges() Observable) Or
  Save user data only on sign up */
  SetUserData(user) {
    const accountRef: AngularFirestoreDocument<Account> = this.afs.doc(`accounts/${user.uid}`);   // Create reference to particular user document
    const userData: Account = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return accountRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth
      .auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
  }

}