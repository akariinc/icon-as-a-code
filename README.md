# Akari Icon as a Code

Akari's logo icon as a code.



https://github.com/user-attachments/assets/bbb70d35-f356-4654-8572-4867a514f5ee



This repository include Logo Generator Controls, SVG exporter and Logo class in vanilla javascript.

With which you can check a logo mark's shape and color variants, export it as SVG, or use the javascript class with animations options on UI.

## The original logo and mark

This is our currnet full logo.

![akari_logo](https://github.com/user-attachments/assets/81983055-e369-4ea1-b8e2-657933d07948)

This is small version of logo mark. Used for icon.

![akari_logo_a](https://github.com/user-attachments/assets/7f8610fd-bc2b-4483-bf0a-63565eabe272)


## Testing the desgin / Exporting SVG

After cloning the repository, start using `yarn` under node.js >= 18.

```shell
git clone https://github.com/akariinc/icon-as-a-code.git
cd icon-as-a-code
yarn install
yarn dev
```

## Frontend Usage

Attaching the logo.

```typescript
import { AkariLogo } from "@akariinc/icon-as-a-code";

window.onload = () => {
  const akariLogo = new AkariLogo("paint", {
    innerRadius: 7.8313809,
    outerRadius: 13,
  });

  const parentElement = document.getElementById("logo-parent");
  parentElement?.appendChild(akariLogo.el);
};
```

Update the attached logo.
```typescript
  // update properties
  akariLogo.update({
    drawProgress: 1,
    opacityStart: 1,
    opacityEnd: 1,
    rgbStart: "#999999",
    size: 72,
  });
```
