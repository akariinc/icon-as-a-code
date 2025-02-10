import { LogoProperty } from "../../../info/LogoProperty";
import { ShapeBase } from "../common/ShapeBase";

export class TailCircular extends ShapeBase {
  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.element.setAttribute('class', 'tail-circular');
    // this.element.appendChild(path);
  }

  public draw(props: LogoProperty): void {

    props.drawProgress

    this.element.setAttribute('fill', 'red');
    this.element.setAttribute('d', `
      M10,0
      A10,10 0 1 1 -10,0 Z
    `);
    this.element.setAttribute('transform', 'translate(10, 0) rotate(90)');
  }
}