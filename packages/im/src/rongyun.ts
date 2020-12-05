import { EventEmitter } from 'events';

/* remove-start */
// import './dist/index';
import '../dist/protobuf-2.3.5.min.js';
import '../dist/RongEmoji-2.2.7.js';
import '../dist/RongIMLib-2.5.0.js';
/* remove-end */

import IM_TYPE from './config/IM_TYPE';

const { RongIMLib, RongIMClient } = window as any;
const RIMLIB = (window as any).RongIMLib || {};
// const RIMLIB = RongIMLib;

type Option = Partial<{
    appKey: string;
    isAutoConnect: boolean;
    isAutoReconnect: boolean;
    defaultToken: string;
    defaultGroupId: string;
    interval: number;
    reconnectConf: {
        auto: boolean;
        url: string;
        rate: number[];
    };
}>;

// 基于board，使用融云同步的画板
class RongYunClient extends EventEmitter {
    private opts: Option;

    private appKey: string;

    private messageQuene: any[];

    private msgInterval: number | null;

    private connectionState: number;

    public defaultGroupId?: string;

    public static messageType = {
        ...RIMLIB.MessageType,
        MSB_MSG: 'ArtSimpleMessage',
    };

    public static ConversationType = RIMLIB.ConversationType;

    public static __TYPE: number = IM_TYPE.RONGYUN;

    constructor(options) {
        super();
        this.opts = {
            appKey: '',
            isAutoConnect: false,
            isAutoReconnect: true,
            defaultToken: '',
            defaultGroupId: '',
            interval: 200,
            reconnectConf: {
                auto: true,
                // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
                url: 'http://cdn.ronghub.com/RongIMLib-2.2.6.min.js',
                // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
                rate: [100, 1000, 3000, 6000, 10000],
            },
            ...options,
        };
        if (!this.opts.appKey) {
            throw new Error('必须 配置 appkey');
        }
        this.appKey = this.opts.appKey;
        this.init();
        // 注册画板消息类型 一定要放在 初始化之后
        this.registerBoardMsgType();
        if (this.opts.isAutoConnect && this.opts.defaultToken) {
            this.connect(this.opts.defaultToken);
        }
        // if (this.opts.isAutoReconnect) {
        //     this.reconnect();
        // }
        this.messageQuene = [];
        this.msgInterval = null;
        this.connectionState = 0;
        this.defaultGroupId = this.opts.defaultGroupId;
    }

    get imType() {
        return RongYunClient.__TYPE;
    }

    init() {
        RongIMLib.RongIMClient.init(this.appKey);
        // eslint-disable-next-line no-underscore-dangle
        this._bindEvent();
    }

    _bindEvent() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: status => {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        this.connectionState = 1;
                        that.emit('n:connected', status);
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        this.connectionState = 2;
                        that.emit('n:connecting', status);
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        this.connectionState = 0;
                        that.emit('n:disconnected', status);
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        this.connectionState = 4;
                        that.emit('n:kickedOfflineByOtherClient', status);
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        this.connectionState = 5;
                        that.emit('n:domainIncorrect', status);
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        this.connectionState = 6;
                        that.emit('n:networkUnavailable', status);
                        if (that.opts.isAutoReconnect) {
                            that.reconnect();
                        }
                        break;
                    default:
                        that.emit('n:unknowStatus', status);
                }
            },
        });
        // 消息监听器
        // TODO: 添加对自定义类型消息的支持
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived(message) {
                that.emit('m:all', message);
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        that.emit('m:text', message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        that.emit('m:voice', message);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        that.emit('m:image', message);
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        that.emit('m:location', message);
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        that.emit('m:rich', message);
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        that.emit('m:n:info', message);
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        that.emit('m:n:contact', message);
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        that.emit('m:n:profile', message);
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        that.emit('m:n:command', message);
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        that.emit('m:command', message);
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        that.emit('m:unknown', message);
                        break;
                    case RongIMClient.MessageType[RongYunClient.messageType.MSB_MSG]:
                        that.emit('m:msb', message);
                        break;
                    default:
                        that.emit('m:nocatch', message);
                }
            },
        });
    }

    _connectError(errorCode) {
        let info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                info = 'appkey不正确';
                break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
            default:
                info = '未知错误';
        }
        return info;
    }

    joinChatRoom(opts) {
        const opt = {
            success: () => {},
            error: () => {},
            count: 50,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        RongIMClient.getInstance().joinChatRoom(chatRoomId, opt.count, {
            onSuccess(...args) {
                opt.success(...args);
            },
            onError(...args) {
                // 加入聊天室失败
                opt.error(...args);
            },
        });
    }

    leaveChatRoom(opts) {
        const opt = {
            success: () => {},
            error: () => {},
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        RongIMClient.getInstance().quitChatRoom(chatRoomId, {
            onSuccess(...args) {
                // 退出聊天室成功
                opt.success(...args);
            },
            onError(...args) {
                // 退出聊天室失败
                opt.error(...args);
            },
        });
    }

    getChatRoomInfo(opts) {
        const opt = {
            success: () => {},
            error: () => {},
            count: 20,
            order: RongIMLib.GetChatRoomType.REVERSE,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        // const count = 10; // 获取聊天室人数 （范围 0-20 ）
        // const order = RongIMLib.GetChatRoomType.REVERSE; // 排序方式
        RongIMClient.getInstance().getChatRoomInfo(chatRoomId, opt.count, opt.order, {
            onSuccess(...args) {
                // chatRoom => 聊天室信息
                // chatRoom.userInfos => 返回聊天室成员
                // chatRoom.userTotalNums => 当前聊天室总人数
                opt.success(...args);
            },
            onError(...args) {
                // 获取聊天室信息失败
                opt.error(...args);
            },
        });
    }

    connect(token) {
        if (!token) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        RongIMClient.connect(token, {
            onSuccess(userId) {
                that.emit('c:success', {
                    userId,
                    msg: '',
                });
            },
            onTokenIncorrect() {
                that.emit('c:failed', {
                    msg: 'token incorrect',
                });
            },
            onError(errorCode) {
                that.emit('c:error', {
                    code: errorCode,
                    // eslint-disable-next-line no-underscore-dangle
                    msg: that._connectError(errorCode),
                });
            },
        });
    }

    reconnect() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        RongIMClient.reconnect(
            {
                onSuccess(userId) {
                    this.connectionState = 1;
                    that.emit('rc:success', {
                        userId,
                    });
                },
                onTokenIncorrect() {
                    this.connectionState = 7;
                    that.emit('rc:failed', {
                        msg: 'token incorrect',
                    });
                },
                onError(errorCode) {
                    this.connectionState = 0;
                    that.emit('c:error', {
                        code: errorCode,
                        // eslint-disable-next-line no-underscore-dangle
                        msg: that._connectError(errorCode),
                    });
                },
            },
            this.opts.reconnectConf,
        );
    }

    // TODO: messageName、objectName、prototypes 支持自定义
    registerBoardMsgType() {
        const messageName = RongYunClient.messageType.MSB_MSG; // 消息名称
        const objectName = `s:msb`; // 消息内置名称，请按照此格式命名
        const isCounted = false; // 消息计数
        const isPersited = false; // 消息保存
        const mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited); // 消息是否保存是否计数，true true 计数且保存，false false 不计数不保存
        const prototypes = ['content']; // 消息类中的属性名
        RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
    }

    _doSend() {
        if (this.msgInterval) {
            return;
        }
        this.msgInterval = setInterval(() => {
            if (this.messageQuene.length < 1) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                return;
            }
            const msg = this.messageQuene.shift();
            RongIMClient.getInstance().sendMessage(
                msg.conversationType,
                msg.targetId,
                msg.msg,
                msg.callback,
            );
        }, this.opts.interval);
    }

    _sendMessage(msgInfo) {
        this.messageQuene.push({
            ...msgInfo,
        });
        // eslint-disable-next-line no-underscore-dangle
        this._doSend();
    }

    // 发送群组消息
    // 该方法已经废弃，请谨慎使用
    sendGroup(options) {
        const opts = {
            groupId: '',
            content: {},
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.GROUP; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            return Promise.reject(new Error('必须传入参数 groupId'));
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        return new Promise((pResolve, reject) => {
            RongIMClient.getInstance().sendMessage(conversationType, gid, msg, {
                onSuccess(message) {
                    pResolve(message);
                },
                onError(errorCode) {
                    reject(errorCode);
                },
            });
        });
    }

    sendChat(options) {
        const opts = {
            groupId: '',
            content: {},
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.CHATROOM; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            return Promise.reject(new Error('必须传入参数 groupId'));
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        return new Promise((pResolve, reject) => {
            RongIMClient.getInstance().sendMessage(conversationType, gid, msg, {
                onSuccess(message) {
                    pResolve(message);
                },
                onError(errorCode) {
                    reject(errorCode);
                },
            });
        });
    }

    // 发送消息
    send(options) {
        const opts = {
            targetId: '',
            conversationType: RongIMLib.ConversationType.PRIVATE,
            msg: {},
            callback: {
                onSuccess: () => {},
                onError: () => {},
            },
            ...options,
        };
        // eslint-disable-next-line no-underscore-dangle
        this._sendMessage({
            ...opts,
        });
    }

    sendGroupMsg(options) {
        const opts = {
            groupId: '',
            content: {},
            callback: {
                onSuccess: () => {},
                onError: () => {},
            },
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.GROUP; // 群聊
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            throw new Error('必须传入参数 groupId');
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        this.send({
            targetId: gid,
            msg,
            conversationType,
            callback: opts.callback,
        });
    }

    // TODO: callback 需要外部自己维护
    sendChatMsg(options) {
        const opts = {
            groupId: '',
            content: {},
            callback: {
                onSuccess: () => {},
                onError: () => {},
            },
            ...options,
        };
        const conversationType = RongIMLib.ConversationType.CHATROOM; // 聊天室
        const gid = opts.groupId || this.opts.defaultGroupId;
        if (!gid) {
            throw new Error('必须传入参数 groupId');
        }
        // const targetId = 'g1'; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        const msg = new RongIMClient.RegisterMessage[RongYunClient.messageType.MSB_MSG]({
            content: opts.content,
        });
        this.send({
            targetId: gid,
            msg,
            conversationType,
            callback: opts.callback,
        });
    }

    // 销毁IM
    destory() {
        // 断开连接
        // 移除事件绑定
        this.removeAllListeners();
        if (this.connectionState === 1) {
            // this.im.disconnect();
            RongIMClient.getInstance().logout();
        }
    }
}

// RongYunClient.__TYPE = IM_TYPE.RONGYUN;

// RongYunClient.ConversationType = RIMLIB.ConversationType;
// RongYunClient.messageType = {
//     ...RIMLIB.MessageType,
//     MSB_MSG: 'ArtSimpleMessage',
// };

export default RongYunClient;
