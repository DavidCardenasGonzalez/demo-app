
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProfilesService } from '../../profiles.service';
import { Profile } from '../../profile.model';

import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'profilesForm',
  templateUrl: './profiles.form.html',
  styleUrls: ['./profiles.form.scss']
})
export class ProfilesForm implements OnInit {
 public id;
 public dbprofiles;
 public profile: Profile =new Profile();
  constructor(protected service: ProfilesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute){
    this.dbprofiles = this.db.list('profiles')
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
      if(this.id){
        this.getProfile(this.id)
      }
  }

  getProfile(id){
    this.db.object('profiles/' + id)
      .subscribe(arg => this.profile = arg);
        
  }
  
  save() {
    if(this.id){
      this.updateProfile()
    } else {
      this.addProfile()      
    }
  }

  addProfile(): void {
    this.dbprofiles.push(this.profile)
    .then(x => this.router.navigate(["pages","profiles"]));
  }

  updateProfile() {
    this.db.object('profiles/' + this.id).update(this.profile)
    .then(x => this.router.navigate(["pages","profiles"]));    
  }

}
