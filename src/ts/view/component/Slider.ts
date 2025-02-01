import { getMousePosition } from '../../util/event';

export class Slider {
  // private min: number;

  // private max: number;

  private name: string;

  // private bg: HTMLElement;

  // private dragger: HTMLElement;

  private text: HTMLElement;

  public onChange?: (name: string, value: number) => void;

  public value: number;

  constructor(element: HTMLElement) {
    // this.min = parseFloat(element.dataset.min);
    // this.max = parseFloat(element.dataset.max);
    this.name = element.dataset.name;
    // this.bg = element.querySelector('.js-SliderBg') as HTMLElement;
    // this.dragger = element.querySelector('.js-SliderDragger') as HTMLElement;
    this.text = element.querySelector('.js-SliderText') as HTMLElement;

    const input: HTMLInputElement = element.querySelector('input') as HTMLInputElement;

    this.value = parseFloat(input.value);

    this.updateText(input.value);

    // console.log(this.dragger, this.min, this.max);

    // if (this.dragger) {
    //   this.setEvent();
    // }

    input.addEventListener('change', () => {
      console.log(input.value);
      this.updateText(input.value);

      if (this.onChange) {
        this.onChange(this.name, parseFloat(input.value));
      }
    });
    input.addEventListener('input', () => {
      console.log(input.value);
      this.updateText(input.value);

      if (this.onChange) {
        this.onChange(this.name, parseFloat(input.value));
      }
    });
  }

  private updateText(inputValue: string): void {
    this.text.textContent = inputValue;
  }
}
