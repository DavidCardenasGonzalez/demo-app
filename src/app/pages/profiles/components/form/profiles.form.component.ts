
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProfilesService } from '../../profiles.service';
import { Profile } from '../../profile.model';

import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import "firebase/storage";
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'profilesForm',
  templateUrl: './profiles.form.html',
  styleUrls: ['./profiles.form.scss']
})
export class ProfilesForm implements OnInit {
  password: string;
  public id;
  public dbprofiles;
  public currentPhoto: any;
  public uploaderOptions: NgUploaderOptions = {
    url: '',
  };
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: Profile = new Profile();
  constructor(protected service: ProfilesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute, public afAuth: AngularFireAuth) {
    this.dbprofiles = this.db.list('profiles')

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.getProfile(this.id)
    }
  }

  getProfile(id) {
    this.db.object('profiles/' + id)
      .subscribe(arg => this.profile = arg);

  }

  save() {
    if (this.id) {
      if (this.currentPhoto) {
        var storageRef = firebase.storage().ref("profiles/" + this.id)
        storageRef.put(this.currentPhoto)
          .then(x => {
            this.profile.picture = x.downloadURL;
            this.updateProfile()
          })
      } else {
        this.updateProfile()
      }
    } else {
      this.addProfile()
    }
  }

  uploadImage(file) {
    //const file = event.srcElement.files[0];
    if(file){
      this.currentPhoto = file;      
    } else{
      this.profile.picture = null;
    }
  }

  addProfile(): void {
    var that = this;
    this.afAuth.auth.createUserWithEmailAndPassword(this.profile.email, this.password).
      then(function (user) {
        if (that.currentPhoto) {
          var storageRef = firebase.storage().ref("profiles/" + user.uid)
          storageRef.put(that.currentPhoto)
            .then(x => {
              that.profile.picture = x.downloadURL;
              that.db.object('profiles/' + user.uid).set(that.profile)
                .then(z => that.router.navigate(["pages", "profiles"]));
            })
        } else {
          that.db.object('profiles/' + user.uid).set(that.profile)
            .then(z => that.router.navigate(["pages", "profiles"]));
        }
      })
  }

  updateProfile() {
    this.db.object('profiles/' + this.id).update(this.profile)
      .then(x => this.router.navigate(["pages", "profiles"]));
  }

}
