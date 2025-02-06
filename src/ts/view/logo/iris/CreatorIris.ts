import { LogoProperty } from '../../../info/LogoProperty';
import { CreatorBase } from '../common/CreatorBase';
import { Line } from '../common/Line';

export class CreatorIris extends CreatorBase {
  private lines: Line[];

  // private tail: Tail;

  constructor() {
    super();
  }

  public update(props: LogoProperty): void {
    console.log('update iris');

    this.removeChildren(this.container.element);

    if (!props.onlyCircle) {
      // this.tail = new Tail(props);
      // this.container.element.appendChild(this.tail.element);
    }

    const rad: number = (props.partAngle / 180) * Math.PI;
    const div = 6.28 / rad;

    for (var i = 0; i < div; i++) {
      const line: Line = new Line(props.outerRadius, props.innerRadius, rad * i);
      this.container.element.appendChild(line.element);
    }

    this.updateDownloadHref();
  }
}
