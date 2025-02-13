import { LogoProperty } from '../../../info/LogoProperty';
import { getColorPercent } from '../../../util/color';
import { getEasing } from '../../../util/easing';
import { removeChildren } from '../../../util/element';
import { CreatorBase } from '../common/CreatorBase';
import { TailMask } from '../common/TailMask';
import { IrisLine } from './IrisLine';
import { LineSimple } from './LineSimple';
import { TailLines } from './TailLines';

export class CreatorIris extends CreatorBase {
  private lines: LineSimple[];

  private lineContainer: SVGGElement;

  // こちらにはマスクかけたくないので尻尾用はコンテナを分ける
  private lineTailContainer: SVGGElement;

  private tail: TailLines;

  constructor() {
    super('iris');

    this.lineContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.lineContainer.setAttribute('id', 'iris-line-container');
    this.lineContainer.setAttribute('clip-path', 'url(#clip-iris)');
    this.container.element.appendChild(this.lineContainer);

    this.lineTailContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.lineTailContainer.setAttribute('id', 'iris-line-tail-container');
    this.container.element.appendChild(this.lineTailContainer);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.setAttribute('id', 'clip-iris');
    this.container.element.append(defs);
    defs.append(clipPath);

    clipPath.appendChild(this.mask.element);

    // this.container.element.appendChild(this.mask.element);

    this.tail = new TailLines();
  }

  public update(props: LogoProperty): void {

    // removeChildren(this.container.element);
    removeChildren(this.lineContainer);
    removeChildren(this.lineTailContainer);

    // 尻尾の長さ
    const tailBaseHeight: number = props.outerRadius * ((props.tailEndDistance == 0) ? 1 : (65.75 / 70.43));

    // ラインの幅
    const width: number = props.outerRadius - props.innerRadius;
    // ラインの高さ（太さ）
    const height: number = props.lineTickness;

    // 半径（ドーナツ中央の位置の半径）
    const dis: number = width * 0.5 + props.innerRadius;

    // ドーナツ中央の位置を通る円の円周
    // const aroundDis: number = dis * 2 * Math.PI;
    const aroundDis: number = dis * 2 * Math.PI;

    // 尻尾も含めたトータルの距離(progressは無視)
    const allDis: number = props.onlyCircle ? aroundDis : aroundDis + tailBaseHeight;

    const circlePer = aroundDis / allDis;

    const progress: number = (props.division) * props.drawProgress;

    const lines: IrisLine[] = [];

    const maskH: number = tailBaseHeight * (props.drawProgress - circlePer) / (1 - circlePer);
    let realMaskH: number = 0;

    for (var i = 0; i <= progress; i++) {
      const per = (i ) / props.division; // * (aroundDis / allDis);
      const opacityPer: number = getEasing(props.opacityCurve, per);
      const rgbPer: number = getEasing(props.rgbCurve, per);
      const color: string = getColorPercent(props.rgbStart, props.rgbEnd, rgbPer);
      const opacity: number = (props.opacityEnd - props.opacityStart) * opacityPer + props.opacityStart;
      const line: IrisLine = new IrisLine(color, opacity, width, height, dis, aroundDis, allDis, tailBaseHeight, per);
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

    this.mask.draw(props, realMaskH);

    this.updateDownloadHref();
  }
}
