import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'birthday-popup';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isBirthDay: boolean = false;

  /**
   * Initializes the component by checking if the platform is a browser.
   * If so, it ensures that AOS (Animate On Scroll) library is loaded.
   * This is done immediately if the document is not in a loading state,
   * otherwise, it's deferred until the DOM content is fully loaded.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.document.readyState !== 'loading') {
        this.loadAOS();
      } else {
        this.document.addEventListener('DOMContentLoaded', () =>
          this.loadAOS()
        );
      }
    }
    let d = new Date();
    if (d.toLocaleDateString() == '12/7/2024') {
      this.isBirthDay = true;
    }
  }

  /**
   * Initializes the AOS library and refreshes it.
   * This is only done for browser platforms.
   */
  private async loadAOS() {
    Aos.init();
    Aos.refresh();
  }
}
