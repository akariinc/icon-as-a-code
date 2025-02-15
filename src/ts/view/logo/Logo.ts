import { IrisLogo } from "./iris/IrisLogo";
import { LogoProperty } from "../../info/LogoProperty";
import { PaintLogo } from "./paint/PaintLogo";
// import { LogoBase } from "./common/LogoBase";

export class AkariLogo {
  el: SVGElement;

  svgLogo: IrisLogo | PaintLogo;

  private _type: "iris" | "paint";

  get type(): "iris" | "paint" {
    return this._type;
  }
  set type(value: "iris" | "paint") {
    this._type = value;
    if (this.svgLogo) {
      this.svgLogo.remove();
    }
    this.svgLogo =
      this.type === "iris"
        ? new IrisLogo(this.el, this.props)
        : new PaintLogo(this.el, this.props);
    this.svgLogo.append();
    this.update(this.props);
  }

  get size(): number {
    return this.svgLogo.size;
  }
  set size(value: number) {
    this.svgLogo.size = value;
  }

  props: LogoProperty;

  constructor(type: "iris" | "paint", props: Partial<LogoProperty>) {
    this.props = {
      onlyCircle: false,
      drawProgress: 0,
      innerRadius: 0,
      outerRadius: 0,
      lineThickness: 0.1,
      division: 1,
      mask: false,
      tailEndDistance: 0,
      // TODO: leave it for now
      // lineCap: "rectangular",

      opacityStart: 0,
      opacityEnd: 0,
      opacityCurve: "linear",

      rgbStart: "",
      rgbEnd: "",
      rgbCurve: "linear",

      paintDivision: 4,
      paintOverlap: 0.02,

      animCurve: "linear",
      animDuration: 1,
      ...props,
    };

    this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.el.setAttribute("width", "100");
    this.el.setAttribute("height", "100");
    this.el.setAttribute("viewBox", "0 0 26 26");

    this._type = type;
    this.svgLogo =
      this.type === "iris"
        ? new IrisLogo(this.el, this.props)
        : new PaintLogo(this.el, this.props);
    this.svgLogo.append();
    this.update(this.props);
  }

  update(props: Partial<LogoProperty>): void {
    this.props = { ...this.props, ...props } as LogoProperty;
    this.svgLogo.update(this.props);
  }

  anim(props: Partial<LogoProperty>, duration: number): void {
    this.props = { ...this.props, ...props } as LogoProperty;
    this.props.animDuration = duration;
    this.svgLogo.anim(this.props);
  }
}
