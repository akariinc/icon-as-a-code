import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl';
import relativeLinks from 'astro-relative-links';

/*
 * cssのbackground-imageのURLを相対パスで書く際にdev時とビルド時でパスが異なるようなので
 * NODE_ENVによって読みこむscssを出しわける
 */
const getImportStyle = ()=> {
  return '"./src/scss/_variables.scss", "./src/scss/_mixin.scss", "./src/scss/_fonts.scss"';
};

/*
 * build先を変更したいユーザー用に.envで定義
 * buildディレクトリをプッシュ時にコンフリクトしないように
 */
const getBuildPath = ()=> {
  const tmpPath = import.meta.env.VITE_BUILD_PATH;
  return tmpPath || './dist';
};

// https://astro.build/config
export default defineConfig({
	outDir: getBuildPath(),
  // CMS組み込みしやすいようHTMLは圧縮しない
	compressHTML: false,
  
  /*
  build : {
    // HTMLをファイル名で出力
    format: 'file'
  },*/
  /*build: {
    inlineStylesheets: 'never'
  },*/
  /* 相対パス出力 */
  // integrations: [relativeLinks()],
	vite: {
		plugins: [basicSsl()],
		server: {
			https: true,
		},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: getImportStyle()
        }
      }
    },
		build: {
      // CSSを複数ファイル出力しないように
			cssCodeSplit: false,
      // JS/CSSが常に外部ファイルで出力されるように
      assetsInlineLimit:0,
      rollupOptions: {
        output: {
          // JS/CSSのファイル名を固定
          entryFileNames: 'assets/js/main.js',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            return `assets/${extType}/[name][extname]`;
          }
        }
      },
		}
  }
});
