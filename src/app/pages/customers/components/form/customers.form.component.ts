
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CustomersService } from '../../customers.service';
import { Customer, Contact } from '../../customer.model';

import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'customersForm',
  templateUrl: './customers.form.html',
  styleUrls: ['./customers.form.scss']
})
export class CustomersForm implements OnInit {
 public id;
 public dbcustomers;
 public contactToEdit: Contact;
 public customer: Customer =new Customer();
  constructor(protected service: CustomersService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute){
    this.dbcustomers = this.db.list('customers')
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
      if(this.id){
        this.getCustomer(this.id)
      }
  }

  getCustomer(id){
    this.db.object('customers/' + id)
      .subscribe(arg => this.customer = arg);
        
  }
  
  save() {
    if(this.id){
      this.updateCustomer()
    } else {
      this.addCustomer()      
    }
  }

  addCustomer(): void {
    this.dbcustomers.push(this.customer)
    .then(x => this.router.navigate(["pages","customers"]));
  }

  updateCustomer() {
    this.db.object('customers/' + this.id).update(this.customer)
    .then(x => this.router.navigate(["pages","customers"]));    
  }

  addContact(){
    var contact = new Contact();
    this.customer.contacts.push(contact);
    this.contactToEdit = contact;
  }

  deleteContact(contact: Contact){
    this.customer.contacts = _.without(this.customer.contacts, contact);
  }
}
