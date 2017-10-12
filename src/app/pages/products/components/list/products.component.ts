
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from 'app/shared/modals/default-modal/default-modal.component';

@Component({
  selector: 'productsList',
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsList implements OnInit {
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
      price: {
        title: 'Precio',
        type: 'number'
      },
    }
  };

   source: LocalDataSource = new LocalDataSource();
  constructor(protected service: ProductsService, private auth: AuthService, public db: AngularFireDatabase, private router: Router,private modalService: NgbModal) {
    this.db.list('products')
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

  deleteProduct(event) {
    console.log(event);
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm',
                                                              backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Confirmacion';
    activeModal.componentInstance.modalContent = "Deseas eliminar el producto " + event.data.name + "?";
    activeModal.componentInstance.showCancelButton = true;
    activeModal.result.then((result) => {
      if(result){
        this.db.object('products/' + event.data.$key).remove()                
      }
    }, (reason) => {
        console.log(reason);
    });
  }

  addProduct(event): void {
     this.router.navigate(['pages', 'products', 'add']);
    // this.source.push({ name: "producto 1" });
  }

  editProduct(event): void {
    console.log(event);
    this.router.navigate(['pages', 'products', event.data.$key]);
   // this.source.push({ name: "producto 1" });
 }

}
