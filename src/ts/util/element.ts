
/*
 * 子要素をすべて削除
 */
export const removeChildren = (element: SVGElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};