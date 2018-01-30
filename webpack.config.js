var path = require('path')

module.exports = {
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js'
  }
}
