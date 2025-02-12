export interface LogoProperty {
  onlyCircle: boolean;
  drawProgress: number;
  innerRadius: number;
  outerRadius: number;
  // shapeType: 'iris' | 'paint';
  lineTickness: number;
  // partAngle: number;
  division: number;
  mask: boolean;
  lineCap: 'rectangular' | 'circular';

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
};
