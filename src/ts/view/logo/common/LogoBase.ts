import { LogoProperty } from "../../../info/LogoProperty";
import { LogoRootGraphics } from "./LogoRootGraphics";
import { TailMask } from "./TailMask";
import { getEasing } from "../../../util/easing";
import { removeChild } from "../../../util/element";

export type LogoAnimFunc = (deltaTime: number) => void;

export class LogoBase {
  // public props: LogoProperty;

  public svg: SVGElement;

  protected rootGraphics: LogoRootGraphics;

  protected mask: TailMask;

  public props: LogoProperty;

  private static _id: number = 0;

  protected logoId: number = LogoBase._id++;

  private _size: number = 0;
  public set size(value: number) {
    this._size = Math.round(value);
    this.svg.setAttribute("width", `${this._size}`);
    this.svg.setAttribute("height", `${this._size}`);
  }
  public get size(): number {
    return this._size;
  }

  constructor(svg: SVGElement, id: "iris" | "paint", props: LogoProperty) {
    this.rootGraphics = new LogoRootGraphics(id);
    this.svg = svg;

    this.mask = new TailMask(id);

    this.currentKey = 0;
    this.enterFrameFunc = null;
    this.intervalTimer = 0;
    this.isEnterFrame = false;

    this.props = props;
  }

  public update(props: Partial<LogoProperty>): void {
    this.props = { ...this.props, ...props } as LogoProperty;
  }

  public show(): void {
    this.svg.appendChild(this.rootGraphics.element);
  }

  public hide(): void {
    removeChild(this.svg, this.rootGraphics.element);
  }

  public anim(props: Partial<LogoProperty>): void {
    this.props = { ...this.props, ...props } as LogoProperty;
    const endDuration: number = this.props.animDuration * 1000;
    let currDuration: number = 0;
    const progress: number = 0;

    this.props.drawProgress = progress;

    let cc = 0;

    this.update(props);

    this.onEnterFrame = (deltaTime: number) => {
      currDuration += deltaTime;

      if (currDuration >= endDuration) {
        currDuration = endDuration;
      }
      cc++;

      const per = getEasing(this.props.animCurve, currDuration / endDuration);

      this.props.drawProgress = per;

      this.update(this.props);

      // console.log(currDuration);

      if (currDuration >= endDuration) {
        this.deleteEnterFrame;
        console.log("fps = " + cc);
      }
    };
  }

  protected getSVG(): string {
    const svgElm: SVGElement = this.svg.cloneNode(true) as SVGElement;

    svgElm.removeAttribute("transform");
    svgElm.removeAttribute("style");
    svgElm.removeAttribute("class");
    svgElm.removeAttribute("id");

    return svgElm.outerHTML;
  }

  getSVGURL(): string {
    const svg = this.getSVG();
    const url = "data:text/plain;charset=utf-8," + encodeURIComponent(svg);
    return url;
  }

  private enterFrameFunc: LogoAnimFunc | null;

  private isEnterFrame: boolean;

  private currentKey: number;

  private intervalTimer: number;

  /*
   * EnterFrame実行
   */
  public set onEnterFrame(func: LogoAnimFunc) {
    if (this.enterFrameFunc) {
      this.deleteEnterFrame;
    }

    this.enterFrameFunc = func;
    const scope: LogoBase = this as LogoBase;
    this.currentKey++;

    const key: number = this.currentKey;

    if (!this.isEnterFrame) {
      this.isEnterFrame = true;
      let current: number = new Date().getTime();

      (function loop() {
        if (!scope.enterFrameFunc) {
          scope.isEnterFrame = false;
          return;
        }
        if (key != scope.currentKey) {
          return;
        }

        const tmp: number = new Date().getTime();
        let deltaTime = tmp - current;
        if (deltaTime < 0) {
          deltaTime = 1;
        }
        scope.enterFrameFunc(deltaTime);
        current = tmp;
        scope.intervalTimer = requestAnimationFrame(() => loop());
      })();
    }
  }

  /*
   * EnterFrame停止
   */
  public get deleteEnterFrame(): boolean {
    this.isEnterFrame = false;
    this.enterFrameFunc = null;
    cancelAnimationFrame(this.intervalTimer);
    this.intervalTimer = -1;
    return true;
  }
}
