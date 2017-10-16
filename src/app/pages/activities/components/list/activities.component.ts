
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivitiesService } from '../../activities.service';
// import { LocalDataSource } from 'ng2-smart-table';
// import { AuthService } from '../../../../shared/auth.service';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import * as firebase from 'firebase/app';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DefaultModal } from '../../../../shared/modals/default-modal/default-modal.component';
// import { Observable } from 'rxjs/Observable';
// import * as _ from 'lodash';

// @Component({
//   selector: 'activitiesList',
//   templateUrl: './activities.html',
//   styleUrls: ['./activities.scss']
// })
// export class ActivitiesList implements OnInit {
//   ngOnInit() {
//   }
//   query: string = '';

//   settings = {
//     mode :"external",
//     actions: {
//       columnTitle: "",
//       edit: false,
//       position: "right"
//     },
//     add: {
//       addButtonContent: '<i class="ion-ios-plus-outline"></i>',
//       createButtonContent: '<i class="ion-checkmark"></i>',
//       cancelButtonContent: '<i class="ion-close"></i>',
//     },
//     delete: {
//       deleteButtonContent: '<i class="ion-trash-a"></i>',
//       confirmDelete: true
//     },
//     columns: {
//       date: {
//         title: 'Fecha',
//         type: 'date'
//       },
//       customer: {
//         title: 'Cliente',
//         type: 'string'
//       },
//       status: {
//         title: 'Estatus',
//         type: 'number'
//       },
//       total: {
//         title: 'Total',
//         type: 'number'
//       },
//     }
//   };

//    source: LocalDataSource = new LocalDataSource();
//   constructor(protected service: ActivitiesService, private auth: AuthService, public db: AngularFireDatabase, private router: Router,private modalService: NgbModal) {
//     var that = this;
//     var activitiesObservable = this.db.list('activities').take(1);
//     var customersObservable = this.db.list('customers').take(1);
//     var profilesObservable = this.db.list('profiles').take(1);    
//     Observable.forkJoin(activitiesObservable,customersObservable,profilesObservable)
//     .subscribe(
//     (response) => {
//       var activities = response[0];
//       var customers = response[1];
//       // var list = activities.map(function(s){
//       //   return {
//       //     $key: s.$key,
//       //     date: s.date,
//       //     customer: _.find(customers, function(cus: any){
//       //         return cus.$key == s.customer;
//       //     }).name,
//       //     status: s.status,
//       //     total: that.total(s)
//       //   }      
//       //});
//       that.source.load(activities);      
//     });
//   }

//   onDeleteConfirm(event): void {
//     if (window.confirm('Are you sure you want to delete?')) {
//       event.confirm.resolve();
//     } else {
//       event.confirm.reject();
//     }
//   }

//   deleteActivity(event) {
//     console.log(event);
//     const activeModal = this.modalService.open(DefaultModal, {size: 'sm',
//                                                               backdrop: 'static'});
//     activeModal.componentInstance.modalHeader = 'Confirmacion';
//     activeModal.componentInstance.modalContent = "Deseas eliminar el venta " + event.data.name + "?";
//     activeModal.componentInstance.showCancelButton = true;
//     activeModal.result.then((result) => {
//       if(result){
//         this.db.object('activities/' + event.data.$key).remove()                
//       }
//     }, (reason) => {
//         console.log(reason);
//     });
//   }

//   addActivity(event): void {
//      this.router.navigate(['pages', 'activities', 'add']);
//     // this.source.push({ name: "venta 1" });
//   }

//   editActivity(event): void {
//     console.log(event);
//     this.router.navigate(['pages', 'activities', event.data.$key]);
//    // this.source.push({ name: "venta 1" });
//  }

// }
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./activities.scss'],
  templateUrl: './activities.html'
})
export class ActivitiesList {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}