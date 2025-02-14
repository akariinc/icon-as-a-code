// import { Slider } from "./Slider";

export class ColorPicker {
  public onChange?: (name: string, value: string) => void;

  public name: string;

  public value: string;

  constructor(element: HTMLElement) {
    this.name = element.dataset.name as string;
    const input: HTMLInputElement = element.querySelector(
      "input"
    ) as HTMLInputElement;
    input.addEventListener("change", () => {
      this.value = input.value;
      this.applyColorInput(input.value);
    });
    input.addEventListener("input", () => {
      this.value = input.value;
      this.applyColorInput(input.value);
    });

    this.value = input.value;

    this.applyColorInput(input.value);

    console.log("Value ", input.value);
  }

  private applyColorInput(col: string): void {
    if (this.onChange) {
      this.onChange(this.name, col);
    }
  }
}
