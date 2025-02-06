import { LogoProperty } from '../../../info/LogoProperty';
import { getColorPercent } from '../../../util/color';
import { getEasing } from '../../../util/easing';
import { removeChildren } from '../../../util/element';
import { CreatorBase } from '../common/CreatorBase';
import { IrisLine } from './IrisLine';
import { LineSimple } from './LineSimple';
import { TailLines } from './TailLines';

export class CreatorIris extends CreatorBase {
  private lines: LineSimple[];

  private lineContainer: SVGGElement;

  private tail: TailLines;

  constructor() {
    super('iris');

    this.lineContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.container.element.appendChild(this.lineContainer);

    this.tail = new TailLines();
  }

  public update(props: LogoProperty): void {
    console.log('update iris', props.lineTickness);

    removeChildren(this.container.element);
    removeChildren(this.lineContainer);
    this.container.element.appendChild(this.lineContainer);

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
    const aroundDis: number = dis * 2 * Math.PI;

    // 尻尾も含めたトータルの距離
    const allDis: number = (props.onlyCircle) ? aroundDis : aroundDis + props.outerRadius;

    // const offsetX = -width / 2;
    // const offsetY = -height / 2;

    console.log('curve', props.opacityCurve);

    for (var i = 0; i < props.division; i++) {
      const per = (i + 1) / props.division;// * (aroundDis / allDis);
      const opacityPer: number = getEasing(props.opacityCurve, per);
      const color: string = getColorPercent(props.rgbStart, props.rgbEnd, per);
      const opacity: number = (props.opacityEnd - props.opacityStart) * opacityPer + props.opacityStart;
      const test: IrisLine = new IrisLine(color, opacity, width, height, dis, aroundDis, allDis, props.outerRadius, per);
      this.lineContainer.appendChild(test.element);
    }

    // this.lineContainer.setAttribute('transform', 'translate(' + offsetX + ', ' + offsetY + ')');

    this.updateDownloadHref();
  }
}
