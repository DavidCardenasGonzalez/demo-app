import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public user: Observable<firebase.User>;

  constructor(fb: FormBuilder, public afAuth: AngularFireAuth, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.user = afAuth.authState;
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    var that = this;
    if (this.form.valid) {
      console.log(values);
      this.afAuth.auth.signInWithEmailAndPassword(values.email, values.password)
        .then(function () {
          that.router.navigate([''])
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.message;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      // your code goes here
      // console.log(values);
    }
  }

  login() {
    firebase.auth().signInWithEmailAndPassword("hola", "this.password")
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.message;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
