import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from 'app/pages/sales/sale.model';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./activity-modal.component.scss')],
  templateUrl: './activity-modal.component.html'
})

export class ActivityModal implements OnInit {

  modalHeader: string = 'Agregar actividad';
  modalButton: string = "Aceptar";
  modalCancelButton: string = "Cancelar";
  modalContent: string = ``;
  showCancelButton = false;
  activity = new Activity();
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  ok() {
    this.activeModal.close(this.activity);
  }

  cancel() {
    this.activeModal.close(false);
  }

  closeModal() {
    this.activeModal.close();
  }
}
