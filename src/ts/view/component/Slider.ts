export class Slider {

  private min: number;

  private max: number;

  private dragger: HTMLElement;

  constructor(element: HTMLElement) {

    this.min = parseFloat(element.dataset.min);
    this.max = parseFloat(element.dataset.max);
    this.dragger = element.querySelector('.js-SliderDragger') as HTMLElement;

    console.log(this.dragger, this.min, this.max);

    if (this.dragger) {
      this.setEvent();
    }
  }


  private setEvent() {
    this.dragger.addEventListener('mousedown', () => {

    });
  }
}

