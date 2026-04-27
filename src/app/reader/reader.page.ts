import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IQRO_DATA, IqroJilid, IqroPage, IqroLetter } from '../data/iqro-data';
import { StorageService } from '../services/storage';
import { AudioService } from '../services/audio';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
  standalone: false,
})
export class ReaderPage implements OnInit, OnDestroy {

  currentJilid: IqroJilid | undefined;
  currentPage: IqroPage | undefined;
  jilidId = 0;
  pageNum = 1;
  completedPages = 0;
  playingId: string | null = null;
  jilidColor = 'success';

  private colorMap: Record<number, string> = {
    1: 'danger', 2: 'warning', 3: 'tertiary',
    4: 'success', 5: 'primary', 6: 'secondary'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private audioService: AudioService,
    private toastCtrl: ToastController
  ) {}

 async ngOnInit() {
  // Samakan nama parameternya dengan yang ada di app-routing.module.ts
  this.jilidId = Number(this.route.snapshot.paramMap.get('id')); // Ganti 'jilidId' jadi 'id'
  this.pageNum = Number(this.route.snapshot.paramMap.get('page')); // Ganti 'pageNum' jadi 'page'
  
  this.currentJilid = IQRO_DATA.find(j => j.id === this.jilidId);
  this.jilidColor = this.colorMap[this.jilidId] || 'success';
  this.loadPage();
  this.completedPages = await this.storageService.getProgressForJilid(this.jilidId);
}

  ngOnDestroy() {
    this.audioService.stopCurrent();
  }

  private loadPage() {
    if (this.currentJilid) {
      this.currentPage = this.currentJilid.pages.find(
        p => p.pageNumber === this.pageNum
      );
      this.playingId = null;
    }
  }

  async playLetter(letter: IqroLetter) {
    this.playingId = letter.id;
    await this.audioService.playLetter(letter.audioFile, letter.arabic, letter.latin);
    setTimeout(() => {
      if (this.playingId === letter.id) {
        this.playingId = null;
      }
    }, 2500);
  }

  nextPage() {
    if (this.currentJilid && this.pageNum < this.currentJilid.totalPages) {
      this.pageNum++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.pageNum > 1) {
      this.pageNum--;
      this.loadPage();
    }
  }

  async markDone() {
  if (this.pageNum > this.completedPages) {
    this.completedPages = this.pageNum;
    await this.storageService.saveProgress(this.jilidId, this.pageNum);

    // Cek apakah jilid selesai
    const jilidSelesai = this.currentJilid &&
      this.pageNum === this.currentJilid.totalPages
      ? this.jilidId : undefined;

    // Tambah XP berdasarkan jilid
    const xpGained = this.jilidId * 10;
    const newStats = await this.storageService.addXP(xpGained, jilidSelesai);

    // Tampilkan toast dengan XP
    const pesanBonus = jilidSelesai
      ? `👑 Jilid ${jilidSelesai} Selesai! +${xpGained} XP`
      : `⚡ +${xpGained} XP! Level ${newStats.level}`;

    const toast = await this.toastCtrl.create({
      message: `🎉 ${pesanBonus}`,
      duration: 2500,
      color: jilidSelesai ? 'warning' : 'success',
      position: 'bottom',
    });
    toast.present();
  }
}

  async saveBookmark() {
    if (this.currentJilid && this.currentPage) {
      await this.storageService.saveBookmark({
        jilidId: this.jilidId,
        pageNumber: this.pageNum,
        jilidTitle: this.currentJilid.title,
        pageTitle: this.currentPage.title,
        savedAt: new Date().toISOString(),
      });
      const toast = await this.toastCtrl.create({
        message: '🔖 Bookmark disimpan!',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      toast.present();
    }
  }
}