import "./scss/main.scss";

import { AkariLogo } from "./ts/view/logo/Logo";
import { Controller } from "./ts/control/Controller";

// TODO: 環境変数でテストかどうかを判断して、テストの場合はControllerを実行する
// window.onload = (): void => {
//   new Controller();
// };

export { AkariLogo };
