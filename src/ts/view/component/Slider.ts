import { getMousePosition } from '../../util/event';

export class Slider {
  private min: number;

  private max: number;

  private name: string;

  private bg: HTMLElement;

  private dragger: HTMLElement;

  private text: HTMLElement;

  public onChange?: (name: string, value: number) => void;

  constructor(element: HTMLElement) {
    this.min = parseFloat(element.dataset.min);
    this.max = parseFloat(element.dataset.max);
    this.name = element.dataset.name;
    this.bg = element.querySelector('.js-SliderBg') as HTMLElement;
    this.dragger = element.querySelector('.js-SliderDragger') as HTMLElement;
    this.text = element.querySelector('.js-SliderText') as HTMLElement;

    this.updateText(this.min);

    console.log(this.dragger, this.min, this.max);

    if (this.dragger) {
      this.setEvent();
    }
  }

  private setEvent() {
    let upFunc = null;
    let moveFunc = null;

    let mouseOffsetX: number;

    const bgRect: DOMRect = this.bg.getBoundingClientRect();

    this.dragger.addEventListener('mousedown', (e: MouseEvent) => {
      const draggerRect: DOMRect = this.dragger.getBoundingClientRect();
      const bgX: number = bgRect.x;
      const minX: number = bgRect.x;
      const maxX: number = bgRect.x + bgRect.width - draggerRect.width;

      console.log(draggerRect.width);

      const [x, y] = getMousePosition(e);
      mouseOffsetX = x - draggerRect.x;

      window.addEventListener(
        'mousemove',
        (moveFunc = (e2: MouseEvent) => {
          const [x, y] = getMousePosition(e2);

          let per = (x - mouseOffsetX - minX) / (maxX - minX);

          if (per < 0) {
            per = 0;
          } else if (per > 1) {
            per = 1;
          }
          console.log(per);

          // this.dragger.style.left = 'calc(' + (per * 100) + '% - ' + draggerRect.width + 'px)';
          this.dragger.style.transform = 'translateX(' + (per * (maxX - minX)) + 'px)';

          const value = (this.max - this.min) * per + this.min;

          this.updateText(value);

          if (this.onChange) {
            this.onChange(this.name, value);
          }

          e2.preventDefault();
          return false;
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


  private updateText(per: number): void {
    const value: string = per.toString().slice(0, 5);
    this.text.textContent = value;
  }
}
