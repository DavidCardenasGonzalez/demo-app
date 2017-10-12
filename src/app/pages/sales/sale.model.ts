import { Class } from '@angular/core';
import { Customer, Contact } from "../customers/customer.model";
import { Product } from "../products/product.model";
import { Profile } from "../profiles/profile.model";


  export class Sale {
      constructor() {
          this.timeline = [];
          this.lines = [];
          var date = new Date();
          var day = date.getDate();
          var monthIndex = date.getMonth()+1;
          var year = date.getFullYear();
          this.date = year + '-' + monthIndex + '-' + day;
      }
      $key: string;
      date: any;
      customer: string;
      mandated: string;
      status: SaleStatus;
      iva: boolean;
      lines: SaleLine[];
      timeline: Timeline[];
  }

    export class Timeline {
      constructor(){
        this.date = new Date();
      }
      date: Date;
      hour: Hour; 
      fact: string;     
      notes: string;     
    }

    export class Hour {
      hour: number; 
      minute: number;     
    }

    export class Activity {
      constructor(){
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth()+1;
        var year = date.getFullYear();
        this.date = year + '-' + monthIndex + '-' + day;
      }
      date: any;
      hour: any; 
      fact: string;     
      notes: string; 
      sale: string;  
      user: Profile;  
    }

    export class SaleLine {
      constructor(){
        this.quantity = 0;
        this.unitaryPrice = 0;
      }
      product: Product;  
      productId: string;  
      quantity: number;  
      unitaryPrice: number;  
      notes: string; 
      taxes(have: boolean){
        return have ? this.quantity * this.unitaryPrice * 0.16 : 0;
      } 
    }
  export enum SaleStatus{
    contactado,
    visitado,
    cotizado,
    aceptado,
    rechazado
  }