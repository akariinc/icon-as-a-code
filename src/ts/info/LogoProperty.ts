export interface LogoProperty {
  onlyCircle: boolean;
  drawProgress: number;
  innerRadius: number;
  outerRadius: number;
  // shapeType: 'iris' | 'paint';
  partAngle: number;
  mask: boolean;

  opacityStart: number;
  opacityEnd: number;

  rgbStart: string;
  rgbEnd: string;
};
