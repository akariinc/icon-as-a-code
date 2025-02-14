import { ShapeBase } from "./ShapeBase";

export class LogoRootGraphics extends ShapeBase {
  constructor(id: string) {
    super("g");

    this.setAttributes(this.element, {
      // id: id,
      class: id,
      transform: "translate(13, 13)",
    });
  }
}
