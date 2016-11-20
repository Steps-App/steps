const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const tools = require('./libs/webpack.tools');

// Init common paths used by config
const path = require('path');
const PATHS = {
  app: path.join(__dirname, 'app', 'main.js'),
  build: path.join(__dirname, 'public'),
  stylesheets: path.join(__dirname, 'src/stylesheets', 'style.css'),
  html_template: path.join(__dirname, '/src/index.html')
};

// Vendor dependencies, isolated for chunking
const vendorDependencies = [
  'axios',
  'react', 'react-dom', 'react-router', 'react-helmet', 'react-tap-event-plugin',
  'redux', 'react-redux', 'redux-logger', 'redux-thunk'
]

// index.html template
let htmlTemplate = {
  title: 'Therapy',
  meta: {
    description: 'Physical therapy for the way you live today',
    keywords: 'physical therapy, occupational therapy'
  },
  template: PATHS.html_template
}

// Standard build artifacts for all envs
const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.stylesheets
  },
  output: {
    path: PATHS.build,
    sourceMapFilename: '[file].map',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin(htmlTemplate)
  ],
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}

// Detect how npm is run and switch based on this
let config;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: Object.assign(common.output, {
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        })
      },
      tools.extractBundle({
        name: 'vendor',
        entries: vendorDependencies
      }),
      tools.clean(PATHS.build),
      tools.extractCSS(PATHS.stylesheets),
      tools.extractImages(),
      tools.minify()
    );
    break;
  case 'build-watch':
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      tools.clean(PATHS.build),
      tools.extractCSS(PATHS.stylesheets),
      tools.extractImages()
    );
    break;
  case 'hmr':
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      tools.extractCSS(PATHS.stylesheets),
      tools.extractImages(),
      tools.devServer({
        port: 3000
      })
    );
    break;
  default:
    console.log('No Webpack config specified for npm event')
    config = merge(common)
}

module.exports = validate(config, { quiet: true });
