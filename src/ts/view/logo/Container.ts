import { ShapeBase } from "./ShapeBase";

export class Container extends ShapeBase {

  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', "g");
    this.setAttributes(this.element, {
      'transform': 'translate(13, 13)'
    });
  }
}

