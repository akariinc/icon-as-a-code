import { AkariLogo } from "../view/logo/Logo";
import { ColorPicker } from "../view/component/ColorPicker";
import { LogoProperty } from "../info/LogoProperty";
import { Slider } from "../view/component/Slider";
// import { easeInOutQuad } from "../util/easing";

export class Controller {
  private logo: AkariLogo;

  private sideUI: HTMLElement;

  private props: LogoProperty;

  private SVGDownloadButton: HTMLElement;

  constructor() {
    this.sideUI = document.querySelector(".js-side") as HTMLElement;

    this.props = {
      onlyCircle: false,
      drawProgress: 0,
      innerRadius: 0,
      outerRadius: 0,
      lineThickness: 0.1,
      division: 1,
      mask: false,
      tailEndDistance: 0,
      // TODO: leave it for now
      // lineCap: "rectangular",

      opacityStart: 0,
      opacityEnd: 0,
      opacityCurve: "linear",

      rgbStart: "",
      rgbEnd: "",
      rgbCurve: "linear",

      paintDivision: 4,
      paintOverlap: 0.02,

      animCurve: "linear",
      animDuration: 1,
    };

    this.logo = new AkariLogo("paint", this.props);
    const logoContainer: HTMLElement = document.getElementById(
      "logo-container"
    ) as HTMLElement;
    logoContainer.appendChild(this.logo.el);
    this.setUIEvent();

    this.changeType(
      (document.getElementById("shapeType0") as HTMLInputElement).checked
        ? "0"
        : "1"
    );

    const buttonAnimPlay: HTMLElement = document.getElementById(
      "button-play"
    ) as HTMLElement;
    buttonAnimPlay.addEventListener("click", () => {
      this.logo.anim(this.props, this.props.animDuration);
    });

    this.logo.update(this.props);

    this.SVGDownloadButton = document.getElementById(
      "button-download-svg"
    ) as HTMLElement;
    this.SVGDownloadButton.setAttribute("download", "logo.svg");
    this.SVGDownloadButton.addEventListener("mouseover", () => {
      const svgValue = this.logo.svgLogo.getSVGURL();
      this.SVGDownloadButton.setAttribute("href", svgValue);
    });
  }

  private setUIEvent() {
    // Slider UI
    const sliders: NodeListOf<HTMLElement> =
      document.querySelectorAll(".js-Slider");

    for (let i = 0; i < sliders.length; i++) {
      if (sliders[i].dataset.noevent != "true") {
        const slider: Slider = new Slider(sliders[i]);
        slider.onChange = (name: string, value: number) => {
          console.log(name, value);
          this.props[name] = value;
          this.logo.update(this.props);
        };
        this.props[slider.name] = slider.value;
      }
    }

    // CheckBox

    const checkboxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".js-Checkbox");

    for (let i = 0; i < checkboxes.length; i++) {
      const check: HTMLInputElement = checkboxes[i];
      check.addEventListener("change", () => {
        console.log(check.dataset.name, check.checked);
        const name = check.dataset.name as string;
        this.props[name] = check.checked;
        this.logo.update(this.props);
      });
    }

    // ColorPicker

    const pickers: NodeListOf<HTMLElement> =
      document.querySelectorAll(".js-ColorPicker");

    for (let i = 0; i < pickers.length; i++) {
      const picker: ColorPicker = new ColorPicker(pickers[i]);
      picker.onChange = (name: string, value: string) => {
        console.log(name, value);
        this.props[name] = value;
        this.logo.update(this.props);
      };
      this.props[picker.name] = picker.value;
    }

    // ComboBox

    const comboboxes: NodeListOf<HTMLSelectElement> =
      document.querySelectorAll(".js-ComboBox");

    for (let i = 0; i < comboboxes.length; i++) {
      const select: HTMLSelectElement = comboboxes[i];
      select.addEventListener("change", (e: Event) => {
        const name = select.dataset.name as string;
        console.log(name, (e.target as HTMLSelectElement).value);
        this.props[name] = (e.target as HTMLSelectElement).value;
        this.logo.update(this.props);
      });
    }

    const typeRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".js-radio-type input"
    );

    for (let i = 0; i < typeRadios.length; i++) {
      const radio: HTMLInputElement = typeRadios[i];
      radio.addEventListener("change", (e: Event) => {
        if (radio.name === "shapeType") {
          this.changeType(radio.value);
        } else {
          this.props[radio.name] = (e.target as HTMLInputElement).value;
          console.log(radio.name + " = " + this.props[radio.name]);
        }

        this.logo.update(this.props);
      });
    }

    const size: Slider = new Slider(
      document.getElementById("size") as HTMLElement
    );
    size.onChange = (_, value: number) => {
      this.logo.el.style.left = `calc(50% - ${Math.round(value / 2)}px)`;
      this.logo.el.style.top = `calc(50% - ${Math.round(value / 2)}px)`;
      this.logo.size = value;
    };
    this.logo.el.classList.add("l-main__svg");
    this.logo.el.style.left = `calc(50% - ${Math.round(size.value / 2)}px)`;
    this.logo.el.style.top = `calc(50% - ${Math.round(size.value / 2)}px)`;
    this.logo.size = size.value;
  }

  private changeType(type: string): void {
    if (type === "0") {
      this.sideUI.classList.remove("--iris");
      this.sideUI.classList.add("--paint");
      this.logo.type = "paint";
    } else if (type === "1") {
      this.sideUI.classList.add("--iris");
      this.sideUI.classList.remove("--paint");
      this.logo.type = "iris";
    }
  }
}
