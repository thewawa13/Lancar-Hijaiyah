import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: false,
})
export class InfoPage {
  async openPrivacyPolicy() {
  await Browser.open({
    url: 'https://sites.google.com/view/privacypolicyforlancarhijaiyah/halaman-muka',
    windowName: '_system'
  });
}
}