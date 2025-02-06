import { LogoProperty } from '../../../info/LogoProperty';
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
    this.container.element.appendChild(this.lineContainer);

    if (!props.onlyCircle) {
      // this.tail = new Tail(props);
      // this.container.element.appendChild(this.tail.element);
    }

    // const rad: number = (props.partAngle / 180) * Math.PI;
    // const div = 6.28 / rad;

    const div = props.division;
    const rad = 6.28 / div;

    for (var i = 0; i < div; i++) {
      const line: LineSimple = new LineSimple(props.outerRadius, props.innerRadius, rad * i, props.lineTickness);
      this.container.element.appendChild(line.element);
    }

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

    const width: number = props.outerRadius - props.innerRadius;
    const height: number = props.lineTickness;
    const dis: number = width * 0.5 + props.innerRadius;
    const aroundDis: number = dis * 2 * Math.PI;
    const allDis: number = aroundDis + props.outerRadius;

    const offsetX = -width / 2;
    const offsetY = -height / 2;

    const test: IrisLine = new IrisLine(width, height, dis, 0.45);
    this.lineContainer.appendChild(test.element);

    // this.lineContainer.setAttribute('transform', 'translate(' + offsetX + ', ' + offsetY + ')');

    this.updateDownloadHref();
  }
}
