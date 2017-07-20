const path = require('path')
const webpack = require('webpack')

const DEBUG = !process.argv.includes('-p');

module.exports = {
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'peephole.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      "node_modules"
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'transform-runtime'],
          cacheDirectory: true
        },
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
