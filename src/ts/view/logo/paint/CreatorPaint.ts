import { LogoProperty } from '../../../info/LogoProperty';
import { CreatorBase } from '../common/CreatorBase';
import { Line } from '../common/Line';
import { Tail } from '../common/Tail';
import { CircleMask } from './CircleMask';

export class CreatorPaint extends CreatorBase {
  private circleMask: CircleMask;

  private tail: Tail;

  constructor() {
    super();

    this.update();
  }

  public update(): void {
    console.log('update paint');

    this.removeChildren(this.container.element);

    if (!this.props.onlyCircle) {
      this.tail = new Tail(this.props);
      this.container.element.appendChild(this.tail.element);
    }

    this.circleMask = new CircleMask(this.props.innerRadius, this.props.outerRadius);
    this.container.element.appendChild(this.circleMask.element);

    this.updateDownloadHref();
  }
}
