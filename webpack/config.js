const ResolveReplacementPlugin = require('./resolve-replacement-plugin')
const path = require('path')
const { lstatSync, readdirSync } = require('fs')
const { join } = path

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
    .map(item => item.split('\\').pop())

const configs = getDirectories('src').map((item) => ({
  name: item,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: `${item}.js`
  },
  resolve: {
    plugins: [
        new ResolveReplacementPlugin({
            sourceDirectory: path.resolve(__dirname, '..', 'src'),
            targetDirectory: item
        })
    ]
  }
}));

module.exports = configs
