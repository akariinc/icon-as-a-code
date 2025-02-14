import { IrisLine } from "./IrisLine";
import { LogoBase } from "../common/LogoBase";
import { LogoProperty } from "../../../info/LogoProperty";
import { getColorPercent } from "../../../util/color";
import { getEasing } from "../../../util/easing";
import { removeChildren } from "../../../util/element";

export class IrisLogo extends LogoBase {
  private lineContainer: SVGGElement;

  // こちらにはマスクかけたくないので尻尾用はコンテナを分ける
  private lineTailContainer: SVGGElement;

  constructor(svgElement: SVGElement, props: LogoProperty) {
    super(svgElement, "iris", props);

    this.lineContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.lineContainer.setAttribute("id", `iris-line-container-${this.logoId}`);
    this.lineContainer.setAttribute(
      "clip-path",
      `url(#clip-iris-${this.logoId})`
    );
    this.rootGraphics.element.appendChild(this.lineContainer);

    this.lineTailContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.lineTailContainer.setAttribute(
      "id",
      `iris-line-tail-container-${this.logoId}`
    );
    this.rootGraphics.element.appendChild(this.lineTailContainer);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const clipPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "clipPath"
    );
    clipPath.setAttribute("id", `clip-iris-${this.logoId}`);
    this.rootGraphics.element.append(defs);
    defs.append(clipPath);

    clipPath.appendChild(this.mask.element);
  }

  public update(props: Partial<LogoProperty>): void {
    super.update(props);

    removeChildren(this.lineContainer);
    removeChildren(this.lineTailContainer);

    // 尻尾の長さ
    const tailBaseHeight: number =
      this.props.outerRadius *
      (this.props.tailEndDistance == 0 ? 1 : 65.75 / 70.43);

    // ラインの幅
    const width: number = this.props.outerRadius - this.props.innerRadius;
    // ラインの高さ（太さ）
    const height: number = this.props.lineThickness;

    // 半径（ドーナツ中央の位置の半径）
    const dis: number = width * 0.5 + this.props.innerRadius;

    // ドーナツ中央の位置を通る円の円周
    // const aroundDis: number = dis * 2 * Math.PI;
    const aroundDis: number = dis * 2 * Math.PI;

    // 尻尾も含めたトータルの距離(progressは無視)
    const allDis: number = this.props.onlyCircle
      ? aroundDis
      : aroundDis + tailBaseHeight;

    const circlePer = aroundDis / allDis;

    const progress: number = this.props.division * this.props.drawProgress;

    const lines: IrisLine[] = [];

    const maskH: number =
      (tailBaseHeight * (this.props.drawProgress - circlePer)) /
      (1 - circlePer);
    let realMaskH: number = 0;

    for (let i = 0; i <= progress; i++) {
      const per = i / this.props.division; // * (aroundDis / allDis);
      const opacityPer: number = getEasing(this.props.opacityCurve, per);
      const rgbPer: number = getEasing(this.props.rgbCurve, per);
      const color: string = getColorPercent(
        this.props.rgbStart,
        this.props.rgbEnd,
        rgbPer
      );
      const opacity: number =
        (this.props.opacityEnd - this.props.opacityStart) * opacityPer +
        this.props.opacityStart;
      const line: IrisLine = new IrisLine(
        color,
        opacity,
        width,
        height,
        dis,
        aroundDis,
        allDis,
        tailBaseHeight,
        per
      );
      lines.push(line);

      const myDis: number = allDis * per;

      const myCirclePer = myDis / (aroundDis * 1);

      if (myCirclePer < 1) {
        if (myCirclePer < 0.75) {
          this.lineContainer.appendChild(line.element);
        } else {
          // 円の3/4まで行ったら、マスクされることはないと見なす
          this.lineTailContainer.appendChild(line.element);
        }
      } else {
        if (line.edgeY <= maskH) {
          this.lineTailContainer.appendChild(line.element);
          realMaskH = line.edgeY;
        }
      }
    }

    this.mask.draw(this.props, realMaskH);
  }
}
