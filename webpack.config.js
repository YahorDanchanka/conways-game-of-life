const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  entry: {
    index: path.resolve(__dirname, 'src/scripts/index.js')
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: { open: true },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/index.html'),
      chunks: ['index']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
}

module.exports = (env, argv) => {
  config.devtool = argv.mode === 'development' ? 'eval-cheap-module-source-map' : false;

  if (argv.mode === 'production') {
    config.target = ['web', 'es5']
  }

  return config
}
