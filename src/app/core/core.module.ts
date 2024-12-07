import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BallonPopupComponent } from './features/birthday-popup/birthday-popup/ballon-popup/ballon-popup.component';
import { BirthdayPopupComponent } from './features/birthday-popup/birthday-popup/birthday-popup.component';
import { FireWorksComponent } from './features/birthday-popup/birthday-popup/fire-works/fire-works.component';
import { GiftBoxAnimateComponent } from './features/birthday-popup/birthday-popup/gift-box-animate/gift-box-animate.component';
import { GiftBoxComponent } from './features/birthday-popup/birthday-popup/gift-box/gift-box.component';
import { HeroSectionComponent } from './pages/hero-section/hero-section.component';

@NgModule({
  declarations: [
    GiftBoxComponent,
    FireWorksComponent,
    GiftBoxAnimateComponent,
    BirthdayPopupComponent,
    HeroSectionComponent,
    BallonPopupComponent,
  ],
  imports: [CommonModule],
  exports: [BirthdayPopupComponent, HeroSectionComponent],
})
export class CoreModule {}
