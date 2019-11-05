const path = require('path')
const ResolveReplacementPlugin = require('./resolve-replacement-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    plugins: [
        new ResolveReplacementPlugin({
            sourceDirectory: path.resolve(__dirname, '..', 'src'),
            targetDirectory: 'store_1'
        })
    ]
  }
}
