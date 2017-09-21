
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'productsForm',
  templateUrl: './products.form.html',
  styleUrls: ['./products.form.scss']
})
export class ProductsForm implements OnInit {
  ngOnInit() {
  }
 
  constructor(protected service: ProductsService, private auth: AuthService, public db: AngularFireDatabase) {
    var dbproducts = this.db.list('products')
    
  }

  addProduct(event): void {
    console.log(event);
    // this.source.push({ name: "producto 1" });
  }

}
