import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
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
      // Jika file MP3 tidak ditemukan, lari ke sini
      this.speakWithTTS(latinText);
    }
  }

  private async playFromFile(path: string, key: string, arabic: string, latin: string): Promise<void> {
    return new Promise((resolve) => {
      let audio = this.audioCache.get(key);

      if (!audio) {
        audio = new Audio(path);
        
        // Jika file rekaman belum ada, langsung pakai TTS
        audio.addEventListener('error', () => {
          this.speakWithTTS(latin);
          resolve();
        });

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
        this.speakWithTTS(latin);
        resolve();
      });
    });
  }

  // Bagian TTS (Suara Robot) - Kita set agar lebih imut sebagai cadangan
  private speakWithTTS(text: string): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Menggunakan dialek Indonesia agar tidak logat Inggris
      utterance.rate = 0.8;    // Sedikit lambat agar fasih
      utterance.pitch = 1.5;   // Pitch tinggi agar suara robotnya terdengar lebih imut/anak-anak
      window.speechSynthesis.speak(utterance);
    }
  }

  stopCurrent(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
  }
}