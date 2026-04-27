import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface BookmarkData {
  jilidId: number;
  pageNumber: number;
  jilidTitle: string;
  pageTitle: string;
  savedAt: string;
}

export interface GameStats {
  totalXP: number;
  level: number;
  streak: number;
  lastPlayDate: string;
  badges: string[];
  completedJilid: number[];
}

@Injectable({ providedIn: 'root' })
export class StorageService {

  private BOOKMARK_KEY = 'iqro_bookmark';
  private PROGRESS_KEY = 'iqro_progress';
  private GAME_KEY = 'iqro_game_stats';

  // ───── BOOKMARK ─────
  async saveBookmark(data: BookmarkData): Promise<void> {
    await Preferences.set({ key: this.BOOKMARK_KEY, value: JSON.stringify(data) });
  }

  async getBookmark(): Promise<BookmarkData | null> {
    const result = await Preferences.get({ key: this.BOOKMARK_KEY });
    return result.value ? JSON.parse(result.value) : null;
  }

  async clearBookmark(): Promise<void> {
    await Preferences.remove({ key: this.BOOKMARK_KEY });
  }

  // ───── PROGRESS ─────
  async saveProgress(jilidId: number, pageNumber: number): Promise<void> {
    const existing = await this.getAllProgress();
    existing[`jilid_${jilidId}`] = pageNumber;
    await Preferences.set({ key: this.PROGRESS_KEY, value: JSON.stringify(existing) });
  }

  async getAllProgress(): Promise<Record<string, number>> {
    const result = await Preferences.get({ key: this.PROGRESS_KEY });
    return result.value ? JSON.parse(result.value) : {};
  }

  async getProgressForJilid(jilidId: number): Promise<number> {
    const all = await this.getAllProgress();
    return all[`jilid_${jilidId}`] || 0;
  }

  // ───── GAME STATS ─────
  async getGameStats(): Promise<GameStats> {
    const result = await Preferences.get({ key: this.GAME_KEY });
    if (result.value) return JSON.parse(result.value);
    return {
      totalXP: 0,
      level: 1,
      streak: 0,
      lastPlayDate: '',
      badges: [],
      completedJilid: [],
    };
  }

  async addXP(amount: number, jilidId?: number): Promise<GameStats> {
    const stats = await this.getGameStats();

    // Tambah XP
    stats.totalXP += amount;

    // Hitung level (setiap 100 XP naik level)
    stats.level = Math.floor(stats.totalXP / 100) + 1;

    // Update streak
    const today = new Date().toDateString();
    if (stats.lastPlayDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (stats.lastPlayDate === yesterday.toDateString()) {
        stats.streak += 1;
      } else if (stats.lastPlayDate !== today) {
        stats.streak = 1;
      }
      stats.lastPlayDate = today;
    }

    // Badge jilid selesai
    if (jilidId && !stats.completedJilid.includes(jilidId)) {
      stats.completedJilid.push(jilidId);
      const badgeMap: Record<number, string> = {
        1: '🏅 Juara Jilid 1',
        2: '🥈 Juara Jilid 2',
        3: '🥇 Juara Jilid 3',
        4: '🏆 Juara Jilid 4',
        5: '⭐ Juara Jilid 5',
      };
      if (badgeMap[jilidId]) stats.badges.push(badgeMap[jilidId]);
    }

    // Badge streak
    if (stats.streak === 3 && !stats.badges.includes('🔥 Streak 3 Hari')) {
      stats.badges.push('🔥 Streak 3 Hari');
    }
    if (stats.streak === 7 && !stats.badges.includes('💎 Streak 7 Hari')) {
      stats.badges.push('💎 Streak 7 Hari');
    }

    await Preferences.set({ key: this.GAME_KEY, value: JSON.stringify(stats) });
    return stats;
  }

  async resetGame(): Promise<void> {
    await Preferences.remove({ key: this.GAME_KEY });
    await Preferences.remove({ key: this.PROGRESS_KEY });
    await Preferences.remove({ key: this.BOOKMARK_KEY });
  }
}