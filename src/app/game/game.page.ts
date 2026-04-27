import { Component, OnInit } from '@angular/core';
import { IQRO_DATA } from '../data/iqro-data';
import { StorageService } from '../services/storage';
import { AudioService } from '../services/audio';

interface Question {
  mode: 'arabic-to-latin' | 'latin-to-arabic' | 'audio-to-arabic';
  question: string;
  answer: string;
  options: string[];
  audioFile?: string;
  arabic?: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone:false,
})
export class GamePage implements OnInit {

  questions: Question[] = [];
  currentQuestion: Question | null = null;
  currentQ = 0;
  totalQ = 10;

  // Score
  score = 0;
  lives = 3;
  combo = 0;
  maxCombo = 0;
  correctCount = 0;
  wrongCount = 0;
  gainedPoints = 0;
  xpGained = 0;

  selectedAnswer = '';
  showAnswer = false;
  isCorrect = false;
  isShaking = false;
  gameOver = false;
  currentColor = '#2ecc71';

  private allLetters: { arabic: string; latin: string; audioFile: string }[] = [];

  constructor(
    private storageService: StorageService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.buildLetterPool();
    this.startGame();
  }

  private buildLetterPool() {
    // Kumpulkan semua huruf dari semua jilid
    IQRO_DATA.forEach(jilid => {
      jilid.pages.forEach(page => {
        page.letters.forEach(letter => {
          // Hindari duplikat
          if (!this.allLetters.find(l => l.arabic === letter.arabic)) {
            this.allLetters.push({
              arabic: letter.arabic,
              latin: letter.latin,
              audioFile: letter.audioFile,
            });
          }
        });
      });
    });
  }

  startGame() {
    this.questions = this.generateQuestions(this.totalQ);
    this.currentQ = 0;
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.xpGained = 0;
    this.gameOver = false;
    this.loadQuestion();
  }

  private generateQuestions(count: number): Question[] {
    const questions: Question[] = [];
    const modes: Question['mode'][] = [
      'arabic-to-latin',
      'latin-to-arabic',
      'audio-to-arabic',
    ];

    const shuffled = [...this.allLetters].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);

    picked.forEach((letter, i) => {
      const mode = modes[i % modes.length];
      const wrongOptions = this.allLetters
        .filter(l => l.arabic !== letter.arabic)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      let question = '';
      let answer = '';
      let options: string[] = [];

      if (mode === 'arabic-to-latin') {
        question = letter.arabic;
        answer = letter.latin;
        options = [
          letter.latin,
          ...wrongOptions.map(w => w.latin),
        ].sort(() => Math.random() - 0.5);
      } else if (mode === 'latin-to-arabic') {
        question = letter.latin;
        answer = letter.arabic;
        options = [
          letter.arabic,
          ...wrongOptions.map(w => w.arabic),
        ].sort(() => Math.random() - 0.5);
      } else {
        // audio-to-arabic
        question = letter.latin;
        answer = letter.arabic;
        options = [
          letter.arabic,
          ...wrongOptions.map(w => w.arabic),
        ].sort(() => Math.random() - 0.5);
      }

      questions.push({
        mode,
        question,
        answer,
        options,
        audioFile: letter.audioFile,
        arabic: letter.arabic,
      });
    });

    return questions;
  }

  private loadQuestion() {
    if (this.currentQ < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQ];
      this.selectedAnswer = '';
      this.showAnswer = false;
      this.isShaking = false;

      const colors = ['#2ecc71', '#3498db', '#e74c3c', '#f39c12', '#9b59b6'];
      this.currentColor = colors[this.currentQ % colors.length];

      if (this.currentQuestion.mode === 'audio-to-arabic') {
        setTimeout(() => this.playCurrentAudio(), 600);
      }
    }
  }

  playCurrentAudio() {
    if (this.currentQuestion?.audioFile) {
      this.audioService.playLetter(
        this.currentQuestion.audioFile,
        this.currentQuestion.arabic || '',
        this.currentQuestion.question
      );
    }
  }

  selectAnswer(option: string) {
    if (this.showAnswer) return;

    this.selectedAnswer = option;
    this.showAnswer = true;
    this.isCorrect = option === this.currentQuestion?.answer;

    if (this.isCorrect) {
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;

      // Poin dengan combo bonus
      this.gainedPoints = 10 + (this.combo > 1 ? (this.combo - 1) * 5 : 0);
      this.score += this.gainedPoints;
      this.correctCount++;
    } else {
      this.combo = 0;
      this.gainedPoints = 0;
      this.lives--;
      this.isShaking = true;
      setTimeout(() => this.isShaking = false, 500);

      if (this.lives <= 0) {
        setTimeout(() => this.endGame(), 1200);
        return;
      }
    }
  }

  nextQuestion() {
    this.currentQ++;
    if (this.currentQ >= this.totalQ || this.lives <= 0) {
      this.endGame();
    } else {
      this.loadQuestion();
    }
  }

  private async endGame() {
    this.gameOver = true;
    
    this.xpGained = Math.floor(this.score / 5);
    if (this.xpGained > 0) {
      await this.storageService.addXP(this.xpGained);
    }
  }

  restartGame() {
    this.startGame();
  }
}