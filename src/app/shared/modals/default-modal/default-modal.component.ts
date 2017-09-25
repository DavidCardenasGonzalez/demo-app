import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalButton: string = "Aceptar";
  modalCancelButton: string = "Cancelar";
  modalContent: string = ``;
  showCancelButton = false;
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  ok() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.close(false);
  }

  closeModal() {
    this.activeModal.close();
  }
}
