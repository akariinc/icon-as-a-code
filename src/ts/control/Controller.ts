import { ColorPicker } from '../view/component/ColorPicker';
import { Slider } from '../view/component/Slider';
import { CreatorBase } from '../view/logo/common/CreatorBase';
import { Creator } from '../view/logo/Creator';
import { CreatorIris } from '../view/logo/iris/CreatorIris';
import { CreatorPaint } from '../view/logo/paint/CreatorPaint';

export class Controller {
  private selectCreator: CreatorBase;

  private creatorIris: CreatorIris;

  private creatorPaint: CreatorPaint;

  private sideUI: HTMLElement;

  constructor() {
    this.sideUI = document.querySelector('.js-side') as HTMLElement;

    this.creatorIris = new CreatorIris();
    this.creatorPaint = new CreatorPaint();
    this.selectCreator = this.creatorIris;
    this.setUIEvent();

    // console.log(svg);
  }

  private setUIEvent() {
    // Slider UI
    const sliders: NodeListOf<HTMLElement> = document.querySelectorAll('.js-Slider');

    for (var i = 0; i < sliders.length; i++) {
      if (sliders[i].dataset.noevent != 'true') {
        const slider: Slider = new Slider(sliders[i]);
        slider.onChange = (name: string, value: number) => {
          console.log(name, value);
          this.selectCreator.props[name] = value;
          this.selectCreator.update();
        };
      }
    }

    // CheckBox

    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js-Checkbox');

    for (var i = 0; i < checkboxes.length; i++) {
      const check: HTMLInputElement = checkboxes[i];
      check.addEventListener('change', () => {
        console.log(check.dataset.name, check.checked);
        const name = check.dataset.name;
        this.selectCreator.props[name] = check.checked;
        this.selectCreator.update();
      });
    }

    // ColorPicker

    const pickers: NodeListOf<HTMLElement> = document.querySelectorAll('.js-ColorPicker');

    for (var i = 0; i < pickers.length; i++) {
      const picker: ColorPicker = new ColorPicker(pickers[i]);
      picker.onChange = (name: string, value: string) => {
        console.log(name, value);
        this.selectCreator.props[name] = value;
        this.selectCreator.update();
      };
    }

    const typeRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js-radio-type input');

    for (var i = 0; i < typeRadios.length; i++) {
      const radio: HTMLInputElement = typeRadios[i];
      radio.addEventListener('change', () => {
        // console.log(radio.value === '0');
        if (radio.value === '0') {
          this.sideUI.classList.add('--iris');
          this.sideUI.classList.remove('--paint');
          this.selectCreator = this.creatorIris;
        } else {
          this.sideUI.classList.remove('--iris');
          this.sideUI.classList.add('--paint');
          this.selectCreator = this.creatorPaint;
        }

        this.selectCreator.update();
      });
    }

    const zoom: Slider = new Slider(document.getElementById('zoom'));
    zoom.onChange = (name: string, value: number) => {
      console.log(value);
      this.selectCreator.svg.style.transform = 'scale(' + value + ')';
    };
  }
}
