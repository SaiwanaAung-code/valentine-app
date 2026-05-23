import { Component, computed, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  isAccepted = signal(false);
  noCount = signal(0);

  // The texts that change to guilt-trip them
  noTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart 😭"
  ];

  // The GIFs that get progressively sadder, then happy at the end
  gifs = [
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa215bXhnamd6cXd0dGZla2V2YzlpOW00ZzQ3OGVwdG8zbWkyYWg5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lHTJgttLitH3BKpEXr/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWFyOWVsM21yOWNuOHIzMWx3OGNnZjk1bWpvem4xemFmamRwZWExOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/W4RizlO6qZWQRYw9mb/giphy.gif",           // 0: Ask
    ];

  // Dynamically compute the current text
  currentNoText = computed(() => {
    return this.noTexts[Math.min(this.noCount(), this.noTexts.length - 1)];
  });

  // Dynamically compute the current GIF
  currentGif = computed(() => {
    if (this.isAccepted()) {
      // Success GIF!
      return "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenZ6cGRweWppbGs0Z2Z5bDBhd2R0Njd0NDk2Z2pha2M5eHdxZnRtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fvN5KrNcKKUyX7hNIA/giphy.gif";
    }
    return this.gifs[Math.min(this.noCount(), this.gifs.length - 1)];
  });

  // Massively increase the Yes button size (starts at 16px, grows by 35px per click!)
  yesButtonSize = computed(() => {
    return 16 + (this.noCount() * 35);
  });

  handleNoClick() {
    this.noCount.update(n => n + 1);
  }

  acceptValentine() {
    this.isAccepted.set(true);
    this.triggerConfetti();
  }

  triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#0022ff', '#ff0000', '#ffffff'] });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff7eb3', '#ff758c', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }
}
