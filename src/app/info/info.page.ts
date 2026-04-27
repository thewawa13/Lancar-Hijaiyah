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
    // Ganti URL ini dengan URL kebijakan privasi Anda yang sebenarnya
    await Browser.open({
      url: 'https://sites.google.com/view/iqrodigitalpintar-privasi',
      windowName: '_system'
    });
  }
}