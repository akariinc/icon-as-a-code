import { ShapeBase } from './common/ShapeBase';

export class Line extends ShapeBase {
  constructor(outer: number, inner: number, rotation: number) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.setAttributes(this.element, {
      width: outer - inner,
      height: 0.3,
      fill: '#333',
      opacity: 0.7,
      transform: 'rotate(' + (rotation * 180) / Math.PI + ') translate(' + inner + ', 0)',
    });
  }
}
