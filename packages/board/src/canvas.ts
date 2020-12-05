// import { ICanvas } from "./interface";
import { fabric } from "fabric";
import { getEle, getUId } from "@msb/utils";
// const fCanvas = fabric.Canvas;
// console.log("fabric", fabric);
type Option = {};

/**
 * 增强canvas的能力
 * 支持 选择器
 * 删除对 ID的支持
 * 增强背景类型
 * 支持销毁实例
 * TODO: 需要验证自定义类对cache的影响
 * TODO: 需要根据实际情况，完善方法
 * 
 */

class Canvas extends fabric.Canvas {
  public options: any;
  public cvsId: String;
  viewportTransform: any;
  freeDrawingBrush: any;
  clipPath: any;
  ele: Element | string;
  constructor(ele , options: Option) {
    super(getEle(ele), options);
    this.options = {
      ...options
    };
    this.ele = ele;
    this.cvsId = getUId();
  }

  destory(): void {
    this.dispose();
  }
}

export default Canvas;
