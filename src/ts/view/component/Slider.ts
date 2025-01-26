import { getMousePosition } from '../../util/event';

export class Slider {
  private min: number;

  private max: number;

  private bg: HTMLElement;

  private dragger: HTMLElement;

  constructor(element: HTMLElement) {
    this.min = parseFloat(element.dataset.min);
    this.max = parseFloat(element.dataset.max);
    this.bg = element.querySelector('.js-SliderBg') as HTMLElement;
    this.dragger = element.querySelector('.js-SliderDragger') as HTMLElement;

    console.log(this.dragger, this.min, this.max);

    if (this.dragger) {
      this.setEvent();
    }
  }

  private setEvent() {
    let upFunc = null;
    let moveFunc = null;

    let offsetX: number;

    this.dragger.addEventListener('mousedown', (e: MouseEvent) => {
      const width: number = this.bg.getBoundingClientRect().width;

      const [x, y] = getMousePosition(e);
      offsetX = x;

      window.addEventListener(
        'mousemove',
        (moveFunc = (e2: MouseEvent) => {
          const [x, y] = getMousePosition(e2);
          console.log(offsetX, x);
        })
      );

      window.addEventListener(
        'mouseup',
        (upFunc = (e2: MouseEvent) => {
          window.removeEventListener('mouseup', upFunc);
          window.removeEventListener('mousemove', moveFunc);
        })
      );
    });
  }
}
