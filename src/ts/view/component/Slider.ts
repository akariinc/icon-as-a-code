export class Slider {
  public name: string;

  private text: HTMLElement;

  public onChange?: (name: string, value: number) => void;

  public value: number;

  constructor(element: HTMLElement) {
    this.name = element.dataset.name as string;
    this.text = element.querySelector(".js-SliderText") as HTMLElement;

    const input: HTMLInputElement = element.querySelector(
      "input"
    ) as HTMLInputElement;

    this.value = parseFloat(input.value);

    this.updateText(input.value);

    input.addEventListener("change", () => {
      this.updateText(input.value);

      if (this.onChange) {
        this.onChange(this.name, parseFloat(input.value));
      }
    });
    input.addEventListener("input", () => {
      this.updateText(input.value);

      if (this.onChange) {
        this.onChange(this.name, parseFloat(input.value));
      }
    });
  }

  private updateText(inputValue: string): void {
    this.text.textContent = inputValue;
  }
}
