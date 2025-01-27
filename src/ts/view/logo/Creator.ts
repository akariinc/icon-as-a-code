import { LogoProperty } from "../../info/LogoProperty";
import { Container } from "./Container";
import { Line } from "./Line";

export class Creator {

  public svg: HTMLElement;

  public props: LogoProperty;

  private container: Container;

  constructor() {

    const parent: HTMLElement = document.getElementById('my-svg');
    this.svg = parent;

    this.props = {
      onlyCircle: false,
      drawProgress: 0,
      innerRadius: 0,
      outerRadius: 0,
      shapeType: 'iris',
      partAngle: 1,
      mask: false
    };

    // this.element = document.createElementNS('http://www.w3.org/2000/svg', "rect");

    // this.setAttributes(this.element, {
    //   "width": 100,
    //   "height": 50,
    //   "fill": '#ff0000',
    //   "opacity": 0.7
    // });

    // parent.appendChild(this.element);

    this.container = new Container();
    parent.appendChild(this.container.element);

    this.update();
  }


  public update(): void {
    console.log('update');

    this.removeChildren(this.container.element);

    const rad: number = this.props.partAngle / 180 * Math.PI;
    const div = 6.28 / rad;

    for (var i = 0; i < div; i++) {
      const line: Line = new Line(rad * i);
      this.container.element.appendChild(line.element);
    }
  }

  /*
   * 子要素をすべて削除
   */
  private removeChildren = (element: SVGElement): void => {

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
}

