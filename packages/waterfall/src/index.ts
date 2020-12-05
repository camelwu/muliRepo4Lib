export interface WaterfallParams {
  /**
   * 此参数主要定义每列的宽度
   */
  columns: Array<{ width: number; height: number }>;
}

class Waterfall {
  columns!: Array<Record<string, any>>;
  formatedData!: Array<{ width: number; height: number }>;
  constructor(options: WaterfallParams) {
    this.initWaterfall(options);
  }
  private initWaterfall(options: WaterfallParams) {
    this.columns = options.columns;
    this.formatedData = [];
    for (const column of options.columns) {
      this.formatedData.push({
        width: column.width,
        height: 0
      });
    }
  }
  /**
   * 向瀑布流中补充数据
   * @param {Boolean} extraVal 瀑布流的卡片中是否有出图片之外的内容
   * @param {Array<resource>}  resources
   */
  async addResources(
    resources: Array<{
      width: number;
      height: number;
      cardHeight?: number;
      computedHeight?: number;
    }>,
    extraVal: number
  ) {
    const newResourcesArray: Array<Array<any>> = [];
    this.columns.map(() => {
      newResourcesArray.push([]);
    });
    for (const resource of resources) {
      // 宽高比使用服务端返回的宽高计算，没有的话为1:1
      const width = Number(resource.width) || 100;
      const height = Number(resource.height) || 100;
      // 获取最短列的索引
      const index = this.getShortestColumn();
      // 卡片宽度
      const imageWidth = this.formatedData[index].width;
      // 附加的卡片高度自行配置
      const extraHeight = extraVal ? extraVal : 0;
      // 获取卡片高度
      const cardHeight = imageWidth / (width / height) + extraHeight;
      // 当前列总高度
      this.formatedData[index].height += cardHeight;
      // 返回卡片高度
      resource.cardHeight = cardHeight;
      // 返回图片高度
      resource.computedHeight = cardHeight - extraVal;
      // 返回当前列的数组
      newResourcesArray[index].push(resource);
    }
    return newResourcesArray;
  }
  /**
   * 最重要的地方
   *获取当前数据中填充最短的列
   * 返回最短列的索引
   */
  private getShortestColumn() {
    let minHeight = Infinity;
    let minHeightColumnIndex = 0;
    for (let index = this.formatedData.length - 1; index > -1; index--) {
      //从后往前遍历，防止每列的高度相同的情况
      const height = this.formatedData[index].height;
      if (height <= minHeight) {
        minHeightColumnIndex = index;
        minHeight = height;
      }
    }
    return minHeightColumnIndex;
  }
}

export default Waterfall;
