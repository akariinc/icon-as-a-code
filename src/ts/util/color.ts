export const getColorPercent = (startColor: string, endColor: string, per: number): string => {

  const start: { r: number, g: number, b: number } = hexToRgb(startColor);
  const end: { r: number, g: number, b: number } = hexToRgb(endColor);

  return rgbToHex(
    Math.round((end.r - start.r) * per + start.r),
    Math.round((end.g - start.g) * per + start.g),
    Math.round((end.b - start.b) * per + start.b)
  );
};

export const hexToRgb = (color: string): { r: number, g: number, b: number } => {
  const hex = color.substring(1); // #を取り除く
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r: r, g: g, b: b };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${to16(r)}${to16(g)}${to16(b)}`;
};

export const to16 = (num): string => {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}