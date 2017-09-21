
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

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
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
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
  constructor(protected service: ProductsService, private auth: AuthService, public db: AngularFireDatabase, private router: Router) {
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

  addProduct(event): void {
    console.log(event);
     this.router.navigate(['pages', 'products', 'add']);
    // this.source.push({ name: "producto 1" });
  }

  select(e) {
    console.log(e);
  }
}
