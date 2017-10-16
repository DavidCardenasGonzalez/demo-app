import { Class } from '@angular/core';
import { Customer, Contact } from "../customers/customer.model";
import { Product } from "../products/product.model";
import { Profile } from "../profiles/profile.model";

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
      activity: string;  
      user: Profile;  
    }