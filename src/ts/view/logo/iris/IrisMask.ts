import { ShapeBase } from "../common/ShapeBase";

export class IrisMask extends ShapeBase {
  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const r = 10;
    const h = 5;
    const inner = 3;

    const rad = Math.atan2(h, r);

    Math.sin(rad)

    const x = Math.cos(rad) * r;
    const y = Math.sin(rad) * r;

    console.log('rad = ' + rad, ', x = ' + x + ', y = ' + y);

    this.element.setAttribute('id', 'iris-mask');
    this.element.setAttribute('fill', 'red');
    this.element.setAttribute('opacity', '0.7');
    this.element.setAttribute('d', `
      M10,0 
      A10,10 0 1 1 -10,0 
      A10,10 0 1 1 10,0
      L${inner},0 L${inner},${h} L${x},${y} 
      Z
    `);
    // this.element.setAttribute('d', `
    //   M12,13v-3h8C20,4.48,15.52,0,10,0S0,4.48,0,10s4.48,10,10,10c4.48,0,8.27-2.94,9.54-7h-7.54Z
    // `);
    // this.element.setAttribute('transform', 'translate(-10, -10)');
  }


  private draw(): void {

  }
}

