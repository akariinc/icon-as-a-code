import { LogoProperty } from '../../../info/LogoProperty';
import { getEasing } from '../../../util/easing';
import { removeChild } from '../../../util/element';
import { Container } from './Container';
import { TailMask } from './TailMask';

export class CreatorBase {
  // public props: LogoProperty;

  public svg: HTMLElement;

  protected parent: HTMLElement;

  protected container: Container;

  protected buttonDownload: HTMLElement;

  protected mask: TailMask;

  constructor(id: string) {
    this.parent = document.getElementById('my-svg') as HTMLElement;
    this.container = new Container(id);
    this.svg = this.parent;

    this.mask = new TailMask();
    // this.props = {
    //   onlyCircle: false,
    //   drawProgress: 0,
    //   innerRadius: 0,
    //   outerRadius: 0,
    //   // shapeType: 'iris',
    //   partAngle: 1,
    //   mask: false,

    //   opacityStart: 0,
    //   opacityEnd: 0,

    //   rgbStart: '',
    //   rgbEnd: ''
    // };

    // this.parent.appendChild(this.container.element);

    this.buttonDownload = document.getElementById('button-execute');
    this.buttonDownload.setAttribute('download', 'logo.svg');

    this.currentKey = 0;
    this.enterFrameFunc = null;
    this.intervalTimer = 0;
    this.isEnterFrame = false;
  }

  public update(props: LogoProperty): void {
    //
  }

  public show(): void {
    this.parent.appendChild(this.container.element);
  }

  public hide(): void {
    removeChild(this.parent, this.container.element);
    // this.parent.removeChild(this.container.element);
  }

  public anim(props: LogoProperty): void {
    const endDuration: number = props.animDuration * 1000;
    let currDuration: number = 0;
    let progress: number = 0;

    props.drawProgress = progress;

    let cc = 0;

    this.update(props);

    this.onEnterFrame = (deltaTime: number) => {
      currDuration += deltaTime;

      if (currDuration >= endDuration) {
        currDuration = endDuration;
      }
      cc++;

      const per = getEasing(props.animCurve, currDuration / endDuration);

      props.drawProgress = per;

      this.update(props);

      // console.log(currDuration);

      if (currDuration >= endDuration) {
        this.deleteEnterFrame;
        console.log('fps = ' + cc);
      }
    };
  }

  protected updateDownloadHref() {
    const svgElm: SVGElement = this.svg.cloneNode(true) as SVGElement;

    svgElm.setAttribute('transform', '');
    svgElm.setAttribute('style', '');

    // (svgElm.querySelector('.svg-body') as SVGGElement).setAttribute('transform', '');

    const svg = svgElm.outerHTML;
    console.log('svg = ' + svg);
    var url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(svg);
    this.buttonDownload.setAttribute('href', url);
  }

  private enterFrameFunc: Function | null;

  private isEnterFrame: boolean;

  private currentKey: number;

  private intervalTimer: number;

  /*
   * EnterFrame実行
   */
  public set onEnterFrame(func: Function) {
    if (this.enterFrameFunc) {
      this.deleteEnterFrame;
    }

    this.enterFrameFunc = func;
    var scope: CreatorBase = this;
    this.currentKey++;

    const key: number = this.currentKey;

    if (!this.isEnterFrame) {
      this.isEnterFrame = true;
      var current: number = new Date().getTime();

      (function loop() {
        if (!scope.enterFrameFunc) {
          scope.isEnterFrame = false;
          return;
        }
        if (key != scope.currentKey) {
          return;
        }

        var tmp: number = new Date().getTime();
        var deltaTime = tmp - current;
        if (deltaTime < 0) {
          deltaTime = 1;
        }
        scope.enterFrameFunc(deltaTime);
        current = tmp;
        scope.intervalTimer = requestAnimationFrame(() => loop());
      })();
    }
  }

  /*
   * EnterFrame停止
   */
  public get deleteEnterFrame(): boolean {
    this.isEnterFrame = false;
    this.enterFrameFunc = null;
    cancelAnimationFrame(this.intervalTimer);
    this.intervalTimer = -1;
    return true;
  }
}
