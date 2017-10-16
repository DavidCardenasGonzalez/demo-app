import { Component, OnInit } from '@angular/core';

import {GlobalState} from '../../../global.state';
import { AuthService } from '../../../shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from 'app/pages/profiles/profile.model';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit  {
  profile: Profile;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, public authService: AuthService,  public db: AngularFireDatabase,) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit() {
    
    console.log(this.authService.currentUser);
    this.db.object('profiles/' + this.authService.currentUser.uid)
    .subscribe(arg => this.profile = arg);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout(){
    this.authService.logout();
  };
}
