import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService, BookmarkData } from '../services/storage';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
  standalone: false,
})
export class BookmarkPage implements OnInit {

  bookmark: BookmarkData | null = null;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.bookmark = await this.storageService.getBookmark();
  }

  async ionViewWillEnter() {
    this.bookmark = await this.storageService.getBookmark();
  }

  goToBookmark() {
    if (this.bookmark) {
      this.router.navigate(['/reader', this.bookmark.jilidId, this.bookmark.pageNumber]);
    }
  }

  async clearBookmark() {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Bookmark?',
      message: 'Posisi belajarmu akan dihapus.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: async () => {
            await this.storageService.clearBookmark();
            this.bookmark = null;
          }
        }
      ]
    });
    await alert.present();
  }
}