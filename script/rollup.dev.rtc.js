const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');

const PORT = 3000;
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};
const devSite = `http://127.0.0.1:${PORT}`;
const devPath = path.join('example', 'rtc.html');
const devUrl = `${devSite}/${devPath}`;

setTimeout(()=>{
  console.log(`[dev]: ${devUrl}`)
}, 1000);

let config = configList[6];
// configList.map((config, index) => {

  config.output.sourcemap = true;
  // 不同的入口，做不同的工作
  // if (index === 1) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: [resolveFile('')]
        })
      ]
    ]
  // }

  // return config;
// })
console.table(config);

module.exports = config;