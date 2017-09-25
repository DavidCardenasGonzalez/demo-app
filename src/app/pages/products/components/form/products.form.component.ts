
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';

import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'productsForm',
  templateUrl: './products.form.html',
  styleUrls: ['./products.form.scss']
})
export class ProductsForm implements OnInit {
 public id;
 public dbproducts;
 public product: Product =new Product();
  constructor(protected service: ProductsService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute){
    this.dbproducts = this.db.list('products')
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
      if(this.id){
        this.getProduct(this.id)
      }
  }

  getProduct(id){
    this.db.object('products/' + id)
      .subscribe(arg => this.product = arg);
        
  }
  
  save() {
    if(this.id){
      this.updateProduct()
    } else {
      this.addProduct()      
    }
  }

  addProduct(): void {
    this.dbproducts.push(this.product)
    .then(x => this.router.navigate(["pages","products"]));
  }

  updateProduct() {
    this.db.object('products/' + this.id).update(this.product)
    .then(x => this.router.navigate(["pages","products"]));    
  }

}
