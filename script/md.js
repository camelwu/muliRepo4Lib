const jsdoc2md = require('jsdoc-to-markdown');
const fs = require("fs");
const docs = jsdoc2md.renderSync({ files: 'lib/utils/index.js' });

try {
  fs.writeFileSync('./docs/utils.md', docs);
} catch (error) {
  // 文件夹不存在，或者权限错误
  console.log(error);
}