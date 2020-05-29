const path = require('path');

const ClosurePlugin = require('closure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ExponentConfig = require('./exponent.config.js');

module.exports = {
  mode: ExponentConfig.settings.mode,
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /(node_modules)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        exclude: /(node_modules)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: `${ExponentConfig.assetsPublicPath}/fonts`,
          publicPath: `${ExponentConfig.assetsPublicPath}/fonts`,
          name: () => '[name].[ext]'
        }
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        loader: 'file-loader',
        options: {
          outputPath: `${ExponentConfig.assetsPublicPath}/audio`,
          publicPath: `${ExponentConfig.assetsPublicPath}/audio`,
          name: () => '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `${ExponentConfig.assetsPublicPath}/images`,
              publicPath: `${ExponentConfig.assetsPublicPath}/images`,
              name: () => '[name].[ext]'
            },
          },
          { loader: 'image-webpack-loader' }
        ]
      },
    ]
  },

  entry: {
    [ExponentConfig.jsBundleFilename]: ExponentConfig.paths.entryPoint,
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(ExponentConfig.paths.source),
      path.resolve(ExponentConfig.paths.appRoot),
      path.resolve('./node_modules')
    ]
  },

  output: {
    filename: `${ExponentConfig.jsBundleFilename}`,
    publicPath: ExponentConfig.publicPath,
    path: path.resolve(__dirname, ExponentConfig.publicPath)
  },

  optimization: {
    minimizer: [
      new ClosurePlugin({
        mode: 'STANDARD',
        output: {
          filename: `${ExponentConfig.paths.destination}/${ExponentConfig.jsBundleFilename}`,
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        js: {
          name: 'js',
          test: /\.js$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        css: {
          name: 'css',
          test: /\.s?css$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${ExponentConfig.cssStylesFilename}`,
      hmr: ExponentConfig.settings.mode === 'development'
    })
  ],

};
