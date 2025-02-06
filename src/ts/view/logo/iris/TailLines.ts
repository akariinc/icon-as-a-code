import { removeChildren } from "../../../util/element";
import { ShapeBase } from "../common/ShapeBase";

export class TailLines extends ShapeBase {

  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  }


  public draw(outer: number, inner: number, rgbStart: string, rgbEnd: string, opacityStart: number, opacityEnd: number): void {

    console.log(rgbStart, rgbEnd);

    removeChildren(this.element);

    for (var i = 0; i < 10; i++) {

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.setAttributes(line, {
        width: outer - inner,
        height: 0.3,
        fill: '#f00',
        opacity: 1,
        transform: 'translate(0, ' + (i * 1) + ')'
      });

      this.element.appendChild(line);
    }

    // const outer: number = props.outerRadius;
    // const inner: number = props.innerRadius;

    this.setAttributes(this.element, {
      width: outer - inner,
      height: outer,
      transform: 'translate(' + inner + ', 0)',
    });
  }
}
