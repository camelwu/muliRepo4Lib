import AgoraRTM from 'agora-rtm-sdk';
import BaseIM from './BaseIM';
import IM_TYPE from './config/IM_TYPE';

class RTMClient extends BaseIM {
    private opts: Partial<{
        appKey: string;
        appId: string;
        isAutoConnect: boolean;
        isAutoReconnect: boolean;
        defaultToken: string;
        defaultGroupId: string;
        interval: number;
    }>;

    public static __TYPE = IM_TYPE;

    public appId: string;

    public channels: {};

    public client: any;

    public messageQuene: any[];

    private msgInterval: null | number;

    private prevSendTime: null | number;

    public connectStatus: number;

    private defaultToken?: string;

    private defaultGroupId?: string;

    public userId?: string;

    constructor(options) {
        super();
        this.opts = {
            appKey: '',
            appId: '',
            isAutoConnect: false,
            isAutoReconnect: true,
            defaultToken: '',
            defaultGroupId: '',
            interval: 17, // 声网的限制是每秒60次，我们使用17 基本上保证每秒不超过59次
            ...options,
        };
        if (!this.opts.appId) {
            throw new Error('rtm: 必须 配置 appId');
        }
        this.appId = this.opts.appId;
        this.channels = {};
        this.client = null;
        this.messageQuene = [];
        this.msgInterval = null;
        this.prevSendTime = null;
        this.connectStatus = 0;
        this.defaultToken = this.opts.defaultToken;
        this.defaultGroupId = this.opts.defaultGroupId;

        this.init();
    }

    get imType() {
        return RTMClient.__TYPE;
    }

    init() {
        try {
            this.client = AgoraRTM.createInstance(this.appId);
            this.subscribeClientEvents();
        } catch (err) {
            // 创建实例失败，整个系统不可用，需要直接抛出异常
            throw err;
        }
    }

    // subscribe client events
    subscribeClientEvents() {
        this.client.on('ConnectionStateChanged', (newState, reason) => {
            switch (newState) {
                case 'ABORTED':
                    this.connectStatus = 1;
                    // 如果用户被提出，可以考虑重新登录
                    this.emit('n:aborted', reason);
                    break;
                case 'CONNECTED':
                    this.connectStatus = 2;
                    this.emit('n:connected', reason);
                    break;
                case 'CONNECTING':
                    this.connectStatus = 3;
                    this.emit('n:connecting', reason);
                    break;
                case 'DISCONNECTED':
                    // 断开为初始化状态
                    this.connectStatus = 0;
                    this.emit('n:disconnected', reason);
                    break;
                case 'RECONNECTING':
                    this.connectStatus = 5;
                    this.emit('rc:reconnecting', reason);
                    break;
                default:
                    this.connectStatus = 6;
                    this.emit('n:unknowStatus', reason);
                    break;
            }
            if (reason === 'REMOTE_LOGIN') {
                this.emit('n:kickedOfflineByOtherClient', reason);
            }
        });

        // 接收到的消息
        this.client.on('MessageFromPeer', (...args) => {
            console.log('MessageFromPeer', ...args);
            this.emit('m:text', ...args);
            this.emit('m:msb', ...args);
        });
    }

    // subscribe channel events
    subscribeChannelEvents(chatRoomId) {
        if (!this.channels[chatRoomId]) {
            return;
        }
        this.channels[chatRoomId].channel.on('ChannelMessage', ({ text }) => {
            try {
                const content = {
                    content: JSON.parse(text),
                };
                this.emit('m:all', { targetId: chatRoomId, content });
                this.emit('m:msb', { targetId: chatRoomId, content });
                // this.emit('m:text', { chatRoomId, content: data })
            } catch (err) {
                this.emit('m:error', {
                    code: -2,
                    error: err,
                });
            }
        });

        // 当频道成员超过 512 时，该回调失效。
        this.channels[chatRoomId].channel.on('MemberJoined', uid => {
            // console.log(res);
            this.emit('m:joined', uid);
        });

        // 当频道成员超过 512 时，该回调失效。
        this.channels[chatRoomId].channel.on('MemberLeft', uid => {
            this.emit('m:left', uid);
        });
    }

    connect(userId, token) {
        return this.login(userId, token || this.defaultToken);
    }

    reconnect() {
        // RTM自动重连
    }

    _connectError(errorCode) {
        let info = '';
        switch (errorCode) {
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_ALREADY_LOGIN:
            case 8:
                info = '用户已登录，或正在登录 Agora RTM 系统';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_INVALID_APP_ID:
            case 4:
                info = '无效的 App ID';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_INVALID_TOKEN:
            case 5:
                info = '无效的 Token';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_NOT_AUTHORIZED:
            case 7:
                info = '预留错误码';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TIMEOUT:
            case 9:
                info = '登录超时。目前的超时设置为 6 秒';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TOKEN_EXPIRED:
            case 6:
                info = 'Token 已过期，登录被拒绝';
                break;
            // case AgoraRTM.ErrorStatusCode.LoginError.LOGIN_ERR_TOO_OFTEN:
            case 10:
                info = '登录过于频繁。超过 2 次／秒的上限';
                break;
            default:
                info = '未知错误';
        }
        return info;
    }

    login(userId, token = null) {
        this.userId = userId.toString();
        return this.client
            .login({ uid: this.userId, token })
            .then(() => {
                this.emit('c:success', {
                    userId,
                    msg: '登录成功',
                });
            })
            .catch(err => {
                this.emit('c:error', {
                    code: err,
                    msg: this._connectError(err),
                });
            });
    }

    logout() {
        return this.client
            .logout()
            .then(() => {
                this.connectStatus = 0;
                this.channels = {};
            })
            .catch(err => {
                this.emit('d:error', {
                    code: err,
                    msg: '退出失败',
                });
            });
    }

    _createChannel(chatRoomId) {
        if (!chatRoomId) {
            return null;
        }
        if (this.channels[chatRoomId]) {
            return this.channels[chatRoomId];
        }
        const channel = this.client.createChannel(chatRoomId);
        this.channels[chatRoomId] = {
            channel,
            status: 0, // 0: 默认值 1:
        };
        return this.channels[chatRoomId];
    }

    // 最多加入 20 个频道
    joinChatRoom(opts) {
        const opt = {
            success: () => {},
            error: () => {},
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId;
        if (!chatRoomId) {
            throw new Error(`rtm: roomid 不能为空`);
        }
        const faChatRoomId = `${chatRoomId}`;
        // 已经创建过了该频道，直接加入
        const channelInfo = this._createChannel(faChatRoomId);
        if (!channelInfo || channelInfo.status === 1) {
            return null;
        }
        this.subscribeChannelEvents(faChatRoomId);
        return channelInfo.channel
            .join()
            .then((...args) => {
                channelInfo.status = 1;
                opt.success(...args);
            })
            .catch((...args) => {
                opt.error(...args);
            });
    }

    leaveChatRoom(opts) {
        const opt = {
            success: () => {},
            error: () => {},
            count: 50,
            ...opts,
        };
        const chatRoomId = opt.roomId || this.defaultGroupId; // 聊天室 Id
        // 没有初始化完成则不执行退出
        if (
            !this.channels[chatRoomId] ||
            (this.channels[chatRoomId] && this.channels[chatRoomId].status === 0)
        ) {
            return;
        }

        this.channels[chatRoomId].channel
            .leave()
            .then((...args) => {
                this.channels[chatRoomId].status = 0;
                opt.success(...args);
            })
            .catch((...args) => {
                opt.error(...args);
            });
    }

    sendSingleMsg(options) {
        const opts = {
            userId: '',
            content: {},
            callback: {
                onSuccess: () => {},
                onError: () => {},
            },
            sendOption: {
                enableOfflineMessaging: false,
            },
            ...options,
        };

        this._sendMessage({
            type: 'chat',
            targetId: opts.userId,
            options: opts.sendOption,
            content: opts.content,
            callback: opts.callback,
        });
    }

    sendChatMsg(options) {
        const opts = {
            groupId: this.defaultGroupId,
            content: {},
            callback: {
                onSuccess: () => {},
                onError: () => {},
            },
            ...options,
        };

        this._sendMessage({
            type: 'chat',
            targetId: opts.groupId,
            content: opts.content,
            callback: opts.callback,
        });
    }

    _sendMessage(msgInfo) {
        this.messageQuene.push({
            ...msgInfo,
        });
        this._doSend();
    }

    _doSend() {
        if (this.msgInterval) {
            return;
        }
        this.msgInterval = setInterval(() => {
            // 如果没有消息
            if (this.messageQuene.length < 1) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                return;
            }
            // 如果用户退出，则清空消息
            if (this.connectStatus !== 2) {
                if (this.msgInterval) {
                    clearInterval(this.msgInterval);
                    this.msgInterval = null;
                }
                this.messageQuene = [];
                return;
            }
            const currentSendTime = new Date().getTime();
            if (this.prevSendTime) {
                console.log('im 发送时间间隔:', currentSendTime - this.prevSendTime);
                this.prevSendTime = currentSendTime;
            } else {
                this.prevSendTime = currentSendTime;
            }
            console.log('im 发送时间：', currentSendTime);
            try {
                const msg = this.messageQuene.shift();
                const text = JSON.stringify(msg.content);
                if (msg.type === 'chat') {
                    this.channels[msg.targetId].channel
                        .sendMessage({
                            text,
                        })
                        .then((...args) => {
                            if (msg.callback && msg.callback.onSuccess) {
                                msg.callback.onSuccess(...args);
                            }
                        })
                        .catch((...args) => {
                            if (msg.callback && msg.callback.onError) {
                                msg.callback.onError(...args);
                            }
                        });
                } else {
                    // TODO: 有bug
                    this.client
                        .sendMessageToPeer({
                            text,
                        })
                        .then((...args) => {
                            if (msg.callback && msg.callback.onSuccess) {
                                msg.callback.onSuccess(...args);
                            }
                        })
                        .catch((...args) => {
                            if (msg.callback && msg.callback.onError) {
                                msg.callback.onError(...args);
                            }
                        });
                }
            } catch (err) {
                console.log('rtm: 发送消息失败', err);
            }
        }, this.opts.interval);
    }

    async queryPeersOnlineStatus(memberId) {
        console.log('queryPeersOnlineStatus', memberId);
        return this.client.queryPeersOnlineStatus([memberId]);
    }

    // 销毁IM
    destory() {
        this.removeAllListeners();
        return this.logout();
    }
}

export default RTMClient;
