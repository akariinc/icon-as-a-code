
/*
  * 色情報クラス
  */
export class ColorInfo {

  public color: string;

  public alpha: number;

  public lineColor: string;

  //public lineAlpha:number;

  public hasColor: boolean;

  public hasLineColor: boolean;

  constructor(color: string = "", alpha: number = 1, lineColor: string = "") {
    this.color = color;
    this.alpha = alpha;
    this.lineColor = lineColor;
    //this.lineAlpha = alpha;

    this.hasColor = color != "";
    this.hasLineColor = lineColor != "";
  }


  public toString(): string {
    return "col = " + this.color + ", lineCol = " + this.lineColor + ", alp = " + this.alpha + ", hasColor = " + this.hasColor + ", hasLineColor = " + this.hasLineColor;
  }
}

