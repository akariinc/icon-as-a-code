import { LogoProperty } from '../info/LogoProperty';
import { easeInOutQuad } from '../util/easing';
import { ColorPicker } from '../view/component/ColorPicker';
import { Slider } from '../view/component/Slider';
import { CreatorBase } from '../view/logo/common/CreatorBase';
import { CreatorIris } from '../view/logo/iris/CreatorIris';
import { CreatorPaint } from '../view/logo/paint/CreatorPaint';

export class Controller {
  private selectCreator: CreatorBase;

  private creatorIris: CreatorIris;

  private creatorPaint: CreatorPaint;

  private sideUI: HTMLElement;

  private props: LogoProperty;

  constructor() {
    this.sideUI = document.querySelector('.js-side') as HTMLElement;

    // for (var i = 0; i < 100; i++) {
    //   const t = (i + 1) / 100;
    //   const easing = easeInOutQuad(t);
    //   console.log(i, t, easing);
    // }

    this.props = {
      onlyCircle: false,
      drawProgress: 0,
      innerRadius: 0,
      outerRadius: 0,
      lineTickness: 0.1,
      division: 1,
      mask: false,
      lineCap: 'rectangular',

      opacityStart: 0,
      opacityEnd: 0,
      opacityCurve: 'linear',

      rgbStart: '',
      rgbEnd: '',
      rgbCurve: 'linear',

      animCurve: 'linear',
      animDuration: 1
    };

    this.creatorIris = new CreatorIris();
    this.creatorPaint = new CreatorPaint();
    this.selectCreator = this.creatorIris;
    this.setUIEvent();

    this.selectCreator.update(this.props);
    this.creatorPaint.update(this.props);

    this.changeType(((document.getElementById('shapeType0') as HTMLInputElement).checked) ? '0' : '1');
    // console.log(svg);

    const buttonAnimPlay: HTMLElement = document.getElementById('button-play') as HTMLElement;
    buttonAnimPlay.addEventListener('click', () => {
      console.log('click');
      this.selectCreator.anim(Object.assign({}, this.props));
    });
  }

  private setUIEvent() {
    // Slider UI
    const sliders: NodeListOf<HTMLElement> = document.querySelectorAll('.js-Slider');

    for (var i = 0; i < sliders.length; i++) {
      if (sliders[i].dataset.noevent != 'true') {
        const slider: Slider = new Slider(sliders[i]);
        slider.onChange = (name: string, value: number) => {
          console.log(name, value);
          this.props[name] = value;
          this.selectCreator.update(this.props);
        };
        this.props[slider.name] = slider.value;
      }
    }

    // CheckBox

    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js-Checkbox');

    for (var i = 0; i < checkboxes.length; i++) {
      const check: HTMLInputElement = checkboxes[i];
      check.addEventListener('change', () => {
        console.log(check.dataset.name, check.checked);
        const name = check.dataset.name;
        this.props[name] = check.checked;
        this.selectCreator.update(this.props);
      });
    }

    // ColorPicker

    const pickers: NodeListOf<HTMLElement> = document.querySelectorAll('.js-ColorPicker');

    for (var i = 0; i < pickers.length; i++) {
      const picker: ColorPicker = new ColorPicker(pickers[i]);
      picker.onChange = (name: string, value: string) => {
        console.log(name, value);
        this.props[name] = value;
        this.selectCreator.update(this.props);
      };
      this.props[picker.name] = picker.value;
    }

    // ComboBox

    const comboboxes: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.js-ComboBox');

    for (var i = 0; i < comboboxes.length; i++) {
      const select: HTMLSelectElement = comboboxes[i];
      select.addEventListener('change', (e: Event) => {
        const name = select.dataset.name;
        console.log(name, (e.target as HTMLSelectElement).value);
        this.props[name] = (e.target as HTMLSelectElement).value;
        this.selectCreator.update(this.props);
      });
    }

    const typeRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('.js-radio-type input');

    for (var i = 0; i < typeRadios.length; i++) {
      const radio: HTMLInputElement = typeRadios[i];
      radio.addEventListener('change', (e: Event) => {

        console.log(radio.name, radio.value);

        if (radio.name === 'shapeType') {
          this.changeType(radio.value);
        } else {
          this.props[radio.name] = (e.target as HTMLInputElement).value;
          console.log(radio.name + ' = ' + this.props[radio.name]);
        }
        // console.log(radio.value === '0');
        // if (radio.value === '0') {
        //   this.sideUI.classList.add('--iris');
        //   this.sideUI.classList.remove('--paint');
        //   this.selectCreator = this.creatorIris;
        // } else {
        //   this.sideUI.classList.remove('--iris');
        //   this.sideUI.classList.add('--paint');
        //   this.selectCreator = this.creatorPaint;
        // }

        this.selectCreator.update(this.props);
      });
    }

    const zoom: Slider = new Slider(document.getElementById('zoom'));
    zoom.onChange = (name: string, value: number) => {
      console.log(value);
      this.selectCreator.svg.style.transform = 'scale(' + value + ')';
    };
    this.selectCreator.svg.style.transform = 'scale(' + zoom.value + ')';
  }


  private changeType(type: string): void {
    if (type === '0') {
      this.sideUI.classList.add('--iris');
      this.sideUI.classList.remove('--paint');
      this.creatorIris.show();
      this.creatorPaint.hide();
      this.selectCreator = this.creatorIris;
    } else if (type === '1') {
      this.sideUI.classList.remove('--iris');
      this.sideUI.classList.add('--paint');
      this.creatorIris.hide();
      this.creatorPaint.show();
      this.selectCreator = this.creatorPaint;
    }
  }
}
