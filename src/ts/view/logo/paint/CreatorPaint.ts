import { LogoProperty } from '../../../info/LogoProperty';
import { getColorPercent } from '../../../util/color';
import { getEasing } from '../../../util/easing';
import { removeChild, removeChildren } from '../../../util/element';
import { CreatorBase } from '../common/CreatorBase';
import { ArkFill } from './ArkFill';
import { CircleMask } from './CircleMask';
import { TailCircular } from './TailCircular';
import { TailFill } from './TailFill';

export class CreatorPaint extends CreatorBase {

  private arkContainer: SVGGElement;

  private circleMask: CircleMask;

  private tail: TailFill;

  private tailCircular: TailCircular;

  constructor() {
    super('paint');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.setAttribute('id', 'clip');
    this.container.element.append(defs);
    defs.append(clipPath);

    this.circleMask = new CircleMask();
    clipPath.appendChild(this.circleMask.element);

    this.arkContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.arkContainer.setAttribute('clip-path', 'url(#clip)');
    this.container.element.append(this.arkContainer);

    this.tail = new TailFill();
    this.container.element.appendChild(this.tail.element);

    this.tailCircular = new TailCircular();
    this.container.element.appendChild(this.tailCircular.element);
  }

  public update(props: LogoProperty): void {
    // console.log('update paint');

    // 一旦すべてリムーブ
    removeChildren(this.arkContainer);

    this.circleMask.draw(props.outerRadius);

    const aroundDis: number = (props.innerRadius + (props.outerRadius * 0.5)) * 2 * Math.PI;
    const allDis: number = aroundDis + props.outerRadius;

    const circlePer = aroundDis / allDis;

    // console.log('allDis', allDis, 'aroundDis', aroundDis, 'circlePer', circlePer);


    // const arkContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // arkContainer.setAttribute('clip-path', 'url(#clip)');
    // this.container.element.append(arkContainer);

    // const rad: number = (props.partAngle / 180) * Math.PI;
    // const div = 6.28 / rad;

    const div = 300; //props.division;
    const rad = 6.28 / div;

    let progress = 0;

    if (props.onlyCircle) {
      // サークルのみ
      progress = div * props.drawProgress;
    } else {
      // サークル＋尻尾
      progress = Math.min(div, div * props.drawProgress / circlePer);
    }

    console.log('circlePer', circlePer, 'drawProgress', props.drawProgress, 'progress', progress);

    for (var i = 0; i < progress; i++) {
      const per: number = (i / div) * circlePer;
      // const opacityPer: number = getEasing(props.opacityCurve, per);
      const rgbPer: number = getEasing(props.rgbCurve, per);
      const col: string = getColorPercent(props.rgbStart, props.rgbEnd, rgbPer);
      const opacity: number = (props.opacityEnd - props.opacityStart) * getEasing(props.opacityCurve, per) + props.opacityStart;
      // console.log(col);
      const ark: ArkFill = new ArkFill(props.outerRadius, props.innerRadius, rad * i, col, opacity);
      //      this.arkContainer.appendChild(ark.element);
      this.arkContainer.insertBefore(ark.element, this.arkContainer.firstChild);
    }

    if (!props.onlyCircle) {

      // 尻尾ありかつ、drawProgressが尻尾までいっているかどうか
      if (props.drawProgress > circlePer) {
        this.tail.draw(
          props.outerRadius,
          props.innerRadius,
          getColorPercent(props.rgbStart, props.rgbEnd, getEasing(props.rgbCurve, circlePer)),
          props.rgbEnd,
          (props.opacityEnd - props.opacityStart) * circlePer + props.opacityStart,
          props.opacityEnd,
          (props.drawProgress - circlePer) / (1 - circlePer)
        );
        this.container.element.appendChild(this.tail.element);

      } else {
        removeChild(this.container.element, this.tail.element);
      }

      if (props.lineCap === 'circular') {
        this.tailCircular.draw(props);
        this.container.element.appendChild(this.tailCircular.element);
      } else {
        removeChild(this.container.element, this.tailCircular.element);
        // this.container.element.removeChild(this.tailCircular.element);
      }
    } else {
      removeChild(this.container.element, this.tail.element);
      removeChild(this.container.element, this.tailCircular.element);
      // this.container.element.removeChild(this.tail.element);
      // this.container.element.removeChild(this.tailCircular.element);
    }

    this.updateDownloadHref();
  }
}
