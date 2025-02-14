// import { LogoProperty } from '../../../info/LogoProperty';
import { ShapeBase } from "../common/ShapeBase";

export class ArcFill extends ShapeBase {
  constructor(
    outer: number,
    inner: number,
    r1: number,
    r2: number,
    col: string,
    opacity: number
  ) {
    super("path");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const r = outer;

    // console.log('ark2 draw', r1, r2);

    const startInX: number = Math.cos(r1) * inner;
    const startInY: number = Math.sin(r1) * inner;
    const endInX: number = Math.cos(r2) * inner;
    const endInY: number = Math.sin(r2) * inner;
    const startOutX: number = Math.cos(r1) * outer;
    const startOutY: number = Math.sin(r1) * outer;
    const endOutX: number = Math.cos(r2) * outer;
    const endOutY: number = Math.sin(r2) * outer;

    this.element.setAttribute("fill", col);
    this.element.setAttribute("opacity", opacity.toString());

    this.element.setAttribute(
      "d",
      `
      M${startInX},${startInY}
      L${startOutX},${startOutY}
      A${outer},${outer} 0 0 1 ${endOutX},${endOutY}
      L${endInX},${endInY}
      A${inner},${inner} 1 0 0 ${startInX},${startInY}
      Z
    `
    );
  }
}
