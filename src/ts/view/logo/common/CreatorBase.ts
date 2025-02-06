import { LogoProperty } from "../../../info/LogoProperty";
import { Container } from "./Container";

export class CreatorBase {

  // public props: LogoProperty;

  public svg: HTMLElement;

  protected parent: HTMLElement;

  protected container: Container;

  protected buttonDownload: HTMLElement;

  constructor() {
    this.parent = document.getElementById('my-svg') as HTMLElement;
    this.container = new Container();
    this.svg = this.parent;

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

    this.parent.appendChild(this.container.element);

    this.buttonDownload = document.getElementById('button-execute');
    this.buttonDownload.setAttribute("download", 'logo.svg');
  }

  public update(props: LogoProperty): void {
    //
  }

  /*
   * 子要素をすべて削除
   */
  protected removeChildren(element: SVGElement): void {

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


  protected updateDownloadHref() {
    const svg = this.svg.outerHTML;
    var url = "data:text/plain;charset=utf-8," + encodeURIComponent(svg);
    this.buttonDownload.setAttribute("href", url);
  }
}
