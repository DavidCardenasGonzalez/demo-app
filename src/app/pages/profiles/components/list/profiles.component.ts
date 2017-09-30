
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService } from '../../profiles.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../shared/modals/default-modal/default-modal.component';

@Component({
  selector: 'profilesList',
  templateUrl: './profiles.html',
  styleUrls: ['./profiles.scss']
})
export class ProfilesList implements OnInit {
  ngOnInit() {
  }
  query: string = '';

  settings = {
    mode :"external",
    actions: {
      columnTitle: "",
      edit: false,
      position: "right"
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    // edit: {
    //   editButtonContent: '<i class="ion-edit"></i>',
    //   saveButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    // },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Nombre',
        type: 'string'
      },
    }
  };

   source: LocalDataSource = new LocalDataSource();
  constructor(protected service: ProfilesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router,private modalService: NgbModal) {
    this.db.list('profiles')
    .subscribe(list => {
      this.source.load(list);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  deleteProfile(event) {
    console.log(event);
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm',
                                                              backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Confirmacion';
    activeModal.componentInstance.modalContent = "Deseas eliminar el usuario " + event.data.name + "?";
    activeModal.componentInstance.showCancelButton = true;
    activeModal.result.then((result) => {
      if(result){
        this.db.object('profiles/' + event.data.$key).remove()                
      }
    }, (reason) => {
        console.log(reason);
    });
  }

  addProfile(event): void {
     this.router.navigate(['pages', 'profiles', 'add']);
    // this.source.push({ name: "usuario 1" });
  }

  editProfile(event): void {
    console.log(event);
    this.router.navigate(['pages', 'profiles', event.data.$key]);
   // this.source.push({ name: "usuario 1" });
 }

}
