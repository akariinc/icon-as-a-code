import { ShapeBase } from "./ShapeBase";

export class Tail extends ShapeBase {

  constructor(outer: number, inner: number) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', "rect");
    this.setAttributes(this.element, {
      "width": outer - inner,
      "height": outer,
      "fill": '#333',
      "opacity": 0.7,
      "transform": 'translate(' + inner + ', 0)'
    });
  }
}

