require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const { CheckerPlugin } = require('awesome-typescript-loader');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const CopyPlugin = require('copy-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

/*
 *
 * Inline Plugin
 *
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
/*
//
// Clean Dist
//
*/

const pugFiles = globule.find('src/pug/**/*.pug', {
  ignore: ['src/pug/_include/**/*.pug'],
});

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
const compileTemplate = (fileName) => {
  return new HtmlWebpackPlugin({
    template: PATHS.src + '/pug/' + fileName + '.pug',
    filename: fileName + '.html',
    baseUrl: process.env.BASE_URL
  })
}
*/

const getApp = (env) => {
  let plugins = [new webpack.HashedModuleIdsPlugin()];

  // npm run start時にクリーンアップするとコマンドが止まってしまう事が多発したので
  // npm run buildのときだけクリーンアップするように修正。
  if (env && env.dist == 'clean') {
    plugins.push(new CleanWebpackPlugin({ verbose: false }));
  }

  const commonPlugins = [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/public/images',
          to: 'images',
        },
        {
          from: 'src/public/epub',
          to: 'epub',
        },
      ],
    }),
    new CheckerPlugin(),
    new CircularDependencyPlugin({
      cwd: process.cwd(),
      exclude: /a\.ts|node_modules/,
      failOnError: true,
    }),
    new LiveReloadPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'https://localhost:8080',
    }),
    //compileTemplate('index'),
  ];

  plugins = plugins.concat(commonPlugins);

  const app = {
    entry: PATHS.src + '/ts/index.ts',
    output: {
      path: PATHS.dist,
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          use: ['pug-loader'],
        },

        {
          test: /\.png|svg|jpg|gif$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[hash].[ext]',
          },
        },

        {
          test: /\.scss|css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
            },
            'import-glob-loader',
          ],
        },

        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },

        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /(node_modules)/,
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    plugins: plugins,

    mode: 'development',

    devServer: {
      contentBase: PATHS.dist,
      watchContentBase: true,
      https: true,
    },

    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        name: false,

        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
        },
      },
    },
  };

  pugFiles.forEach((pug) => {
    const fileName = pug.replace('src/pug/', '').replace('.pug', '.html');

    // console.log(pug);
    app.plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        minify: false,
        // filename: `${path.resolve(__dirname, 'dist')}/${html}`,
        filename: `${fileName}`,
        template: pug,
        //baseUrl: process.env.BASE_URL
        // data: require(`${path.resolve(__dirname, 'src')}/data/global.js`)
      })
    );
  });

  return app;
};

module.exports = (env) => {
  return getApp(env);
};
