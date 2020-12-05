export interface WaterfallParams {
    /**
     * 此参数主要定义每列的宽度
     */
    columns: Array<{
        width: number;
        height: number;
    }>;
}
declare class Waterfall {
    columns: Array<Record<string, any>>;
    formatedData: Array<{
        width: number;
        height: number;
    }>;
    constructor(options: WaterfallParams);
    private initWaterfall;
    /**
     * 向瀑布流中补充数据
     * @param {Boolean} extraVal 瀑布流的卡片中是否有出图片之外的内容
     * @param {Array<resource>}  resources
     */
    addResources(resources: Array<{
        width: number;
        height: number;
        cardHeight?: number;
        computedHeight?: number;
    }>, extraVal: number): Promise<any[][]>;
    /**
     * 最重要的地方
     *获取当前数据中填充最短的列
     * 返回最短列的索引
     */
    private getShortestColumn;
}
export default Waterfall;
