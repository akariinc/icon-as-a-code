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
    // console.log('update iris', props.lineTickness);

    // removeChildren(this.container.element);
    removeChildren(this.lineContainer);
    removeChildren(this.lineTailContainer);
    // this.container.element.appendChild(this.lineContainer);

    if (!props.onlyCircle) {
      // this.tail = new Tail(props);
      // this.container.element.appendChild(this.tail.element);
    }

    // const rad: number = (props.partAngle / 180) * Math.PI;
    // const div = 6.28 / rad;

    // const div = props.division;
    // const rad = 6.28 / div;

    // for (var i = 0; i < div; i++) {
    //   const line: LineSimple = new LineSimple(props.outerRadius, props.innerRadius, rad * i, props.lineTickness);
    //   this.container.element.appendChild(line.element);
    // }

    // if (!props.onlyCircle) {
    //   this.tail.draw(
    //     props.outerRadius,
    //     props.innerRadius,
    //     props.rgbStart,
    //     props.rgbEnd,
    //     props.opacityStart,
    //     props.opacityEnd
    //   );
    //   this.container.element.appendChild(this.tail.element);
    // } else {
    //   this.container.element.removeChild(this.tail.element);
    // }

    // ラインの幅
    const width: number = props.outerRadius - props.innerRadius;
    // ラインの高さ（太さ）
    const height: number = props.lineTickness;

    // 半径（ドーナツ中央の位置の半径）
    const dis: number = width * 0.5 + props.innerRadius;

    // ドーナツ中央の位置を通る円の円周
    // const aroundDis: number = dis * 2 * Math.PI;
    const aroundDis: number = (props.innerRadius + props.outerRadius * 0.5) * 2 * Math.PI;

    // 尻尾も含めたトータルの距離(progressは無視)
    const allDis: number = props.onlyCircle ? aroundDis : aroundDis + props.outerRadius;

    // const offsetX = -width / 2;
    // const offsetY = -height / 2;

    // console.log('curve', props.opacityCurve);

    const circlePer = aroundDis / allDis;

    const tailH: number = props.outerRadius * ((props.drawProgress - circlePer) / (1 - circlePer));

    // 尻尾も含めたトータルの距離(progressを考慮した全体の距離)
    const allDisProgress: number = props.onlyCircle ? aroundDis : aroundDis + tailH;

    const circlePerProgress = aroundDis / allDisProgress;

    const progress: number = (props.division) * props.drawProgress;

    const lines: IrisLine[] = [];

    const maskH: number = props.outerRadius * (props.drawProgress - circlePer) / (1 - circlePer);
    let realMaskH: number = 0;

    for (var i = 0; i < progress; i++) {
      const per = (i + 1) / props.division; // * (aroundDis / allDis);
      const opacityPer: number = getEasing(props.opacityCurve, per);
      const rgbPer: number = getEasing(props.rgbCurve, per);
      const color: string = getColorPercent(props.rgbStart, props.rgbEnd, rgbPer);
      const opacity: number = (props.opacityEnd - props.opacityStart) * opacityPer + props.opacityStart;
      const line: IrisLine = new IrisLine(color, opacity, width, height, dis, aroundDis, allDis, props.outerRadius, per);
      lines.push(line);

      const myDis: number = allDis * per;
      const myCirclePer = myDis / aroundDis;

      if (myCirclePer < 1) {
        this.lineContainer.appendChild(line.element);
      } else {

        if (line.edgeY <= maskH) {
          this.lineTailContainer.appendChild(line.element);
          realMaskH = line.edgeY;
        }
      }
    }

    console.log('realMaskH = ' + realMaskH, 'maskH = ' + maskH);

    // this.container.element.appendChild(this.mask.element);
    this.mask.draw(props, realMaskH);

    // this.lineContainer.setAttribute('transform', 'translate(' + offsetX + ', ' + offsetY + ')');

    this.updateDownloadHref();
  }
}
