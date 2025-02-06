import { Slider } from './Slider';

export class ColorPicker {
  public onChange?: (name: string, value: string) => void;

  public name: string;

  public value: string;

  constructor(element: HTMLElement) {
    this.name = element.dataset.name;

    // const sliders: NodeListOf<HTMLElement> = element.querySelectorAll('.js-Slider');

    // const sliderR: Slider = new Slider(sliders[0]);
    // const sliderG: Slider = new Slider(sliders[1]);
    // const sliderB: Slider = new Slider(sliders[2]);

    // const chip: HTMLElement = element.querySelector('.js-chip') as HTMLElement;

    // sliderR.onChange = (name: string, value: number) => {
    //   this.applyColor(chip, sliderR.value, sliderG.value, sliderB.value);
    // };
    // sliderG.onChange = (name: string, value: number) => {
    //   this.applyColor(chip, sliderR.value, sliderG.value, sliderB.value);
    // };
    // sliderB.onChange = (name: string, value: number) => {
    //   this.applyColor(chip, sliderR.value, sliderG.value, sliderB.value);
    // };

    // this.applyColor(chip, sliderR.value, sliderG.value, sliderB.value);

    const input: HTMLInputElement = element.querySelector('input') as HTMLInputElement;
    input.addEventListener('change', () => {
      // console.log('color ', input.value);
      this.value = input.value;
      this.applyColorInput(input.value);
    });
    input.addEventListener('input', () => {
      // console.log('color ', input.value);
      this.value = input.value;
      this.applyColorInput(input.value);
    });

    this.value = input.value;

    this.applyColorInput(input.value);

    console.log('Value ', input.value);
  }

  private applyColorInput(col: string): void {
    if (this.onChange) {
      this.onChange(this.name, col);
    }
  }

  private applyColor(elm: HTMLElement, r: number, g: number, b: number): void {
    const r16 = Math.round(r * 255)
      .toString(16)
      .padStart(2, '0');
    const g16 = Math.round(g * 255)
      .toString(16)
      .padStart(2, '0');
    const b16 = Math.round(b * 255)
      .toString(16)
      .padStart(2, '0');

    elm.style.backgroundColor = '#' + r16 + g16 + b16;

    if (this.onChange) {
      this.onChange(this.name, '#' + r16 + g16 + b16);
    }
  }
}
