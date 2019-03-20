const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChromeReloaderPlugin = require('webpack-chrome-extension-reloader');
const WebpackCreateExtensionManifestPlugin = require('webpack-create-extension-manifest-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const baseConfig = {
  entry: {
    background: resolve('src/background/index.ts'),
    index: resolve('src/pages/index.tsx'),
    content_script: resolve('src/contentScript/index.tsx'),
  },
  output: {
    path: resolve('dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1024000',
      },
      {
        exclude: /node_modules/,
        test: [/\.scss$/, /\.css$/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss', 'less'],
  },
  plugins: [
    process.env.NODE_ENV === 'development'
      ? new WebpackChromeReloaderPlugin({
        reloadPage: false,
        entries: {
          contentScript: 'content_script',
          background: 'background',
        },
      })
      : null,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('src/static'),
        to: resolve('dist'),
        ignore: ['.*'],
      },
    ]),
    new WebpackCreateExtensionManifestPlugin({
      output: resolve('dist/manifest.json'),
      extra: { name: 'ts-react-chrome-extension' },
    }),
    new HtmlWebpackPlugin({
      title: '',
      filename: '../index.html',
      chunks: ['index'],
    }),
  ].filter(plugin => !!plugin),
};

module.exports = baseConfig;
