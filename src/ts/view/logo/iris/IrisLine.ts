// import { LogoProperty } from "../../../info/LogoProperty";
import { ShapeBase } from "../common/ShapeBase";

export class IrisLine extends ShapeBase {
  public edgeY: number = 0;

  // ここのperはテールの距離を含めて0 - 1の値
  // onlyCircleがtrueの場合は、perが1のものが、そもそも来ない
  constructor(
    col: string,
    opacity: number,
    width: number,
    height: number,
    dis: number,
    aroundDis: number,
    allDis: number,
    tailHeight: number,
    per: number
  ) {
    super("rect");

    this.setAttributes(this.element, {
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      fill: col,
      opacity: opacity,
    });

    const myDis: number = allDis * per;

    const circlePer = myDis / aroundDis;

    if (circlePer < 1) {
      // 円周上に配置されるライン

      const r: number = 6.28 * circlePer;
      const x: number = Math.cos(r) * dis;
      const y: number = Math.sin(r) * dis;
      const deg: number = (r * 180) / Math.PI;

      this.setAttributes(this.element, {
        transform: `translate(${x}, ${y}) rotate(${deg})`,
      });
    } else {
      // 円を1週したので直線上に並ぶライン

      // const tailPerOffset = aroundDis / allDis;

      const realHeight: number = tailHeight - height * 0.5;

      const per3 = (myDis - aroundDis) / (allDis - aroundDis) || 0; // NaN対策（0/0の場合）

      this.setAttributes(this.element, {
        transform: `translate(${dis}, ${per3 * realHeight})`,
      });

      this.edgeY = per3 * realHeight + height / 2;
    }
  }
}
