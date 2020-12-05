import { EventEmitter } from 'events';
import CONNECT_STATE from './config/CONNECT_STATE';

abstract class BaseIM extends EventEmitter {
    public connectState: CONNECT_STATE;

    constructor(...args: []) {
        super(...args);
        this.connectState = CONNECT_STATE.DEFAULT;
    }

    /**
     *
     * 初始化当前实例
     *
     * @memberof BaseIM
     */
    init() {
        console.log('not extends BaseIM method init: ');
    }

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
    joinChatRoom(opts: Partial<{ success: () => {}; error: () => {} }>) {
        console.log('not extends BaseIM method joinChatRoom: ', opts);
    }

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
    // eslint-disable-next-line no-unused-vars
    leaveChatRoom(opts: Partial<{ success: () => {}; error: () => {} }>) {
        console.log('not extends BaseIM method leaveChatRoom: ', opts);
    }

    /**
     *
     * 链接到IM
     *
     * @param { String } token 声网是userId, 融云是用户的token
     *
     *
     * @memberof BaseIM
     */
    // eslint-disable-next-line no-unused-vars
    connect(userId?: string, token?: string) {
        console.log('not extends BaseIM method connect: ', userId, token);
    }

    /**
     *
     * 重新链接到IM
     *
     *
     *
     * @memberof BaseIM
     */
    reconnect() {}

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
    // eslint-disable-next-line no-unused-vars
    sendGroup(options: Partial<{ groupId: string }>) {
        console.log('not extends BaseIM method sendGroup: ', options);
        return Promise.resolve();
    }

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
    // eslint-disable-next-line no-unused-vars
    sendChat(options: Partial<{ groupId: string }>) {
        console.log('not extends BaseIM method sendChat: ', options);
        return Promise.resolve();
    }

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
    // eslint-disable-next-line no-unused-vars
    send(
        options: Partial<{
            targetId: string;
            callback: Partial<{ onSuccess: () => {}; onError: () => {} }>;
        }>,
    ) {
        console.log('not extends BaseIM method send: ', options);
    }

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
    // eslint-disable-next-line no-unused-vars
    sendGroupMsg(
        options: Partial<{
            groupId: string;
            callback: Partial<{ onSuccess: () => {}; onError: () => {} }>;
        }>,
    ) {
        console.log('not extends BaseIM method sendGroupMsg: ', options);
    }

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
    // eslint-disable-next-line no-unused-vars
    sendChatMsg(
        options: Partial<{
            groupId: string;
            callback: Partial<{ onSuccess: () => {}; onError: () => {} }>;
        }>,
    ) {
        console.log('not extends BaseIM method sendChatMsg: ', options);
    }

    /**
     * 销毁im
     *
     *
     * @memberof BaseIM
     */
    destory() {
        console.log('not extends BaseIM method destory: ');
    }
}

export default BaseIM;
