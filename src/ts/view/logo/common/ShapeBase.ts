export class ShapeBase {
  public element: SVGElement;

  constructor(baseElement: "rect" | "path" | "g") {
    this.element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      baseElement
    );
  }

  /*
   * 属性を一括指定
   */
  protected setAttributes(
    target: SVGElement,
    props: { [key: string]: string | number }
  ): void {
    for (const prop in props) {
      //console.log(prop + " " + props[prop]);
      target.setAttribute(prop, props[prop].toString());
    }
  }
}
