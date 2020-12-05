const path = require('path')
const projectRootDir = path.resolve(__dirname);
const resolve = p => path.resolve(__dirname, '..', p)

module.exports = {
    entries: [
    {find:"*", replacement: resolve(".")},
    {find:"*/", replacement: resolve("/")},
    // {find:"@board", replacement: resolve("src/board")},
    // {find:"@board/", replacement: resolve("src/board/")},
    ]
}