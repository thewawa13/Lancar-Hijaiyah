import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor() {
    window.onerror = (msg, src, line, col, err) => {
      alert('ERROR:\n' + msg + '\nLine: ' + line);
      return false;
    };

    window.onunhandledrejection = (event) => {
      alert('PROMISE ERROR:\n' + event.reason);
    };
  }

  async ngOnInit() {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
}