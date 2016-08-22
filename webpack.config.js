const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const webpack = require('webpack');

const paths = {
  app: path.join(__dirname, "app/src"),
  build: path.join(__dirname, "build"),
  style: [
    path.join(__dirname, "node_modules", "bootstrap/dist/css/bootstrap.css"),
  ],
};
const pkg = require('./package.json');
const common = {
  entry: {
    app: paths.app,
    style: paths.style
  },
  output: {
    path: paths.build,
    filename: '[name].js',
    // Modify the name of the generated sourcemap file.
    // You can use [file], [id], and [hash] replacements here.
    // The default option is enough for most use cases.
    sourceMapFilename: '[file].map', // Default

    // This is the sourcemap filename template. It's default format
    // depends on the devtool option used. You don't need to modify this
    // often.
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      // Enable caching for improved performance during development
      // It uses default OS directory by default. If you need
      // something more custom, pass a path to it.
      // I.e., babel?cacheDirectory=<path>
      loaders: ['babel?cacheDirectory'],
      // Parse only app files! Without this it will go through
      // the entire project. In addition to being slow,
      // that will most likely result in an error.
      include: paths.app
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 50000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]'
      }
    }, {
      test: /\.ttf$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot$/,
      loader: "file"
    }, {
      test: /\.svg$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
      test: /\.png|jpg|jpeg|gif$/,
      loader: 'file?name=[path][name].[hash].[ext]',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'raw',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Webpack React Demo"
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   // Match assets just like for loaders.
    //   test: string | RegExp | Array,
    //   include: string | RegExp | Array,

    //   // `exclude` matches file names, not package names!
    //   exclude: string | RegExp | Array,

    //   // If filename is set, output to this file.
    //   // See `sourceMapFileName`.
    //   filename: string,

    //   // This line is appended to the original asset processed. For
    //   // instance '[url]' would get replaced with an url to the
    //   // sourcemap.
    //   append: false | string,

    //   // See `devtoolModuleFilenameTemplate` for specifics.
    //   moduleFilenameTemplate: string,
    //   fallbackModuleFilenameTemplate: string,

    //   module: bool, // If false, separate sourcemaps aren't generated.
    //   columns: bool, // If false, column mappings are ignored.

    //   // Use simpler line to line mappings for the matched modules.
    //   lineToLine: bool | { test, include, exclude }
    // })
  ],
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

const parts = require("./config/parts");

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(
      common, {
        devtool: 'source-map',
        output: {
          path: paths.build,
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(paths.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      // parts.minify(),
      parts.extractCSS(paths.style),
      parts.purifyCSS([paths.app])
    );
    break;
  default:
    config = merge(
      common, {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(paths.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );

}

module.exports = validate(config, {
  quiet: true
});