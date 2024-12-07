import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-birthday-popup',
  templateUrl: './birthday-popup.component.html',
  styleUrls: ['./birthday-popup.component.scss'],
})
export class BirthdayPopupComponent {
  isGiftReceived: boolean = false;

  constructor(private _Renderer2: Renderer2) {}

  @ViewChildren('giftBox') elements!: QueryList<ElementRef>;
  @ViewChild('gift') gift!: ElementRef;
  onClickHideAll() {
    this.elements.forEach((element: ElementRef) => {
      element.nativeElement.classList = 'Box-Hide-Animation';
    });
    this._Renderer2.addClass(this.gift.nativeElement, 'Box-show-Animation');
    setTimeout(() => {
      this.isGiftReceived = true;
      this._Renderer2.removeClass(this.gift.nativeElement, 'd-none');
    }, 1000);
    console.log(this.gift.nativeElement);
  }
}
