import { LogoProperty } from "../../../info/LogoProperty";
import { ShapeBase } from "../common/ShapeBase";

export class IrisLine extends ShapeBase {
  constructor(width: number, height: number, dis: number, per: number) {
    super();

    const r: number = 6.28 * per;
    const x: number = Math.cos(r) * dis;
    const y: number = Math.sin(r) * dis;
    const deg: number = r * 180 / Math.PI;

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.setAttributes(this.element, {
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      fill: '#f00',
      opacity: 0.7,
      transform: 'translate(' + x + ', ' + y + ') rotate(' + deg + ')',
    });
  }
}