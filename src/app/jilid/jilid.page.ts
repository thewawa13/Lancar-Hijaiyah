import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IQRO_DATA, IqroJilid } from '../data/iqro-data';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-jilid',
  templateUrl: './jilid.page.html',
  styleUrls: ['./jilid.page.scss'],
  standalone: false,
})
export class JilidPage implements OnInit {

  currentJilid: IqroJilid | undefined;
  completedPages = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentJilid = IQRO_DATA.find(j => j.id === id);
    this.completedPages = await this.storageService.getProgressForJilid(id);
  }

  async ionViewWillEnter() {
    if (this.currentJilid) {
      this.completedPages = await this.storageService.getProgressForJilid(this.currentJilid.id);
    }
  }

  goToPage(pageNumber: number) {
    if (this.currentJilid) {
      this.router.navigate(['/reader', this.currentJilid.id, pageNumber]);
    }
  }

  async bookmarkCurrent() {
    if (this.currentJilid) {
      const nextPage = Math.min(this.completedPages + 1, this.currentJilid.totalPages);
      const page = this.currentJilid.pages[nextPage - 1];
      await this.storageService.saveBookmark({
        jilidId: this.currentJilid.id,
        pageNumber: nextPage,
        jilidTitle: this.currentJilid.title,
        pageTitle: page?.title || `Halaman ${nextPage}`,
        savedAt: new Date().toISOString(),
      });
      const toast = await this.toastCtrl.create({
        message: '🔖 Bookmark disimpan!',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
        cssClass: 'custom-toast',
      });
      toast.present();
    }
  }
}