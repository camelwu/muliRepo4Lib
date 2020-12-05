# `@mrjl/board`

Board 是整个程序入口，用来初始化程序，给外部提供修改配置的接口，对外部暴露项目状态。

项目中只用来，初始化项目，参数校验，对外部提供接口，对外部暴露状态。第一版实现，只提供接口，不对外提供控制组件等相关的UI

其中`MouseDraw`
 * 鼠标绘制，单独出来是想确保在 Board 初始化阶段可以很容易的配置进行，比如当开发者
 * 不想使用鼠标绘制的时候，可以很容易的移除，如果混合在Board内的话对这些操作就会很麻烦

其中`Canvas`
 * 增强canvas的能力
 * 支持 选择器
 * 删除对 ID的支持
 * 增强背景类型
 * 支持销毁实例
> TODO: 需要验证自定义类对cache的影响
> TODO: 需要根据实际情况，完善方法
> TODO: description

## Usage

```
const board = require('@mrjl/board');

// TODO: DEMONSTRATE API
```
