## Constants

<dl>
<dt><a href="#platform">platform</a></dt>
<dd><p>系统信息判断获取</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#arrayEqual">arrayEqual(arr1, arr2)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断两个数组是否相等</p>
</dd>
<dt><a href="#hasClass">hasClass(ele, cls)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断元素是否有某个class</p>
</dd>
<dt><a href="#addClass">addClass(ele, cls)</a></dt>
<dd><p>为元素添加class</p>
</dd>
<dt><a href="#removeClass">removeClass(ele, cls)</a></dt>
<dd><p>为元素移除class</p>
</dd>
<dt><a href="#getCookie">getCookie(name)</a> ⇒ <code>String</code></dt>
<dd><p>根据name读取cookie</p>
</dd>
<dt><a href="#removeCookie">removeCookie(name)</a></dt>
<dd><p>根据name删除cookie</p>
</dd>
<dt><a href="#setCookie">setCookie(name, value, days)</a></dt>
<dd><p>设置Cookie</p>
</dd>
<dt><a href="#getExplore">getExplore()</a> ⇒ <code>String</code></dt>
<dd><p>获取浏览器类型和版本</p>
</dd>
<dt><a href="#getOS">getOS()</a> ⇒ <code>String</code></dt>
<dd><p>获取操作系统类型</p>
</dd>
<dt><a href="#getUId">getUId()</a></dt>
<dd><p>生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险</p>
</dd>
<dt><a href="#formatPos">formatPos(ele)</a> ⇒ <code>Object</code></dt>
<dd><p>根据当前选择器获取cavase元素</p>
</dd>
<dt><a href="#now">now()</a> ⇒ <code>Number</code></dt>
<dd><p>获取当前时间</p>
</dd>
<dt><a href="#debounce">debounce(func, wait, immediate)</a> ⇒ <code>function</code></dt>
<dd><p>函数防抖
与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。</p>
</dd>
<dt><a href="#getEle">getEle(ele)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>获取元素</p>
</dd>
<dt><a href="#getScrollTop">getScrollTop()</a> ⇒ <code>Number</code></dt>
<dd><p>获取滚动条距顶部的距离</p>
</dd>
<dt><a href="#offset">offset(ele)</a> ⇒ <code>Object</code></dt>
<dd><p>获取一个元素的距离文档(document)的位置，类似jQ中的offset()</p>
</dd>
<dt><a href="#setScrollTop">setScrollTop(value)</a></dt>
<dd><p>设置滚动条距顶部的距离</p>
</dd>
<dt><a href="#scrollTo">scrollTo(to, duration)</a></dt>
<dd><p>在${duration}时间内，滚动条平滑滚动到${to}指定位置</p>
</dd>
<dt><a href="#windowResize">windowResize(downCb, upCb)</a></dt>
<dd><p>H5软键盘缩回、弹起回调
当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化</p>
</dd>
<dt><a href="#throttle">throttle(func, wait, options)</a> ⇒ <code>function</code></dt>
<dd><p>函数节流。
适用于限制<code>resize</code>和<code>scroll</code>等函数的调用频率</p>
</dd>
<dt><a href="#getKeyName">getKeyName(keycode)</a> ⇒ <code>String</code></dt>
<dd><p>根据keycode获得键名</p>
</dd>
<dt><a href="#deepClone">deepClone(values)</a> ⇒ <code>Any</code></dt>
<dd><p>深拷贝，支持常见类型</p>
</dd>
<dt><a href="#isEmptyObject">isEmptyObject(obj)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断<code>obj</code>是否为空</p>
</dd>
<dt><a href="#randomColor">randomColor()</a> ⇒ <code>String</code></dt>
<dd><p>随机生成颜色</p>
</dd>
<dt><a href="#randomNum">randomNum(min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>生成指定范围[min, max]的随机数</p>
</dd>
<dt><a href="#isColor">isColor(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为16进制颜色，rgb 或 rgba</p>
</dd>
<dt><a href="#isEmail">isEmail(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为邮箱地址</p>
</dd>
<dt><a href="#isIdCard">isIdCard(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为身份证号</p>
</dd>
<dt><a href="#isNumber">isNumber(obj)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为数字</p>
</dd>
<dt><a href="#isPhoneNum">isPhoneNum(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为手机号</p>
</dd>
<dt><a href="#isUrl">isUrl(str)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为URL地址</p>
</dd>
<dt><a href="#digitUppercase">digitUppercase(n)</a> ⇒ <code>String</code></dt>
<dd><p>现金额转大写</p>
</dd>
<dt><a href="#isSupportWebP">isSupportWebP()</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断浏览器是否支持webP格式图片</p>
</dd>
<dt><a href="#formatPassTime">formatPassTime(startTime)</a> ⇒ <code>String</code></dt>
<dd><p>格式化${startTime}距现在的已过时间</p>
</dd>
<dt><a href="#formatRemainTime">formatRemainTime(endTime)</a> ⇒ <code>String</code></dt>
<dd><p>格式化现在距${endTime}的剩余时间</p>
</dd>
<dt><a href="#isLeapYear">isLeapYear(year)</a> ⇒ <code>Boolean</code></dt>
<dd><p>是否为闰年</p>
</dd>
<dt><a href="#isSameDay">isSameDay(date1, date2)</a> ⇒ <code>Boolean</code></dt>
<dd><p>判断是否为同一天</p>
</dd>
<dt><a href="#monthDays">monthDays(time)</a> ⇒ <code>Number</code></dt>
<dd><p>获取指定日期月份的总天数</p>
</dd>
<dt><a href="#timeLeft">timeLeft(startTime, endTime)</a> ⇒ <code>Object</code></dt>
<dd><p>${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0</p>
</dd>
<dt><a href="#parseQuery">parseQuery(url)</a> ⇒ <code>Object</code></dt>
<dd><p>url参数转对象</p>
</dd>
<dt><a href="#stringfyQueryString">stringfyQueryString(obj)</a> ⇒ <code>String</code></dt>
<dd><p>对象序列化</p>
</dd>
<dt><a href="#convertBase64UrlToBlob">convertBase64UrlToBlob(urlData)</a></dt>
<dd><p>base64转blob</p>
</dd>
<dt><a href="#getUUID">getUUID()</a> ⇒ <code>String</code></dt>
<dd><p>获取UUID</p>
</dd>
<dt><a href="#getBrowser">getBrowser()</a> ⇒ <code>Object</code> | <code>String</code></dt>
<dd><p>获取浏览器信息</p>
</dd>
<dt><a href="#checkOS">checkOS()</a> ⇒ <code>String</code></dt>
<dd><p>获取系统名称和版本号</p>
</dd>
<dt><a href="#parse">parse(objString)</a> ⇒ <code>Object</code> | <code>Json</code></dt>
<dd><p>字符串转对象</p>
</dd>
<dt><a href="#getUserId">getUserId()</a> ⇒ <code>String</code></dt>
<dd><p>从sessionStorage获取UserId，如无根据ISO时间戳生成</p>
</dd>
<dt><a href="#getMacOsVersion">getMacOsVersion()</a> ⇒ <code>String</code></dt>
<dd><p>获取Mac系统版本</p>
</dd>
<dt><a href="#buildScriptTag">buildScriptTag()</a> ⇒ <code>HTMLScriptElement</code></dt>
<dd><p>给要加载的js文件添加属性，比如Tag</p>
</dd>
<dt><a href="#loadScript">loadScript()</a></dt>
<dd><p>异步加载script</p>
</dd>
</dl>

<a name="platform"></a>

## platform
系统信息判断获取

**Kind**: global constant  

* [platform](#platform)
    * [.mobile](#platform.mobile)
    * [.ios](#platform.ios)
    * [.android](#platform.android)
    * [.weixinwebview](#platform.weixinwebview)
    * [.miniprogram](#platform.miniprogram)
    * [.msb1v1app](#platform.msb1v1app)

<a name="platform.mobile"></a>

### platform.mobile
是否为mobile

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="platform.ios"></a>

### platform.ios
是否为ios

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="platform.android"></a>

### platform.android
是否为android

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="platform.weixinwebview"></a>

### platform.weixinwebview
是否为微信webview

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="platform.miniprogram"></a>

### platform.miniprogram
是否为微信小程序

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="platform.msb1v1app"></a>

### platform.msb1v1app
是否为美术宝一对一app

**Kind**: static property of [<code>platform</code>](#platform)  
<a name="arrayEqual"></a>

## arrayEqual(arr1, arr2) ⇒ <code>Boolean</code>
判断两个数组是否相等

**Kind**: global function  

| Param | Type |
| --- | --- |
| arr1 | <code>Array</code> | 
| arr2 | <code>Array</code> | 

<a name="hasClass"></a>

## hasClass(ele, cls) ⇒ <code>Boolean</code>
判断元素是否有某个class

**Kind**: global function  

| Param | Type |
| --- | --- |
| ele | <code>HTMLElement</code> | 
| cls | <code>String</code> | 

<a name="addClass"></a>

## addClass(ele, cls)
为元素添加class

**Kind**: global function  

| Param | Type |
| --- | --- |
| ele | <code>HTMLElement</code> | 
| cls | <code>String</code> | 

<a name="removeClass"></a>

## removeClass(ele, cls)
为元素移除class

**Kind**: global function  

| Param | Type |
| --- | --- |
| ele | <code>HTMLElement</code> | 
| cls | <code>String</code> | 

<a name="getCookie"></a>

## getCookie(name) ⇒ <code>String</code>
根据name读取cookie

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="removeCookie"></a>

## removeCookie(name)
根据name删除cookie

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="setCookie"></a>

## setCookie(name, value, days)
设置Cookie

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 
| days | <code>Number</code> | 

<a name="getExplore"></a>

## getExplore() ⇒ <code>String</code>
获取浏览器类型和版本

**Kind**: global function  
<a name="getOS"></a>

## getOS() ⇒ <code>String</code>
获取操作系统类型

**Kind**: global function  
<a name="getUId"></a>

## getUId()
生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险

**Kind**: global function  
<a name="formatPos"></a>

## formatPos(ele) ⇒ <code>Object</code>
根据当前选择器获取cavase元素

**Kind**: global function  
**Returns**: <code>Object</code> - {x: Num, y: Num}  

| Param | Type |
| --- | --- |
| ele | <code>Number</code> | 

<a name="now"></a>

## now() ⇒ <code>Number</code>
获取当前时间

**Kind**: global function  
**Returns**: <code>Number</code> - 时间戳  
<a name="debounce"></a>

## debounce(func, wait, immediate) ⇒ <code>function</code>
函数防抖
与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。

**Kind**: global function  
**Returns**: <code>function</code> - 新的防抖函数。  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | 延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，                                  执行去抖动功能时，，调用`callback`。 |
| wait | <code>Number</code> | 0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。 |
| immediate | <code>Boolean</code> | 可选，默认为false。                                  如果为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。                                  如果为true，回调函数则在第一次调用return的防抖函数时直接执行 |

**Example**  
```js
适用场景：如在线编辑的自动存储防抖。
```
<a name="getEle"></a>

## getEle(ele) ⇒ <code>HTMLElement</code>
获取元素

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - getEle(ele: any): Element;
getEle(ele: string): HTMLElement;
getEle(ele: "canvas"): HTMLCanvasElement;  

| Param | Type |
| --- | --- |
| ele | <code>string</code> \| <code>HTMLElement</code> | 

<a name="getScrollTop"></a>

## getScrollTop() ⇒ <code>Number</code>
获取滚动条距顶部的距离

**Kind**: global function  
<a name="offset"></a>

## offset(ele) ⇒ <code>Object</code>
获取一个元素的距离文档(document)的位置，类似jQ中的offset()

**Kind**: global function  

| Param | Type |
| --- | --- |
| ele | <code>HTMLElement</code> | 

<a name="setScrollTop"></a>

## setScrollTop(value)
设置滚动条距顶部的距离

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>Number</code> | 

<a name="scrollTo"></a>

## scrollTo(to, duration)
在${duration}时间内，滚动条平滑滚动到${to}指定位置

**Kind**: global function  

| Param | Type |
| --- | --- |
| to | <code>Number</code> | 
| duration | <code>Number</code> | 

<a name="windowResize"></a>

## windowResize(downCb, upCb)
H5软键盘缩回、弹起回调
当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| downCb | <code>function</code> | 当软键盘弹起后，缩回的回调 |
| upCb | <code>function</code> | 当软键盘弹起的回调 |

<a name="throttle"></a>

## throttle(func, wait, options) ⇒ <code>function</code>
函数节流。
适用于限制`resize`和`scroll`等函数的调用频率

**Kind**: global function  
**Returns**: <code>function</code> - 新的节流函数  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | 延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，                                    执行去节流功能时，调用`callback`。 |
| wait | <code>Number</code> | 0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。 |
| options | <code>Object</code> | 可选，默认为false。                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位） |

<a name="getKeyName"></a>

## getKeyName(keycode) ⇒ <code>String</code>
根据keycode获得键名

**Kind**: global function  

| Param | Type |
| --- | --- |
| keycode | <code>Number</code> | 

<a name="deepClone"></a>

## deepClone(values) ⇒ <code>Any</code>
深拷贝，支持常见类型

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Any</code> | 

<a name="isEmptyObject"></a>

## isEmptyObject(obj) ⇒ <code>Boolean</code>
判断`obj`是否为空

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="randomColor"></a>

## randomColor() ⇒ <code>String</code>
随机生成颜色

**Kind**: global function  
<a name="randomNum"></a>

## randomNum(min, max) ⇒ <code>Number</code>
生成指定范围[min, max]的随机数

**Kind**: global function  

| Param | Type |
| --- | --- |
| min | <code>Number</code> | 
| max | <code>Number</code> | 

<a name="isColor"></a>

## isColor(str) ⇒ <code>Boolean</code>
判断是否为16进制颜色，rgb 或 rgba

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="isEmail"></a>

## isEmail(str) ⇒ <code>Boolean</code>
判断是否为邮箱地址

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="isIdCard"></a>

## isIdCard(str) ⇒ <code>Boolean</code>
判断是否为身份证号

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> \| <code>Number</code> | 

<a name="isNumber"></a>

## isNumber(obj) ⇒ <code>Boolean</code>
判断是否为数字

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>Any</code> | 

<a name="isPhoneNum"></a>

## isPhoneNum(str) ⇒ <code>Boolean</code>
判断是否为手机号

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> \| <code>Number</code> | 

<a name="isUrl"></a>

## isUrl(str) ⇒ <code>Boolean</code>
判断是否为URL地址

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="digitUppercase"></a>

## digitUppercase(n) ⇒ <code>String</code>
现金额转大写

**Kind**: global function  

| Param | Type |
| --- | --- |
| n | <code>Number</code> | 

<a name="isSupportWebP"></a>

## isSupportWebP() ⇒ <code>Boolean</code>
判断浏览器是否支持webP格式图片

**Kind**: global function  
<a name="formatPassTime"></a>

## formatPassTime(startTime) ⇒ <code>String</code>
格式化${startTime}距现在的已过时间

**Kind**: global function  

| Param | Type |
| --- | --- |
| startTime | <code>String</code> | 

<a name="formatRemainTime"></a>

## formatRemainTime(endTime) ⇒ <code>String</code>
格式化现在距${endTime}的剩余时间

**Kind**: global function  

| Param | Type |
| --- | --- |
| endTime | <code>Date</code> | 

<a name="isLeapYear"></a>

## isLeapYear(year) ⇒ <code>Boolean</code>
是否为闰年

**Kind**: global function  

| Param | Type |
| --- | --- |
| year | <code>Number</code> | 

<a name="isSameDay"></a>

## isSameDay(date1, date2) ⇒ <code>Boolean</code>
判断是否为同一天

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| date1 | <code>Date</code> |  |
| date2 | <code>Date</code> | 可选／默认值：当天 |

<a name="monthDays"></a>

## monthDays(time) ⇒ <code>Number</code>
获取指定日期月份的总天数

**Kind**: global function  

| Param | Type |
| --- | --- |
| time | <code>Date</code> | 

<a name="timeLeft"></a>

## timeLeft(startTime, endTime) ⇒ <code>Object</code>
${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0

**Kind**: global function  
**Returns**: <code>Object</code> - { d, h, m, s } 天 时 分 秒  

| Param | Type |
| --- | --- |
| startTime | <code>Date</code> \| <code>String</code> | 
| endTime | <code>Date</code> \| <code>String</code> | 

<a name="parseQuery"></a>

## parseQuery(url) ⇒ <code>Object</code>
url参数转对象

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | default: window.location.href |

<a name="stringfyQueryString"></a>

## stringfyQueryString(obj) ⇒ <code>String</code>
对象序列化

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="convertBase64UrlToBlob"></a>

## convertBase64UrlToBlob(urlData)
base64转blob

**Kind**: global function  

| Param | Description |
| --- | --- |
| urlData | base64编码 |

<a name="getUUID"></a>

## getUUID() ⇒ <code>String</code>
获取UUID

**Kind**: global function  
<a name="getBrowser"></a>

## getBrowser() ⇒ <code>Object</code> \| <code>String</code>
获取浏览器信息

**Kind**: global function  
**Returns**: <code>Object</code> - obj<code>String</code>  
<a name="checkOS"></a>

## checkOS() ⇒ <code>String</code>
获取系统名称和版本号

**Kind**: global function  
**Returns**: <code>String</code> - example: mac68k win7  
<a name="parse"></a>

## parse(objString) ⇒ <code>Object</code> \| <code>Json</code>
字符串转对象

**Kind**: global function  

| Param | Type |
| --- | --- |
| objString | <code>Any</code> | 

<a name="getUserId"></a>

## getUserId() ⇒ <code>String</code>
从sessionStorage获取UserId，如无根据ISO时间戳生成

**Kind**: global function  
<a name="getMacOsVersion"></a>

## getMacOsVersion() ⇒ <code>String</code>
获取Mac系统版本

**Kind**: global function  
<a name="buildScriptTag"></a>

## buildScriptTag() ⇒ <code>HTMLScriptElement</code>
给要加载的js文件添加属性，比如Tag

**Kind**: global function  
<a name="loadScript"></a>

## loadScript()
异步加载script

**Kind**: global function  
