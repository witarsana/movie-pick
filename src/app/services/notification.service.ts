import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
  });

  constructor(private toasterServ: ToasterService) {}
  show(
    type: 'warning' | 'success' | 'error' | 'info' | 'wait',
    title: string,
    body: string
  ) {
    this.toasterServ.pop({
      type: type,
      title: title,
      body: body,
      showCloseButton: true,
    });
  }
}
