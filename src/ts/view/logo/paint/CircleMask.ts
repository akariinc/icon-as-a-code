import { ShapeBase } from '../common/ShapeBase';

export class CircleMask extends ShapeBase {
  constructor(innerRadius: number, outerRadius: number) {
    super();

    // this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // this.setAttributes(this.element, {
    //   r: '10',
    //   stroke: '#000000',
    //   strokeWidth: '2',
    //   fill: 'none',
    // });

    const width = outerRadius - innerRadius;

    // 円周の長さ
    const round = (13 - width) * Math.PI;

    const r = round / (2 * Math.PI);

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.element.setAttribute('fill', 'none');
    this.element.setAttribute('stroke', '#000000');
    this.element.setAttribute('stroke-width', width.toString());
    this.element.setAttribute(
      'd',
      `M20 ${(40 - (r + r)) / 2}
        a ${r} ${r} 0 0 1 0 ${r + r}
        a ${r} ${r} 0 0 1 0 -${r + r}`
    );
    this.element.setAttribute('stroke-dasharray', round * 1 + ' ' + round);

    this.setAttributes(this.element, {
      opacity: '0.5',
      transform: 'translate(-20, -20)',
    });
    /*
		<path
  d={`M20 ${(40 - (r + r)) / 2}
        a ${r} ${r} 0 0 1 0 ${r + r}
        a ${r} ${r} 0 0 1 0 -${r + r}`}
  fill="none"
  stroke="#F2F2F2"
  strokeWidth="6"
  strokeDasharray="100"
/>
		*/
  }
}
