import { Class } from '@angular/core';


  export class Customer {
    constructor(){
      this.contacts = [];
    }
    $key: string;    
      name: string;
      phone: string;
      website: string;
      notes: string;
      contacts: Contact[];

  }

  export class Contact {
    constructor(){
      this.id = Math.ceil(Math.random()*10000);
    }
    id: number;
    name: string;
    lastname: string;
    position: string;
    phone: string;
    phone2: string;
    whatsapp: string;
    facebook: string;
}