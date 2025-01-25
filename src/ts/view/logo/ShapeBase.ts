
import { ColorInfo } from "../../info/ColorInfo";

export class ShapeBase {

  public name: string;

  public element: SVGElement;

  protected _x: number;

  protected _y: number;

  protected _width: number;

  protected _height: number;

  protected _size: number;

  protected _color: string;

  protected _lineColor: string;

  protected _alpha: number;

  protected _lineWidth: number;


  constructor() {

    this._x = 0;
    this._y = 0;
    this._width = 100;
    this._height = 100;
    this._size = 100;
    this._alpha = 1;
    //this._color = "#CCCCCC";
    //this._lineColor = "#CCCCCC";
    this._lineWidth = 0.5;
  }


  public set x(value: number) {
    this._x = value;
  }


  public set y(value: number) {
    this._y = value;
  }


  public set width(value: number) {
    this._width = value;
  }


  public set height(value: number) {
    this._height = value;
  }


  public set size(value: number) {
    this._size = value;
  }


  public set color(value: string) {
    this._color = value;
  }


  public set lineColor(value: string) {
    this._lineColor = value;
  }


  public set lineWidth(value: number) {
    this._lineWidth = value;
  }


  public set alpha(value: number) {
    this._alpha = value;

    this.setAttributes(this.element, {
      "opacity": this.alpha
    });
  }


  /*
    * 色情報をセットする
    */
  public setColor(vo: ColorInfo): void {
    this.alpha = vo.alpha;

    if (vo.hasColor) {
      this.color = vo.color;
      this.setAttributes(this.element,
        {
          "fill": vo.color
        });
    }
    else {
      this.setAttributes(this.element,
        {
          "fill": "none"
        });
    }

    if (vo.hasLineColor) {
      this.lineColor = vo.lineColor;
      this.setAttributes(this.element,
        {
          "stroke": vo.lineColor
        });
    }
    else {
      this.setAttributes(this.element,
        {
          "stroke": "none"
        });
    }
  }


  /*
    * オブジェクトの複製
    * (オーバーライドしてサブクラス側で実装)
    */
  public clone(): ShapeBase {
    return this;
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


  //setだけオーバーライドしたらgetの定義が無効になってしまうようなので
  //サブクラス側にもこちらは追記しておく
  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get width(): number { return this._width; }
  public get height(): number { return this._height; }
  public get size(): number { return this._size; }
  public get lineWidth(): number { return this._lineWidth; }
  public get alpha(): number { return this._alpha; }
  //public get color():string { return this._color; }
  //public get lineColor():string { return this._lineColor; }
}

