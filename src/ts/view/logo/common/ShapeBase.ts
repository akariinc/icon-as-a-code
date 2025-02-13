
export class ShapeBase {
  public element: SVGElement;

  constructor() {
    
  }

  /*
   * 属性を一括指定
   */
  protected setAttributes(target: SVGElement, props: object): void {
    for (var prop in props) {
      //console.log(prop + " " + props[prop]);
      target.setAttribute(prop, props[prop].toString());
    }
  }
}
