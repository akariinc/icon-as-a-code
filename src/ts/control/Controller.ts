import { ColorPicker } from "../view/component/ColorPicker";
import { Slider } from "../view/component/Slider";
import { Creator } from "../view/logo/Creator";

export class Controller {

  private creator: Creator;

  constructor() {
    this.creator = new Creator();
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
          this.creator.props[name] = value;
          this.creator.update();
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
        this.creator.props[name] = check.checked;
        this.creator.update();
      });
    }

    // ColorPicker

    const pickers: NodeListOf<HTMLElement> = document.querySelectorAll('.js-ColorPicker');

    for (var i = 0; i < pickers.length; i++) {
      const picker: ColorPicker = new ColorPicker(pickers[i]);
      picker.onChange = (name: string, value: string) => {
        console.log(name, value);
        this.creator.props[name] = value;
        this.creator.update();
      };
    }


    const zoom: Slider = new Slider(document.getElementById('zoom'));
    zoom.onChange = (name: string, value: number) => {
      console.log(value);
      this.creator.svg.style.transform = 'scale(' + value + ')';
    };
  }
}
