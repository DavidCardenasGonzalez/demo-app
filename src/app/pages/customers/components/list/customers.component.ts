
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../../customers.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../shared/modals/default-modal/default-modal.component';

@Component({
  selector: 'customersList',
  templateUrl: './customers.html',
  styleUrls: ['./customers.scss']
})
export class CustomersList implements OnInit {
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
      phone: {
        title: 'Telefono',
        type: 'string'
      },
      website: {
        title: 'Pagina web',
        type: 'string'
      },
    }
  };

   source: LocalDataSource = new LocalDataSource();
  constructor(protected service: CustomersService, private auth: AuthService, public db: AngularFireDatabase, private router: Router,private modalService: NgbModal) {
    this.db.list('customers')
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

  deleteCustomer(event) {
    console.log(event);
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm',
                                                              backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Confirmacion';
    activeModal.componentInstance.modalContent = "Deseas eliminar el cliente " + event.data.name + "?";
    activeModal.componentInstance.showCancelButton = true;
    activeModal.result.then((result) => {
      if(result){
        this.db.object('customers/' + event.data.$key).remove()                
      }
    }, (reason) => {
        console.log(reason);
    });
  }

  addCustomer(event): void {
     this.router.navigate(['pages', 'customers', 'add']);
    // this.source.push({ name: "cliente 1" });
  }

  editCustomer(event): void {
    console.log(event);
    this.router.navigate(['pages', 'customers', event.data.$key]);
   // this.source.push({ name: "cliente 1" });
 }

}
