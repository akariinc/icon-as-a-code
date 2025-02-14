import "./scss/main.scss";

import { AkariLogo } from "./ts/view/logo/Logo";
import { Controller } from "./ts/control/Controller";

window.onload = (): void => {
  new Controller();
};


export { AkariLogo };
