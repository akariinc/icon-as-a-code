import { LogoProperty } from '../../../info/LogoProperty';
import { ShapeBase } from './ShapeBase';

export class Tail extends ShapeBase {
  constructor(props: LogoProperty) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

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
    stop0.setAttribute('stop-color', props.rgbStart);
    stop0.setAttribute('stop-opacity', props.opacityStart.toString());
    stop1.setAttribute('offset', '100%');
    stop1.setAttribute('stop-color', props.rgbEnd);
    stop1.setAttribute('stop-opacity', props.opacityEnd.toString());

    grad.appendChild(stop0);
    grad.appendChild(stop1);
    defs.appendChild(grad);

    /*
    <defs>
    <linearGradient id="Gradient1">
      <stop class="stop1" offset="0%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop3" offset="100%" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
  </defs>
    */

    const outer: number = props.outerRadius;
    const inner: number = props.innerRadius;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.setAttributes(rect, {
      width: outer - inner,
      height: outer,
      fill: 'url(#grad)',
      opacity: 0.7,
      transform: 'translate(' + inner + ', 0)',
    });

    this.element.appendChild(defs);
    this.element.appendChild(rect);
  }
}
