import { LogoProperty } from "../../../info/LogoProperty";
import { ShapeBase } from "./ShapeBase";

/*
 * maskオンのときに、円と尻尾が重なる部分だけ描画しないためのマスク
 * iris/paint共用
 */
export class TailMask extends ShapeBase {
  private type: "iris" | "paint";

  constructor(type: "iris" | "paint") {
    super("path");

    this.type = type;

    this.element.setAttribute("class", "iris-mask");
    this.element.setAttribute("fill", "red");
    this.element.setAttribute("opacity", "0.4");
    // this.element.setAttribute('d', `
    //   M12,13v-3h8C20,4.48,15.52,0,10,0S0,4.48,0,10s4.48,10,10,10c4.48,0,8.27-2.94,9.54-7h-7.54Z
    // `);
    // this.element.setAttribute('transform', 'translate(-10, -10)');
  }

  public draw(props: LogoProperty, h: number): void {
    const r = props.outerRadius;
    const inner = props.innerRadius;

    const rad = Math.asin(h / r);

    // const x2 = Math.cos(rad) * r;

    // const x = Math.cos(rad) * r;
    // const y = Math.sin(rad) * r;

    // this.element.setAttribute(
    //   'd',
    //   `
    //   M10,0
    //   A10,10 1 0 0 0,-10
    //   A10,10 1 0 0 -10,0
    //   A10,10 1 0 0 0,10
    //   A10,10 1 0 0 ${x2},${h}
    //   L${inner},${h}
    //   L${inner},0
    //   L${r},0
    //   Z
    // `
    // );

    if (props.mask) {
      const thresholdY: number = Math.sqrt(r * r - inner * inner);

      let circleEndEdge = "";

      if (this.type === "iris") {
        // １本目のラインのマスクを正確に隠すための補正
        if (h === 0) {
          circleEndEdge = `
          L${inner},0
          `;
        } else {
          // １本目のラインを完全に隠すため、ラインのサイズの２倍の高さを隠す
          circleEndEdge = `
          L${r},${-props.lineThickness * 2}
          L${inner},${-props.lineThickness * 2}
          L${inner},0
          `;
        }
      } else {
        circleEndEdge = `
        L${inner},0
        `;
      }

      if (h <= 0) {
        // maskオフの場合はシンプルに円を描画
        this.element.setAttribute(
          "d",
          `
          M${r},0
          A${r},${r} 0 0 1 0,${r}
          A${r},${r} 0 0 1 ${-r},0
          A${r},${r} 0 0 1 0,${-r}
          A${r},${r} 0 0 1 ${r},0
          Z
        `
        );
      } else if (thresholdY < h) {
        const rad2 = Math.atan2(thresholdY, inner);
        // 尻尾の末端が円からはみ出ている（Type1）
        console.log("shape1");
        this.element.setAttribute(
          "d",
          `
          M${inner},0
          L${inner},${Math.sin(rad2) * r}
          A${r},${r} 0 0 1 0,${r}
          A${r},${r} 0 0 1 ${-r},0
          A${r},${r} 0 0 1 0,${-r}
          A${r},${r} 0 0 1 ${r},0
          ${circleEndEdge}
          Z
        `
        );
      } else {
        // 尻尾の末端が円からはみ出ている（Type2）
        console.log("shape2");
        this.element.setAttribute(
          "d",
          `
          M${inner},0
          L${inner},${Math.sin(rad) * r}
          L${Math.cos(rad) * r},${Math.sin(rad) * r}
          A${r},${r} 0 0 1 0,${r}
          A${r},${r} 0 0 1 ${-r},0
          A${r},${r} 0 0 1 0,${-r}
          A${r},${r} 0 0 1 ${r},0
          ${circleEndEdge}
          Z
        `
        );
      }
    } else {
      // maskオフの場合はシンプルに円を描画
      this.element.setAttribute(
        "d",
        `
        M${r},0
        A${r},${r} 0 0 1 0,${r}
        A${r},${r} 0 0 1 ${-r},0
        A${r},${r} 0 0 1 0,${-r}
        A${r},${r} 0 0 1 ${r},0
        Z
      `
      );
    }
  }
}
