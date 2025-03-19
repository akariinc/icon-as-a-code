import { removeChild, removeChildren } from "../../../util/element";

import { ArcFill } from "./ArcFill";
import { LogoBase } from "../common/LogoBase";
import { LogoProperty } from "../../../info/LogoProperty";
import { TailCircular } from "./TailCircular";
import { TailFill } from "./TailFill";
import { getColorPercent } from "../../../util/color";
import { getEasing } from "../../../util/easing";

export class PaintLogo extends LogoBase {
  private arcContainer: SVGGElement;

  private tail: TailFill;

  private tailCircular: TailCircular;

  constructor(svgElement: SVGElement, props: LogoProperty) {
    super(svgElement, "paint", props);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const clipPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "clipPath"
    );
    clipPath.setAttribute("id", `clip-${this.logoId}`);
    this.rootGraphics.element.append(defs);
    defs.append(clipPath);

    // this.circleMask = new CircleMask();
    // clipPath.appendChild(this.circleMask.element);

    clipPath.appendChild(this.mask.element);

    this.arcContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.arcContainer.setAttribute("clip-path", `url(#clip-${this.logoId})`);
    this.rootGraphics.element.append(this.arcContainer);

    this.tail = new TailFill();
    this.rootGraphics.element.appendChild(this.tail.element);

    this.tailCircular = new TailCircular();
    this.rootGraphics.element.appendChild(this.tailCircular.element);
  }

  public update(props: LogoProperty): void {
    // console.log('update paint', props.drawProgress);
    super.update(props);

    // 一旦すべてリムーブ
    removeChildren(this.arcContainer);

    // 尻尾の長さ
    const tailBaseHeight: number =
      this.props.outerRadius *
      (this.props.tailEndDistance == 0 ? 1 : 65.75 / 70.43);

    const aroundDis: number =
      (this.props.innerRadius + this.props.outerRadius * 0.5) * 2 * Math.PI;
    const allDis: number = aroundDis + tailBaseHeight;

    const circlePer = aroundDis / allDis;

    const div = this.props.paintDivision;
    const rad = 6.28 / div;

    let progress = 0;

    const start: number = Math.round(div * this.props.drawStart);

    if (this.props.onlyCircle) {
      // サークルのみ
      progress = div * this.props.drawProgress;
    } else {
      // サークル＋尻尾
      progress = Math.min(div, (div * this.props.drawProgress) / circlePer);
    }

    // console.log(
    //   "circlePer",
    //   circlePer,
    //   "drawProgress",
    //   this.props.drawProgress,
    //   "progress",
    //   progress
    // );

    for (let i = start; i < progress; i++) {
      const per: number = (i / div) * circlePer;
      // const opacityPer: number = getEasing(this.props.opacityCurve, per);
      const rgbPer: number = getEasing(this.props.rgbCurve, per);
      const col: string = getColorPercent(
        this.props.rgbStart,
        this.props.rgbEnd,
        rgbPer
      );
      const opacity: number =
        (this.props.opacityEnd - this.props.opacityStart) *
          getEasing(this.props.opacityCurve, per) +
        this.props.opacityStart;

      // Calculate the fill rate of the current arc
      const fillRate = i === Math.ceil(progress) - 1 ? progress - i : 1;
      const arc: ArcFill = new ArcFill(
        this.props.outerRadius,
        this.props.innerRadius,
        rad * i,
        rad * i + rad * fillRate + this.props.paintOverlap,
        col,
        opacity
      );

      this.arcContainer.insertBefore(arc.element, this.arcContainer.firstChild);
    }

    this.mask.draw(
      this.props,
      (this.props.outerRadius * (this.props.drawProgress - circlePer)) /
        (1 - circlePer)
    );

    // Draw the tail
    if (!this.props.onlyCircle) {
      // 尻尾ありかつ、drawProgressが尻尾までいっているかどうか
      if (this.props.drawProgress > circlePer) {
        this.tail.draw(
          this.props.outerRadius,
          this.props.innerRadius,
          getColorPercent(
            this.props.rgbStart,
            this.props.rgbEnd,
            getEasing(this.props.rgbCurve, circlePer)
          ),
          this.props.rgbEnd,
          (this.props.opacityEnd - this.props.opacityStart) * circlePer +
            this.props.opacityStart,
          this.props.opacityEnd,
          (this.props.drawProgress - circlePer) / (1 - circlePer),
          tailBaseHeight
        );

        this.rootGraphics.element.appendChild(this.tail.element);
      } else {
        removeChild(this.rootGraphics.element, this.tail.element);
      }

      removeChild(this.rootGraphics.element, this.tailCircular.element);
      // if (this.props.lineCap === "circular") {
      //   // 未実装
      //   // this.tailCircular.draw(this.props);
      //   // this.container.element.appendChild(this.tailCircular.element);
      // } else {
      //   removeChild(this.rootGraphics.element, this.tailCircular.element);
      //   // this.container.element.removeChild(this.tailCircular.element);
      // }
    } else {
      removeChild(this.rootGraphics.element, this.tail.element);
      removeChild(this.rootGraphics.element, this.tailCircular.element);
    }
  }
}
