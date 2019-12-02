import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {User} from './user.model';
import * as firebase from 'firebase';


@Injectable({ providedIn: 'root' })
export class AuthService {
  status = false;
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  googleSignOut() {
    this.afAuth.auth.signOut().then(r => {
      this.status = false;
      console.log('Signed out successfully');
    });
    return this.returnHome();
  }

  returnHome() {
    return this.router.navigate(['/']);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user.uid, credential.user.email, credential.user.displayName, credential.user.photoURL).then(r => {
          this.status = true;
          console.log('user authenticated');
        });
      });
  }

// tslint:disable-next-line:align
  private updateUserData(uid, email, displayName, photoURL) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data: User = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, {merge: true});

  }


  signUpEmail(mail: any, pass: any, identicon: string, username) {
    firebase.auth().createUserWithEmailAndPassword(mail, pass).then((credential) => {
      this.updateUserData(credential.user.uid, mail, username, identicon).then(r => {
      }).catch(err => {
        console.log(err);
      });
    }).catch(error => {
      window.alert(error);
    });
  }

  loginWithEmail(email: any, pass: any) {
    let flag = true;
    firebase.auth().signInWithEmailAndPassword(email, pass).then(r => {
    }).catch(error => {
      flag = false;
      window.alert(error);
    });
    return flag;
  }

  getStatus() {
    return true;
  }
}
