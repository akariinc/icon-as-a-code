export interface LogoProperty {
  onlyCircle: boolean;
  drawProgress: number;
  innerRadius: number;
  outerRadius: number;
  tailEndDistance: number;
  lineThickness: number;
  division: number;
  mask: boolean;
  // TODO: leave it for now
  // lineCap: "rectangular" | "circular";

  opacityStart: number;
  opacityEnd: number;
  opacityCurve: string;

  rgbStart: string;
  rgbEnd: string;
  rgbCurve: string;

  paintDivision: number;
  paintOverlap: number;

  animCurve: string;
  animDuration: number;

  [ken: string]: string | number | boolean;
}
