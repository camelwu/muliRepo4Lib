# msb-library

🍣`MSB`一站式汇总js库  

通过`Lerna`管理整体架构、changelog、publish，`Rollup`进行打包，`TypeDoc`进行文档化。

### Library List

|                                       |                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| [board](packages/board)               | 白板                                                                 |
| [bridge](packages/bridge)         | 美术宝C端和浏览器桥程序                                                           |
| [im](packages/im)         | 美术宝IM-sdk，包含容云、声网                                                             |
| [jsBridge](packages/jsbridge)                   | 美术宝js-bridge，给微信、小程序提供桥的程序库                          |
| [rtc](packages/rtc)                 | 美术宝web-rtc，接入声网、腾讯和即构三家的sdk封装程序库                                                |
| [statistics](packages/statistics)               | 美术宝第三方统计程序库，包含：baidu、GA、gdt、toutiao、youmeng、mta                                            |
| [upload](packages/upload)             | 美术宝微信、小程序上传程序库         |
| [utils](packages/utils)                 | 美术宝实用程序库         |
| [vx](packages/wechat)             | 美术宝微信相关jssdk程序库，包含config, login, pay(wechat&miniProgram), share        |
| [waterfall](packages/waterfall)   | 美术宝瀑布流程序库        |
| [zhichi](packages/zhichi) | 美术宝平台支持库          |
|                                       |                                                                                           |

## 架构说明
本存储库是[monorepo](https://en.wikipedia.org/wiki/Monorepo) 结构，它利用[Lerna](https://github.com/lerna/lerna#readme) 进行依赖项管理。

建议先全局安装 `lerna`:

```console
$ npm install lerna -g
## or
$ yarn add lerna -g
```

### 目录结构

所有的js库都存在 `/packages` 目录中，如下：
```console
## Root
├── packages
|   ├── board
|   |   ├── package.json
|   ├── im
|   |   ├── package.json
├── lerna.json
├── package.json
```

#### Init 初始化：

```console
$ lerna init
```

#### Create 创建npm包：

```console
## <package>
$ lerna create @msb/cli
$ lerna create @msb/cli-shared-utils
```
或者，直接在`packages`目录里直接增加目录，但需要自己定义好`package.json` 完整的配置如下：
```json
{
  "name": "@msb/utils",
  "version": "0.1.0",
  "description": "美术宝实用程序库",
  "keywords": [
    "msb",
    "utils"
  ],
  "author": "wusongbo <wusongbo@meishubao.com>",
  "homepage": "http://gitlab.meishubao.com/msb-fe/msb-library",
  "license": "ISC",
  "main": "lib/index.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib"
  ],
  "publishConfig": {
    "registry": "http://fusion.meishubao.com:9001/"
  },
  "repository": {
    "type": "git",
    "url": "http://gitlab.meishubao.com/msb-fe/msb-library.git"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1"
  }
}
```
> 其中`package`是包的名称，而`name`是插件的专有名称。 例如 name:`@msb/utils` 在packages里的目录package就是:`utils`。在add操作的时候一定要加`@msb/` 命名空间。就是要使用`name`

#### Add 增加模块依赖：

```console
## 为所有 package 增加 chalk 模块  
$ lerna add chalk
## 为@msb/cli-shared-utils 增加 semver 模块  
lerna add semver --scope @msb/cli-shared-utils
## 为 msb/cli 增加 @msb/cli-shared-utils 模块， 内部依赖
lerna add @msb/cli-shared-utils --scope @msb/cli
```
#### Bootstrap 安装依赖:
```console
$ lerna bootstrap
```
读取每个<package>的`package.json`，安装依赖，并且把跨项目的依赖链接在一起。比如说<cli-shared-utils>的packag.json中有：
```json
{
  "dependencies": {
    "react": "a.b.c",
    "cli": "d.e.f"
  }
}
```
执行`bootstrap`之后，相当于用npm/yarn安装了react并link了`cli`

#### Publishing 发布:

```console
## 全量发
$ lerna publish
## 根据git提交
$ lerna publish from-git
## 全量发
$ lerna publish from-package
```
1. 检查哪些项目应该被publish
2. 调整lerna.json中的版本号
3. 修改所有的package.json让它们只想正确的版本
4. 更新所有的依赖
5. 创建新的git commit和tag
6. publish

[其他publish操作](https://github.com/lerna/lerna/tree/master/commands/publish)

#### run 运行:
```console
$ lerna run <package>
```
就可以执行所有对应名字的`npm scripts`，还有一个方式是
```console
$ lerna exec --scope=<package>
```

## 参考资料
- [《Lerna.js英文官方文档》](https://github.com/lerna/lerna)
- [《rollup.js官方中文文档》](https://rollupjs.org/guide/zh)
- [《rollup.js官方英文文档》](https://rollupjs.org/guide/en)
- [https://github.com/rollup/rollup/wiki/Plugins](https://github.com/rollup/rollup/wiki/Plugins)
