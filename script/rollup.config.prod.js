// const { uglify } = require('rollup-plugin-uglify');
const configList = require('./rollup.config');
const path = require('path');
const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

configList.map((config, index) => {

  config.output.sourcemap = false;
  // if (index === 0) {
  config.plugins = [
    ...config.plugins,
    ...[
      // uglify()
    ]
  ]
// }
  return config;
})
console.log(configList);
module.exports = configList;