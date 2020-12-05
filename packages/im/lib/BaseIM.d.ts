import { EventEmitter } from 'events';
import CONNECT_STATE from './config/CONNECT_STATE';
declare abstract class BaseIM extends EventEmitter {
    connectState: CONNECT_STATE;
    constructor(...args: []);
    /**
     *
     * 初始化当前实例
     *
     * @memberof BaseIM
     */
    init(): void;
    /**
     *
     * 加入聊天室
     *
     * @param { Object } opts
     * opts: {
     *   success: () => {}, // 成功后的回调
     *   error: () => {}, // 失败后的回调
     * }
     *
     * @memberof BaseIM
     */
    joinChatRoom(opts: Partial<{
        success: () => {};
        error: () => {};
    }>): void;
    /**
     *
     * 退出聊天室聊天室
     *
     * @param { Object } opts
     * opts: {
     *   success: () => {}, // 成功后的回调
     *   error: () => {}, // 失败后的回调
     * }
     *
     * @memberof BaseIM
     */
    leaveChatRoom(opts: Partial<{
        success: () => {};
        error: () => {};
    }>): void;
    /**
     *
     * 链接到IM
     *
     * @param { String } token 声网是userId, 融云是用户的token
     *
     *
     * @memberof BaseIM
     */
    connect(userId?: string, token?: string): void;
    /**
     *
     * 重新链接到IM
     *
     *
     *
     * @memberof BaseIM
     */
    reconnect(): void;
    /**
     * 直接发送群组消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '', // 要发送的群id
     *   content: {}, // 需要发送的内容 (json)
     * }
     *
     * @returns Promise
     * @memberof BaseIM
     */
    sendGroup(options: Partial<{
        groupId: string;
    }>): Promise<void>;
    /**
     * 直接发送聊天室消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '', // 要发送的群id
     *   content: {}, // 需要发送的内容 (json)
     * }
     *
     * @returns Promise
     * @memberof BaseIM
     */
    sendChat(options: Partial<{
        groupId: string;
    }>): Promise<void>;
    /**
     * 使用队列，发送消息
     *
     * @param {Object} options
     *
     * options: {
     *   targetId: '', // 发送的目标
     *   conversationType: // 发送的类型:群组、单聊、聊天室
     *   msg: {}, // 发送的消息类型
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    send(options: Partial<{
        targetId: string;
        callback: Partial<{
            onSuccess: () => {};
            onError: () => {};
        }>;
    }>): void;
    /**
     * 使用队列，发送群组消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '',
     *   content: {},
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    sendGroupMsg(options: Partial<{
        groupId: string;
        callback: Partial<{
            onSuccess: () => {};
            onError: () => {};
        }>;
    }>): void;
    /**
     * 使用队列，发送聊天室消息
     *
     * @param {Object} options
     *
     * options: {
     *   groupId: '',
     *   content: {},
     *   callback: {
     *     onSuccess: () => {}, // 发送成功的回调
     *     onError: () => {}, // 发送失败的回调
     *   },
     * }
     *
     * @memberof BaseIM
     */
    sendChatMsg(options: Partial<{
        groupId: string;
        callback: Partial<{
            onSuccess: () => {};
            onError: () => {};
        }>;
    }>): void;
    /**
     * 销毁im
     *
     *
     * @memberof BaseIM
     */
    destory(): void;
}
export default BaseIM;
