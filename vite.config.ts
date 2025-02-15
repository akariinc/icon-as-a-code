import { defineConfig } from "vite";
import packageJson from "./package.json";
/// <reference types="vitest" />
import path from "path";
import { writeFileSync } from "fs";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.js`,
  iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default defineConfig({
  base: "./",
  build: {
    outDir: "./build/dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats,
      fileName: format => fileName[format],
    },
  },
  plugins: [
    {
      name: "copy-package-json",
      // This hook runs after the build is complete.
      closeBundle() {
        // Create a shallow copy of package.json
        const trimmedPackage = { ...packageJson };
        // Remove fields that you don't want to include.
        delete trimmedPackage.scripts;
        delete trimmedPackage.devDependencies;

        // Define the target directory. In this example, we copy it to the `build` folder
        // (i.e. the parent directory of `build/dist`).
        const outputDir = path.resolve(__dirname, "build");

        // Write the trimmed package.json into the target directory.
        writeFileSync(
          path.join(outputDir, "package.json"),
          JSON.stringify(trimmedPackage, null, 2)
        );
        console.log(`Copied trimmed package.json to ${outputDir}`);
      },
    },
  ],
  test: {
    watch: false,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@@", replacement: path.resolve(__dirname) },
    ],
  },
});
