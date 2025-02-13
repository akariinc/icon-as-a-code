import { LogoProperty } from '../../../info/LogoProperty';
import { ShapeBase } from '../common/ShapeBase';

/*
 * 尻尾部分の四角形
 */
export class TailFill extends ShapeBase {
  private stop0: SVGStopElement;

  private stop1: SVGStopElement;

  private rect: SVGRectElement;

  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.element.setAttribute('class', 'tail-fill');

    const defs: SVGDefsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad: SVGLinearGradientElement = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');

    const stop0: SVGStopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    const stop1: SVGStopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');

    grad.setAttribute('id', 'grad');
    grad.setAttribute('x1', '0');
    grad.setAttribute('x2', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('y2', '1');

    stop0.setAttribute('offset', '0%');
    stop1.setAttribute('offset', '100%');

    grad.appendChild(stop0);
    grad.appendChild(stop1);
    defs.appendChild(grad);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.setAttributes(rect, {
      fill: 'url(#grad)',
      opacity: 1, //0.7
    });

    this.stop0 = stop0;
    this.stop1 = stop1;
    this.rect = rect;

    this.element.appendChild(defs);
    this.element.appendChild(rect);
  }

  public draw(outer: number, inner: number, rgbStart: string, rgbEnd: string, opacityStart: number, opacityEnd: number, progress: number, height: number): void {
    // console.log('opacityStart', opacityStart, 'opacityEnd', opacityEnd);

    // console.log('progress', progress);

    this.stop0.setAttribute('stop-color', rgbStart);
    this.stop0.setAttribute('stop-opacity', opacityStart.toString());
    this.stop1.setAttribute('stop-color', rgbEnd);
    this.stop1.setAttribute('stop-opacity', opacityEnd.toString());

    // const outer: number = props.outerRadius;
    // const inner: number = props.innerRadius;

    this.setAttributes(this.rect, {
      width: outer - inner,
      height: height * progress,
      transform: 'translate(' + inner + ', 0)',
    });
  }
}
