import { ShapeBase } from '../common/ShapeBase';

export class ArkFill extends ShapeBase {
  constructor(outer: number, inner: number, rotation: number, col: string, opacity: number) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.setAttributes(this.element, {
      width: outer - inner + 10,
      height: 0.9,
      fill: col,
      opacity: opacity,
      transform: 'rotate(' + (rotation * 180) / Math.PI + ') translate(' + inner + ', 0)',
    });
  }
}
