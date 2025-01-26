export const getMousePosition = (e: any): [x: number, y: number] => {
  const mouseEvent: MouseEvent = e as MouseEvent;
  return [mouseEvent.pageX, mouseEvent.pageY];
};
