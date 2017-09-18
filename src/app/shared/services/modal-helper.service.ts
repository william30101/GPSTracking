import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmPopupComponent } from '../../pages/device/confirm-popup.component';

@Injectable()
export class ModalHelperService {

  constructor(private modalService: BsModalService) {
  }
  showConfirm(title?: string, message?: string) {
    const bsModalRef = this.modalService.show(ConfirmPopupComponent,
      { animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: false });
    console.log('bsModalRef: ', bsModalRef);
  }
}
