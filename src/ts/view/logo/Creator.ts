import { Container } from "./Container";
import { Line } from "./Line";

export class Creator {

  public svg: HTMLElement;

  constructor() {

    const parent: HTMLElement = document.getElementById('my-svg');
    this.svg = parent;

    // this.element = document.createElementNS('http://www.w3.org/2000/svg', "rect");

    // this.setAttributes(this.element, {
    //   "width": 100,
    //   "height": 50,
    //   "fill": '#ff0000',
    //   "opacity": 0.7
    // });

    // parent.appendChild(this.element);

    const container: Container = new Container();
    parent.appendChild(container.element);

    const div = 72;
    const per = 6.28 / div;

    for (var i = 0; i < div; i++) {
      const line: Line = new Line(per * i);
      container.element.appendChild(line.element);
    }
  }


  public export(): void {
    console.log('export');
  }
}

