import { Component } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-gift-box',
  templateUrl: './gift-box.component.html',
  styleUrls: ['./gift-box.component.scss'],
})
export class GiftBoxComponent {
  fireConfetti(): void {
    // Triggering the confetti with custom options
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
