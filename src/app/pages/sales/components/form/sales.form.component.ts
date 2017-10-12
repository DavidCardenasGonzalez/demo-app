
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SalesService } from '../../sales.service';
import { Sale, SaleLine,Activity,Timeline } from '../../sale.model';

import { Customer, Contact } from "../../../customers/customer.model";
import { Product } from "../../../products/product.model";
import { Profile } from "../../../profiles/profile.model";

import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityModal } from '../../../../shared/modals/activity-modal/activity-modal.component';

import * as firebase from 'firebase/app';
import * as _ from 'lodash';

import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'salesForm',
  templateUrl: './sales.form.html',
  styleUrls: ['./sales.form.scss']
})
export class SalesForm implements OnInit {
  activities: any;
  temporalActivities: Activity[] = [];
  timelineTect: string;
  public id;
 public dbsales;
 public lineToEdit = new SaleLine();
 public sale: Sale =new Sale();
 public products: Product[] = [];
 public customers: Customer[] = [];
 public selectedCustomer: Customer = new Customer();
 public profiles: Profile[] = [];
  constructor(protected service: SalesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal){
    this.dbsales = this.db.list('sales');
 
  }

  ngOnInit() {
 console.log(this.sale);
 
    this.getCatalogs()
    this.id = this.activatedRoute.snapshot.params["id"];
      if(this.id){
        this.getSale(this.id)
        this.activities = this.db.list('activities',{query: {
          orderByChild: 'sale',
          equalTo: this.id
        }});
      }
  }

  getSale(id){
    this.db.object('sales/' + id)
      .subscribe(arg => {
        this.sale = arg;
        if(!this.sale.lines){
          this.sale.lines = [];
        }
        this.changeClient();
      });
        
  }

  getCatalogs(){
    var productsObservable = this.db.list('products').take(1);
    var customersObservable = this.db.list('customers').take(1);
    var profilesObservable = this.db.list('profiles').take(1);    
    Observable.forkJoin(productsObservable,customersObservable,profilesObservable)
    .subscribe(
    (response) => {
       this.products = response[0];
       this.customers = response[1];
       this.profiles = response[2];
       this.changeClient();       
    },
    (error) => {
      console.log(error);

   });
  }
  
  save() {
    if(this.id){
      this.updateSale()
    } else {
      this.addSale()      
    }
  }

  addSale(): void {
    var that = this;
    this.dbsales.push(this.sale)
    .then(x => {
      console.log(x.key);
      var act = this.temporalActivities.map(function(act){
        act.sale = x.key;
        that.db.list('activities').push(act);
      })
      this.router.navigate(["pages","sales"])
    });
  }

  updateSale() {
    this.db.object('sales/' + this.id).update(this.sale)
    .then(x => this.router.navigate(["pages","sales"]));    
  }

  changeClient(){
    var that = this;
    if(this.customers.length > 0 && this.sale.customer){
      this.selectedCustomer = _.find(this.customers, 
        function(customer){ return customer.$key == that.sale.customer});
    }    
  }

  addLine(){
    var newLine = new SaleLine();
    this.sale.lines.push(newLine);
    this.lineToEdit = newLine;
  }

  deleteLine(saleLine: SaleLine){
    this.sale.lines = _.without(this.sale.lines, saleLine);
  }

  changeProduct(line: SaleLine){
    var that = this;
      var product = _.find(this.products, 
        function(product){ return product.$key == line.productId});
        line.unitaryPrice = product.price ? product.price : 0;
  }

  getProductName(line: SaleLine){
    if(this.products.length > 0){
      var product = _.find(this.products, 
        function(product){ return product.$key == line.productId});
        return product ? product.name : '';
    }else{
      return "";
    }
  }

  taxesLine(line: SaleLine){
    return this.sale.iva ? line.quantity * line.unitaryPrice * 0.16 : 0;    
  }
  totalTaxes(){
    var that = this;
    return _.reduce(this.sale.lines, function(sum, line:SaleLine){
      return sum + that.taxesLine(line);
    },0);    
  }
  subtotal(){
    return _.reduce(this.sale.lines, function(sum, line:SaleLine){
      return sum + (line.quantity * line.unitaryPrice);
    },0);  
  }
    
  addTimeline(){
    var timeline = new Timeline();
    timeline.fact = this.timelineTect;
    if(!this.sale.timeline){
      this.sale.timeline = [];
    }
    this.sale.timeline.push(timeline);
    this.timelineTect ="";
  }
  addActivity(activity) {
    const activeModal = this.modalService.open(ActivityModal, {size: 'lg',
    backdrop: 'static'});
    if(activity){
      activeModal.componentInstance.activity = activity;  
          
    }
    activeModal.result.then((result) => {
      if(result){
        if(this.id){
            if(result.$key){
              this.db.object('activities/' + result.$key).update(result)   
            }else{
              result.sale = this.id;
              this.activities.push(result);                     
            }
        }else{
          this.temporalActivities.push(result);                               
        }

      }
    }, (reason) => {
        console.log(reason);
    });
  }

}
