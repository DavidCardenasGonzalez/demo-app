
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../sales.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../shared/modals/default-modal/default-modal.component';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { SaleLine } from 'app/pages/sales/sale.model';

@Component({
  selector: 'salesList',
  templateUrl: './sales.html',
  styleUrls: ['./sales.scss']
})
export class SalesList implements OnInit {
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
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      date: {
        title: 'Fecha',
        type: 'date'
      },
      customer: {
        title: 'Cliente',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'number'
      },
      total: {
        title: 'Total',
        type: 'number'
      },
    }
  };

   source: LocalDataSource = new LocalDataSource();
  constructor(protected service: SalesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router,private modalService: NgbModal) {
    var that = this;
    var salesObservable = this.db.list('sales').take(1);
    var customersObservable = this.db.list('customers').take(1);
    var profilesObservable = this.db.list('profiles').take(1);    
    Observable.forkJoin(salesObservable,customersObservable,profilesObservable)
    .subscribe(
    (response) => {
      var sales = response[0];
      var customers = response[1];
      var list = sales.map(function(s){
        return {
          $key: s.$key,
          date: s.date,
          customer: _.find(customers, function(cus: any){
              return cus.$key == s.customer;
          }).name,
          status: s.status,
          total: that.total(s)
        }      
      });
      that.source.load(list);      
    });
  }

  taxesLine(sale, line: SaleLine){
    return sale.iva ? line.quantity * line.unitaryPrice * 0.16 : 0;    
  }

  totalTaxes(sale){
    var that = this;
    return _.reduce(sale.lines, function(sum, line:SaleLine){
      return sum + that.taxesLine(sale, line);
    },0);    
  }
  subtotal(sale){
    return _.reduce(sale.lines, function(sum, line:SaleLine){
      return sum + (line.quantity * line.unitaryPrice);
    },0);  
  }
  total(sale){
    return this.totalTaxes(sale) + this.subtotal(sale);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  deleteSale(event) {
    console.log(event);
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm',
                                                              backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Confirmacion';
    activeModal.componentInstance.modalContent = "Deseas eliminar el venta " + event.data.name + "?";
    activeModal.componentInstance.showCancelButton = true;
    activeModal.result.then((result) => {
      if(result){
        this.db.object('sales/' + event.data.$key).remove()                
      }
    }, (reason) => {
        console.log(reason);
    });
  }

  addSale(event): void {
     this.router.navigate(['pages', 'sales', 'add']);
    // this.source.push({ name: "venta 1" });
  }

  editSale(event): void {
    console.log(event);
    this.router.navigate(['pages', 'sales', event.data.$key]);
   // this.source.push({ name: "venta 1" });
 }

}
