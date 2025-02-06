import { ShapeBase } from './ShapeBase';

export class Container extends ShapeBase {
  constructor(id: string) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.setAttributes(this.element, {
      id: id,
      transform: 'translate(13, 13)',
    });
  }
}
