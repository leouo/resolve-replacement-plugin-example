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

const baseAssetsFolder = 'src';
const srcPath = path.resolve(__dirname, '..', baseAssetsFolder)
const distPath = path.resolve(__dirname, '..', 'dist')
const subDirectories = getDirectories(srcPath)

const configs = (subDirectories || []).length
  ? subDirectories.map((item) => ({
    name: item,
    entry: './src/index.js',
    output: {
      path: distPath,
      filename: `${item}.js`
    },
    resolve: {
      plugins: [
          new ResolveReplacementPlugin({
              sourceDirectory: srcPath,
              targetDirectory: item
          })
      ]
    }
  }))
  : {
    entry: './src/index.js',
    output: {
      path: distPath,
      filename: 'index.js'
    }
  };

module.exports = configs
