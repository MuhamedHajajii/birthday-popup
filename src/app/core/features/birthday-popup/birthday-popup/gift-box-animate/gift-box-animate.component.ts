import { Component, OnInit, OnDestroy } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-gift-box-animate',
  templateUrl: './gift-box-animate.component.html',
  styleUrls: ['./gift-box-animate.component.scss'],
})
export class GiftBoxAnimateComponent {
  animation: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeAnimation();
  }

  ngOnDestroy(): void {
    if (this.animation) {
      this.animation.destroy(); // Clean up the animation when the component is destroyed
    }
  }

  private initializeAnimation(): void {
    this.animation = lottie.loadAnimation({
      container: document.getElementById('container') as HTMLElement, // Required
      path: 'https://source.queritel.com/animations/figozo-store/gift-box-ref.json', // Required
      renderer: 'svg', // Required
      loop: false, // Optional
      autoplay: false, // Optional (to start playing automatically)
    });

    this.animation.addEventListener('DOMLoaded', () => {
      // You can add custom logic once the animation is loaded.
    });
  }

  // Method to start the animation
  playAnimation(): void {
    if (this.animation) {
      this.animation.play(); // Play the animation when called
    }
  }
}
