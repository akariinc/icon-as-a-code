import { ShapeBase } from '../common/ShapeBase';

export class CircleMask extends ShapeBase {
  constructor() {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.setAttributes(this.element, {
      id: 'circle',
      // opacity: '0.5',
      fill: '#000000',
    });
    /*
        // ドーナツの幅 (太さ)
        const width = outerRadius - innerRadius;
    
        // 円周の長さ
        const round = (outerRadius + innerRadius) * Math.PI;
    
        // console.log('width', width, 'round', round);
    
        // 半径
        const r = round / (2 * Math.PI);
    
        // 描画割合 (0 - 1)
        const per = 1;
    
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
        this.element.setAttribute('stroke-dasharray', round * per + ' ' + round);
    
        this.setAttributes(this.element, {
          id: 'circle',
          opacity: '0.5',
          transform: 'rotate(90) translate(-20, -20)',
        });
    */
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


  public draw(outerRadius: number): void {
    this.setAttributes(this.element, {
      r: outerRadius,
    });
  }
}
