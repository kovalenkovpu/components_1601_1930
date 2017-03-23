"use strict";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "styles.css"
});

module.exports = {
  entry: {
    app: './components/app/app.js',
    styles: './components/app/app.scss'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
      }
    ]
  },
  plugins: [
        extractSass
    ]
};