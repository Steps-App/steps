const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          secure: false
        }
      },
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

// Add CSS to the bundle
exports.extractCSS = function(paths) {
  const isDev = process.env.NODE_ENV !== 'production';
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: isDev ? 'style!css!sass' : ExtractTextPlugin.extract('style', 'css!sass'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

// Add images to the bundle
exports.extractImages = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.(gif|png|jpe?g)$/,
          loader: 'file?name=images/[name].[ext]',
          include: paths
        }
      ]
    }
  };
}

// Add imsvgsages to the bundle
exports.extractSVGs = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.svg$/,
          loader: 'babel!svg-react'
        }
      ]
    }
  }
};

// Code minification -> PROD only!!!
exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

// Chunks up the bundles -> PROD only!!!
exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;
  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

// Removes the previous build folder
exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}
