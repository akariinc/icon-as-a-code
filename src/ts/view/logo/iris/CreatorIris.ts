import { CreatorBase } from '../common/CreatorBase';
import { Line } from '../common/Line';
import { Tail } from '../common/Tail';

export class CreatorIris extends CreatorBase {
  private lines: Line[];

  private tail: Tail;

  constructor() {
    super();
    this.update();
  }

  public update(): void {
    console.log('update iris');

    this.removeChildren(this.container.element);

    if (!this.props.onlyCircle) {
      this.tail = new Tail(this.props);
      this.container.element.appendChild(this.tail.element);
    }

    const rad: number = (this.props.partAngle / 180) * Math.PI;
    const div = 6.28 / rad;

    for (var i = 0; i < div; i++) {
      const line: Line = new Line(this.props.outerRadius, this.props.innerRadius, rad * i);
      this.container.element.appendChild(line.element);
    }

    this.updateDownloadHref();
  }
}
