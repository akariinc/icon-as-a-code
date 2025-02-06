import { LogoProperty } from "../../../info/LogoProperty";
import { ShapeBase } from "../common/ShapeBase";

export class IrisLine extends ShapeBase {

  // ここのperはテールの距離を含めて0 - 1の値
  // onlyCircleがtrueの場合は、perが1のものが、そもそも来ない
  constructor(col: string, width: number, height: number, dis: number, aroundDis: number, allDis: number, tailHeight: number, per: number) {
    super();

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    this.setAttributes(this.element, {
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      fill: col,
      opacity: 0.7
    });

    const myDis: number = allDis * per;

    const circlePer = myDis / aroundDis;


    if (circlePer < 1) {

      // console.log('myDis', myDis, 'aroundDis', aroundDis, 'allDis', allDis, 'circlePer', circlePer);

      const r: number = 6.28 * circlePer;
      const x: number = Math.cos(r) * dis;
      const y: number = Math.sin(r) * dis;
      const deg: number = r * 180 / Math.PI;

      this.setAttributes(this.element, {
        transform: 'translate(' + x + ', ' + y + ') rotate(' + deg + ')',
      });
    } else {

      // const tailPerOffset = aroundDis / allDis;

      const realHeight: number = tailHeight - (height * 0.5);

      const per3 = (myDis - aroundDis) / (allDis - aroundDis);

      console.log('per3 = ', per3);

      // const tailPer: number = 

      this.setAttributes(this.element, {
        transform: 'translate(' + dis + ', ' + (per3 * realHeight) + ')'
      });
    }

  }
}