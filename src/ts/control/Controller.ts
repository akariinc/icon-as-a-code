import { Slider } from "../view/component/Slider";
import { Creator } from "../view/logo/Creator";

export class Controller {

  private creator: Creator;

  constructor() {
    this.creator = new Creator();
    this.createUI();

    const buttonExecute: HTMLElement = document.getElementById('button-execute');

    const svg = this.creator.svg.outerHTML;

    var url = "data:text/plain;charset=utf-8," + encodeURIComponent(svg);
    buttonExecute.setAttribute("download", 'logo.svg');
    buttonExecute.setAttribute("href", url);

    buttonExecute.addEventListener('click', () => {
      // this.creator.export();
    });

    console.log(svg);
  }


  private createUI() {
    const sliders: NodeListOf<HTMLElement> = document.querySelectorAll('.js-Slider');

    for (var i = 0; i < sliders.length; i++) {
      new Slider(sliders[i]);
    }
  }
}
