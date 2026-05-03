import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;

  constructor() {}

  async playLetter(audioFile: string, arabicText: string, latinText: string): Promise<void> {
    this.stopCurrent();

    try {
      const audioPath = `assets/audio/${audioFile}.mp3`;
      await this.playFromFile(audioPath, audioFile, arabicText, latinText);
    } catch {
      
    }
  }

  private async playFromFile(path: string, key: string, arabic: string, latin: string): Promise<void> {
    return new Promise((resolve) => {
      let audio = this.audioCache.get(key);

      if (!audio) {
        audio = new Audio(path);

        audio.addEventListener('canplaythrough', () => {
          this.audioCache.set(key, audio!);
        });
      }

      audio.onended = () => {
        this.isPlaying = false;
        this.currentAudio = null;
        resolve();
      };

      this.currentAudio = audio;
      this.isPlaying = true;

      audio.play().catch(() => {
        resolve();
      });
    });
  }

  stopCurrent(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.isPlaying = false;
  }
}