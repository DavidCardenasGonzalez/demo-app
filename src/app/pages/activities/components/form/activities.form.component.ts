
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ActivitiesService } from '../../activities.service';
import { Activity } from '../../activity.model';

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

import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'activitiesForm',
  templateUrl: './activities.form.html',
  styleUrls: ['./activities.form.scss']
})
export class ActivitiesForm implements OnInit {
  activities: any;
  temporalActivities: Activity[] = [];
  timelineTect: string;
  public id;
  public dbactivities;
  //public lineToEdit = new ActivityLine();
  public activity: Activity = new Activity();
  public products: Product[] = [];
  public customers: Customer[] = [];
  public selectedCustomer: Customer = new Customer();
  public profiles: Profile[] = [];
  constructor(protected service: ActivitiesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) {
    this.dbactivities = this.db.list('activities');

  }

  ngOnInit() {
    console.log(this.activity);

    this.getCatalogs()
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.getActivity(this.id)
      this.activities = this.db.list('activities', {
        query: {
          orderByChild: 'activity',
          equalTo: this.id
        }
      });
    }
  }

  getActivity(id) {
    this.db.object('activities/' + id)
      .subscribe(arg => {
        this.activity = arg;
        // if(!this.activity.lines){
        //   this.activity.lines = [];
        // }
        // this.changeClient();
      });

  }

  getCatalogs() {
    var productsObservable = this.db.list('products').take(1);
    var customersObservable = this.db.list('customers').take(1);
    var profilesObservable = this.db.list('profiles').take(1);
    Observable.forkJoin(productsObservable, customersObservable, profilesObservable)
      .subscribe(
      (response) => {
        this.products = response[0];
        this.customers = response[1];
        this.profiles = response[2];
        //this.changeClient();       
      },
      (error) => {
        console.log(error);

      });
  }

  save() {
    if (this.id) {
      this.updateActivity()
    } else {
      this.addActivity()
    }
  }

  addActivity(): void {
    var that = this;
    this.dbactivities.push(this.activity)
      .then(x => {
        console.log(x.key);
        var act = this.temporalActivities.map(function (act) {
          act.activity = x.key;
          that.db.list('activities').push(act);
        })
        this.router.navigate(["pages", "activities"])
      });
  }

  updateActivity() {
    this.db.object('activities/' + this.id).update(this.activity)
      .then(x => this.router.navigate(["pages", "activities"]));
  }

  // changeClient(){
  //   var that = this;
  //   if(this.customers.length > 0 && this.activity.customer){
  //     this.selectedCustomer = _.find(this.customers, 
  //       function(customer){ return customer.$key == that.activity.customer});
  //   }    
  // }

  // addLine(){
  //   var newLine = new ActivityLine();
  //   this.activity.lines.push(newLine);
  //   this.lineToEdit = newLine;
  // }

  // deleteLine(activityLine: ActivityLine){
  //   this.activity.lines = _.without(this.activity.lines, activityLine);
  // }

  // changeProduct(line: ActivityLine){
  //   var that = this;
  //     var product = _.find(this.products, 
  //       function(product){ return product.$key == line.productId});
  //       line.unitaryPrice = product.price ? product.price : 0;
  // }

  // getProductName(line: ActivityLine){
  //   if(this.products.length > 0){
  //     var product = _.find(this.products, 
  //       function(product){ return product.$key == line.productId});
  //       return product ? product.name : '';
  //   }else{
  //     return "";
  //   }
  // }

  // taxesLine(line: ActivityLine){
  //   return this.activity.iva ? line.quantity * line.unitaryPrice * 0.16 : 0;    
  // }
  // totalTaxes(){
  //   var that = this;
  //   return _.reduce(this.activity.lines, function(sum, line:ActivityLine){
  //     return sum + that.taxesLine(line);
  //   },0);    
  // }
  // subtotal(){
  //   return _.reduce(this.activity.lines, function(sum, line:ActivityLine){
  //     return sum + (line.quantity * line.unitaryPrice);
  //   },0);  
  // }

  // addTimeline(){
  //   var timeline = new Timeline();
  //   timeline.fact = this.timelineTect;
  //   if(!this.activity.timeline){
  //     this.activity.timeline = [];
  //   }
  //   this.activity.timeline.push(timeline);
  //   this.timelineTect ="";
  // }
  // addActivity(activity) {
  //   const activeModal = this.modalService.open(ActivityModal, {size: 'lg',
  //   backdrop: 'static'});
  //   if(activity){
  //     activeModal.componentInstance.activity = activity;  

  //   }
  //   activeModal.result.then((result) => {
  //     if(result){
  //       if(this.id){
  //           if(result.$key){
  //             this.db.object('activities/' + result.$key).update(result)   
  //           }else{
  //             result.activity = this.id;
  //             this.activities.push(result);                     
  //           }
  //       }else{
  //         this.temporalActivities.push(result);                               
  //       }

  //     }
  //   }, (reason) => {
  //       console.log(reason);
  //   });
  // }

}
