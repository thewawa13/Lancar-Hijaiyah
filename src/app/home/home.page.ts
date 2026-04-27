import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQRO_DATA, IqroJilid } from '../data/iqro-data';
import { StorageService, BookmarkData, GameStats } from '../services/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false,
})
export class HomePage implements OnInit {

  jilidList: IqroJilid[] = IQRO_DATA;
  lastBookmark: BookmarkData | null = null;
  progressMap: Record<number, number> = {};
  gameStats: GameStats | null = null;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  private async loadData() {
    this.lastBookmark = await this.storageService.getBookmark();
    this.gameStats = await this.storageService.getGameStats();
    const progress = await this.storageService.getAllProgress();
    this.jilidList.forEach(j => {
      this.progressMap[j.id] = progress[`jilid_${j.id}`] || 0;
    });
  }

  getXPPercent(): number {
    if (!this.gameStats) return 0;
    const xpInLevel = this.gameStats.totalXP % 100;
    return xpInLevel;
  }

  goToJilid(id: number) {
    this.router.navigate(['/jilid', id]);
  }

  goToBookmark() {
    if (this.lastBookmark) {
      this.router.navigate(['/reader', this.lastBookmark.jilidId, this.lastBookmark.pageNumber]);
    }
  }
}