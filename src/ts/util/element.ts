
/*
 * 子要素をすべて削除
 */
export const removeChildren = (element: HTMLElement | SVGElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};


/*
 * 子要素を削除
 */
export const removeChild = (element: HTMLElement | SVGElement, child: HTMLElement | SVGElement): void => {
  if (element.querySelector('.' + child.getAttribute('class'))) {
    // console.log('has child', child.getAttribute('class'));
    element.removeChild(child);
  } else {
    // console.log('no child', child.getAttribute('class'));
  }
};