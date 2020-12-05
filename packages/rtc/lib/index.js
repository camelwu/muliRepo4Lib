/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
import { EventEmitter } from 'events';
import AgoraRTC from 'agora-rtc-sdk';
import TRTC from 'trtc-js-sdk';
import { ZegoClient } from 'webrtc-zego';

/**
 * @description [声网, 腾讯, 即构]3家sdk的备线，因3家sdk的api和init方法和流程有差别，编写空对象，引入三家SDK。根据适配模式对外暴露方法。
 *              首先，调用`line`参数，根据`line`对sdk初始化`rtc`，再create`Client`；
 *              提供对外的on等方法，请见注释
 * @param {Number} line
 * @param {Object} option
 *
 */
/**
* @description main:主, vice:副
*/
var streamType;
(function (streamType) {
    streamType[streamType["main"] = 0] = "main";
    streamType[streamType["vice"] = 1] = "vice";
})(streamType || (streamType = {}));
var zegoRole;
(function (zegoRole) {
    zegoRole[zegoRole["host"] = 1] = "host";
    zegoRole[zegoRole["audience"] = 2] = "audience";
})(zegoRole || (zegoRole = {}));
/**
 * @description 因3家sdk的api和init方法和流程有差别，所以先引入skd，编写空对象，根据传入参数的不同，再进行逻辑编写
 */
class Rtc extends EventEmitter {
    constructor(line) {
        super();
        // params
        this.token = null;
        // private members = new Map();
        this.line = 2;
        // 备线数组，len=3
        this.sdk = [AgoraRTC, new ZegoClient(), TRTC];
        this.rtc = TRTC;
        this.logLevel = 1;
        this.joined = false;
        this.published = false;
        this.remoteStreams = [];
        this.streamsList = {};
        /**
         * netData
         */
        this.netData = {
            up: new Map(),
            down: new Map(),
        };
        // 定义client
        this.switchSdk(line);
    }
    /**
     * @description 设置用哪个sdk，公用方法
     */
    switchSdk(line) {
        if (this.line !== line) {
            this.line = line;
            this.rtc = this.sdk[line];
        }
    }
    /**
     * @description 初始化客户端对象
     *
     */
    async init(option) {
        /**
         * @description 默认配置，部分采用事先配置好的`config`；这里导入`option`，并赋值
         *
         */
        this.token = option.token || null;
        this.roomId = option.roomId || null;
        this.appId = option.appId;
        this.model = option.model;
        this.domMap = option.domMap;
        this.device = option.device;
        this.mainUid = +`${option.role}${streamType.main}${option.userId}`;
        // 根据设备判断，现在的逻辑是直接建立两个`client`，是否有必要？
        let client;
        /**
         * @description `creatClient` 考虑消化部分业务逻辑?
         * 初始化的流程因为3家，以后更多可能也不同，直接暴露出client和stream吗？暂时先暴露方法
         */
        switch (this.line) {
            case 1: // 腾讯
                client = TRTC.createClient({
                    mode: this.model.mode,
                    sdkAppId: this.appId,
                    userId: this.mainUid,
                    userSig: sessionStorage.trtcToken,
                });
                break;
            case 2: // 即构
                client = new ZegoClient();
                // ? idName 不直接写 ?
                // const _config = {};
                client.config({
                    appid: +this.appId,
                    // idName: `${new Date().getTime()}`, // 必填，用户自定义id，全局唯一
                    nickName: `u${new Date().getTime()}`,
                    server: 'wss://webliveroom-test.zego.im/ws',
                    logLevel: this.logLevel,
                    logUrl: '',
                    remoteLogLevel: 0,
                    audienceCreateRoom: false,
                    idName: `${this.mainUid}`,
                });
                break;
            default:
                // 声网
                client = AgoraRTC.createClient(this.model);
        }
        this.client = client;
        // 绑定事件到client，写多个函数？方便代码拆分
        this.handleEvents(this.client);
        // 加入房间：初始化`client`，`createStream`
        await this.join(this.roomId, () => { });
        // return client;
    }
    // just 4 zego
    loadLoginToken(loginUrl, id) {
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        const text = xmlhttp.responseText;
                        const regText = /token:(.+)/.exec(text);
                        const token = ((regText && regText[1] && regText[1].replace(' ', '')));
                        resolve(token);
                    }
                    else {
                        reject();
                    }
                }
            };
            const appSigin = '0x5f,0x2b,0x2c,0xa9,0x50,0xec,0x29,0x3c,0xef,0x85,0xbc,0xad,0x61,0x31,0xeb,0x21,0x87,0x72,0xa9,0xc0,0x47,0xaf,0xe3,0x62,0xdb,0x80,0xc3,0xdb,0xc9,0xe4,0xc0,0xd6';
            const now = new Date().getTime();
            const url = `${loginUrl}?app_id=${this.appId}&id_name=${id}&app_secret=${appSigin}&nonce=${now}&expired=${Math.floor(now / 1000 + 30 * 60)}`;
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        });
    }
    // just 4 zego
    playRemoteStream(streamList, client) {
        for (let i = 0; i < streamList.length; i++) {
            const uid = streamList[i].stream_id;
            console.info(`${uid} was added`);
            this.streamsList[uid] = streamList[i];
            console.log('this.streamsList :', this.streamsList);
            if (!uid)
                return;
            // 如果是副摄像头
            // if (uid.substr(2) === getUserId()) return;
            const type = uid.substr(1, 1) === '0' ? 'main' : 'vice';
            const domId = this.domMap[0][type];
            const dom = this.setVideoDomView({
                domId,
                streamID: `${streamList[i].stream_id}`,
            });
            client.startPlayingStream(uid, dom);
            dom.muted = false;
        }
    }
    // just 4 zego
    setVideoDomView({ domId, streamID, }) {
        const domView = document.querySelector(`#${domId}`);
        domView.innerHTML = `<div id="player_${streamID}" style="width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;"><video id="video${streamID}" style="width: 100%; height: 100%; position: absolute; object-fit: contain;" autoplay muted playsinline></video></div>`;
        return document.querySelector(`#${domId} video`);
    }
    getstreams() {
        return this.streamsList;
    }
    // 获取设备
    getDevices(next) {
        switch (this.line) {
            case 0:
                AgoraRTC.getDevices(function (items) {
                    items
                        .filter(function (item) {
                        return ['audioinput', 'videoinput'].indexOf(item.kind) !== -1;
                    })
                        .map(function (item) {
                        return {
                            name: item.label,
                            value: item.deviceId,
                            kind: item.kind,
                        };
                    });
                    var videos = [];
                    var audios = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.kind == 'videoinput') {
                            var name = item.label;
                            var value = item.deviceId;
                            if (!name) {
                                name = `camera-${videos.length}`;
                            }
                            videos.push({
                                name,
                                value,
                                kind: item.kind,
                            });
                        }
                        if (item.kind == 'audioinput') {
                            var name = item.label;
                            var value = item.deviceId;
                            if (!name) {
                                name = `microphone-${audios.length}`;
                            }
                            audios.push({
                                name,
                                value,
                                kind: item.kind,
                            });
                        }
                    }
                    next({ videos, audios });
                });
                break;
            case 1:
                break;
            default:
                return ZegoClient.enumDevices(next, function (error) { console.log(`error:${error}`); });
        }
    }
    // 登录房间 join
    async join(_roomId, func) {
        // return new Promise((resolve, reject) => {}
        const _self = this;
        if (this.joined) {
            console.warn('duplicate join() observed');
            return;
        }
        if (this.line === 0) {
            // aogra
            const { client } = this;
            // client
            client.init(this.appId, () => {
                console.log('aogra init success');
                // 加入 AgoraRTC 频道
                client.join(this.token, this.roomId, this.mainUid, () => {
                    this.joined = true;
                    func();
                    this.localStream = AgoraRTC.createStream({
                        audio: true,
                        video: true,
                        screen: false,
                        mirror: false,
                        // client: this.client,
                        // domId: this.domMap[1].main,
                        streamID: this.mainUid,
                        cameraId: this.device.cameraId[0],
                        microphoneId: this.device.microphoneId,
                    });
                    this.localStream.on('player-status-change', (evt) => {
                        console.log('media local stream player-status-change :', evt);
                        if (evt.isErrorState && evt.status === 'paused') {
                            console.warn(`local stream is paused unexpectedly. Trying to resume...`);
                            this.localStream
                                .resume()
                                .then(() => {
                                console.log(`local stream is resumed successfully`);
                            })
                                .catch((e) => {
                                console.error(`Failed to resume local stream. Error ${e.name} Reason ${e.message}`);
                            });
                        }
                    });
                    // init local stream
                    this.localStream.init(function () {
                        console.log('init local stream success');
                        // play stream with html element id "local_stream"
                        _self.localStream.play('local_stream');
                        // publish local stream
                        _self.publish();
                    }, function (err) {
                        console.error('init local stream failed ', err);
                    });
                    this.streamsList[+this.mainUid] = this.localStream;
                }, (err) => {
                    // 加入频道失败
                    console.error('client join fail', err);
                    const errType = {
                        TIMEOUT: 'join-timeout',
                        UID_CONFLICT: 'user-exist',
                    };
                    if (errType[err]) {
                        super.emit(errType[err] || 'join-fail');
                    }
                });
            }, (err) => {
                // 初始化client失败
                console.error('client init fail', err);
            });
        }
        else if (this.line === 1) {
            // trtc
            const { client } = this;
            try {
                // join the room
                await client.join({
                    roomId: this.roomId,
                });
                console.log('trtc join room success');
                this.joined = true;
                // create a local stream with audio/video from microphone/camera
                this.localStream = TRTC.createStream({
                    audio: true,
                    video: true,
                    userId: this.mainUid,
                    cameraId: this.device.cameraId[0],
                    microphoneId: this.device.microphoneId,
                    mirror: true,
                });
                try {
                    // initialize the local stream and the stream will be populated with audio/video
                    await this.localStream.initialize();
                    console.log('trtc local stream success');
                    this.localStream.on('player-state-changed', (event) => {
                        console.log(`local stream ${event.type} player is ${event.state}`);
                    });
                    // publish the local stream
                    await this.publish();
                    // this.localStream.play('main-video');
                    // dom 渲染
                }
                catch (e) {
                    console.error(`failed to initialize local stream - ${e}`);
                }
            }
            catch (e) {
                console.error(`join room failed! ${e}`);
            }
            // 更新成员状态
            const states = client.getRemoteMutedState();
            for (const state of states) {
                if (state.audioMuted) ;
                if (state.videoMuted) ;
            }
            this.streamsList[+this.mainUid] = this.localStream;
        }
        else {
            // zego
            const { client } = this;
            const mainToken = (await this.loadLoginToken('https://sig-wstoken.zego.im:8282/tokenverify', this.mainUid));
            client.login(this.roomId, zegoRole.host, mainToken, (streamlist) => {
                console.log('zego init success');
                // 登录成功后处理，例如预览推拉流
                console.log('streamlist :', streamlist);
                // 播放返回的远端流
                this.playRemoteStream(streamlist, this.client);
                /* this.initStream() */
                const option = {
                    audio: true,
                    client: this.client,
                    domId: this.domMap[1].main,
                    streamID: this.mainUid,
                    cameraId: this.device.cameraId[0],
                    microphoneId: this.device.microphoneId,
                };
                const constraints = {
                    audio: option.audio ,
                    audioInput: option.microphoneId,
                    video: true,
                    videoInput: option.cameraId,
                    videoQuality: 2,
                    horizontal: true,
                };
                const dom = this.setVideoDomView({
                    domId: `${option.domId}`,
                    streamID: `${option.streamID}`,
                });
                client.startPreview(dom, constraints, () => {
                    console.log('startPreview  success');
                    const result = client.startPublishingStream(`${option.streamID}`, dom);
                    console.log('client :', client);
                    console.log(`publish ${option.streamID} return ${result}`);
                    // resolve();
                }, (error) => {
                    console.log('startPreview  error', error);
                    // reject();
                });
            }, (err) => {
                console.error('err :', err); // 登录失败后处理
            });
        }
    }
    // 设置线路
    getVideoDomView(domId) {
        return document.querySelector(`#${domId} video`);
    }
    // on
    // off
    // 发布流
    async publish() {
        if (!this.joined) {
            console.warn('publish() - please join() firstly');
            return;
        }
        if (this.published) {
            console.warn('duplicate RtcClient.publish() observed');
            return;
        }
        try {
            await this.client.publish(this.localStream);
        }
        catch (e) {
            console.error(`failed to publish local stream ${e}`);
            this.published = false;
        }
        this.published = true;
    }
    async unpublish() {
        if (!this.joined) {
            console.warn('unpublish() - please join() firstly');
            return;
        }
        if (!this.published) {
            console.warn('RtcClient.unpublish() called but not published yet');
            return;
        }
        await this.client.unpublish(this.localStream);
        this.published = false;
    }
    // 接受流
    // 基础事件绑定，可能需要是主与副摄像头都可以？
    handleEvents(client) {
        // let client = this.client;
        if (this.line === 0) {
            client.on('error', (err) => {
                console.error(err);
                super.emit('stream-error', err);
            });
            client.on('stream-added', (evt) => {
                const { stream } = evt;
                const uid = `${stream.getId()}`;
                const userId = `${this.mainUid}`;
                console.log('stream-added %s', uid);
                if (uid.substr(2) === userId.substr(2))
                    return;
                client.subscribe(stream, (err) => {
                    console.error(err);
                });
            });
            client.on('stream-subscribed', (evt) => {
                // console.log("stream-subscribed :");
                const { stream } = evt;
                stream.on('player-status-change', (evt) => {
                    console.log('media remote stream player-status-change :', evt);
                    if (evt.isErrorState && evt.status === 'paused') {
                        console.warn(`remote stream is paused unexpectedly. Trying to resume...`);
                        stream
                            .resume()
                            .then(() => {
                            console.log(`remote stream is resumed successfully`);
                        })
                            .catch((e) => {
                            console.error(`Failed to resume remote stream. Error ${e.name} Reason ${e.message}`);
                        });
                    }
                });
                const uid = `${stream.getId()}`;
                console.log('stream-subscribed %s', uid);
            });
            client.on('connection-state-change', (state) => {
                console.log('media connection-state-change :', state);
            });
            client.on('first-video-frame-decode', (evt) => {
                const { stream } = evt;
                const uid = `${stream.getId()}`;
                console.log('first-video-frame-decode %s', uid);
                if (!uid)
                    return;
                const mainUid = `${this.mainUid}`;
                let domId;
                // 如果是副摄像头
                if (mainUid === uid) {
                    domId = this.domMap[1].vice;
                }
                else {
                    const type = uid.substr(1, 1) === '0' ? 'main' : 'vice';
                    domId = this.domMap[0][type];
                }
                this.streamsList[uid] = stream;
                stream.domId = domId;
                // @ts-ignore
                const el = document.querySelector(`#${stream.domId}`);
                if (el)
                    el.innerHTML = '';
                stream.play(domId, { fit: 'contain' }, (err) => {
                    if (err && err.status !== 'aborted') {
                        // 播放失败，一般为浏览器策略阻止。引导用户用手势触发恢复播放。
                        super.emit('stream-play-fail', uid);
                        console.error(`${stream.domId}-Stream play fail, desc: ${stream.domId}-Stream播放失败`);
                    }
                });
            });
            ['camera-changed', 'playout-device-changed', 'recording-device-changed'].forEach(event => {
                client.on(event, (evt) => {
                    console.log(`${event} `, evt);
                    super.emit(event, evt);
                });
            });
            ['mute-audio', 'unmute-audio', 'mute-video', 'unmute-video'].forEach(event => {
                client.on(event, (evt) => {
                    var { uid } = evt;
                    console.log(`${event} %s`, uid);
                    super.emit(event, uid);
                });
            });
            client.on('stream-removed', (evt) => {
                const { stream } = evt;
                var uid = stream.getId();
                const mainUid = `${this.mainUid}`;
                if (+mainUid === +uid) {
                    console.log('mainUid removed return :', uid);
                    return;
                }
                console.log('stream-removed %s', uid);
                stream.stop();
                delete this.streamsList[uid];
                super.emit('stream-removed', uid);
            });
            client.on('peer-leave', (evt) => {
                var { uid } = evt;
                const mainUid = `${this.mainUid}`;
                if (+mainUid === +uid) {
                    console.log('mainUid leave return :', uid);
                    return;
                }
                console.log('peer-leave %s', uid);
                delete this.streamsList[uid];
                super.emit('peer-leave', uid);
            });
            client.on('client-banned', (evt) => {
                var { uid } = evt;
                console.log('client-banned %s', uid);
                // var attr = evt.attr;
                super.emit('user-kicked', uid);
            });
        }
        else if (this.line === 1) {
            client.on('stream-added', (evt) => {
                const { stream } = evt;
                const uid = `${stream.getId()}`;
                const userId = `${this.mainUid}`;
                console.log('stream-added %s', uid);
                if (uid.substr(2) === userId.substr(2))
                    return;
                client.subscribe(stream);
            });
            client.on('stream-subscribed', (evt) => {
                const { stream } = evt;
                console.log('stream :', stream);
                // const uid: string = stream.getId() + "";
                const { userId_: uid } = stream;
                console.log('stream-subscribed %s', uid);
                if (!uid)
                    return;
                const mainUid = `${this.mainUid}`;
                let domId;
                // 如果是副摄像头
                if (mainUid === uid) {
                    domId = this.domMap[1].vice;
                }
                else {
                    const type = uid.substr(1, 1) === '0' ? 'main' : 'vice';
                    domId = this.domMap[0][type];
                }
                this.streamsList[uid] = stream;
                stream.domId = domId;
                // @ts-ignore
                const el = document.querySelector(`#${stream.domId}`);
                if (el)
                    el.innerHTML = '';
                stream.on('player-state-changed', (evt) => {
                    console.log('media remote stream player-state-changed :', evt);
                    if (evt.state === 'PAUSED' && evt.reason === 'pause') {
                        console.warn(`remote stream is pause unexpectedly. Trying to resume...`);
                        stream
                            .resume()
                            .then(() => {
                            console.log(`remote stream is resumed successfully`);
                        })
                            .catch((e) => {
                            console.error(`Failed to resume remote stream. Error ${e.name} Reason ${e.message}`);
                        });
                    }
                });
                stream
                    .play(stream.domId, { objectFit: 'contain', muted: false })
                    .then(() => {
                    console.log('播放本地视频流成功 : %s', uid);
                })
                    .catch((err) => {
                    const errorCode = err.getCode();
                    if (errorCode === 0x4043) {
                        const id = uid;
                        super.emit('stream-play-fail', id);
                        console.error(`${stream.domId}-Stream play fail, desc: ${stream.domId}-Stream播放失败`);
                    }
                });
            });
            client.on('connection-state-changed', (state) => {
                console.log('media connection-state-change :', state);
            });
            ['camera-changed', 'playout-device-changed', 'recording-device-changed'].forEach(event => {
                client.on(event, (evt) => {
                    console.log(`${event} `, evt);
                    super.emit(event, evt);
                });
            });
            ['mute-audio', 'unmute-audio', 'mute-video', 'unmute-video'].forEach(event => {
                client.on(event, (evt) => {
                    // var uid = evt.uid;
                    const { userId: uid } = evt;
                    console.log(`${event} %s`, uid);
                    super.emit(event, uid);
                });
            });
            client.on('stream-removed', (evt) => {
                const { stream } = evt;
                var uid = stream.getId();
                const mainUid = `${this.mainUid}`;
                if (+mainUid === +uid) {
                    console.log('mainUid removed return :', uid);
                    return;
                }
                console.log('stream-removed %s', uid);
                stream.stop();
                // delete this.streamsList[uid];
                super.emit('stream-removed', uid);
            });
            client.on('peer-leave', (evt) => {
                var { uid } = evt;
                const mainUid = `${this.mainUid}`;
                if (+mainUid === +uid) {
                    console.log('mainUid leave return :', uid);
                    return;
                }
                console.log('peer-leave %s', uid);
                delete this.streamsList[uid];
                super.emit('peer-leave', uid);
            });
            client.on('client-banned', (evt) => {
                var { uid } = evt;
                console.log('client-banned %s', uid);
                // var attr = evt.attr;
                super.emit('user-kicked', uid);
            });
            client.on('error', (err) => {
                console.log('error', err);
                super.emit('stream-error', err);
            });
        }
        else {
            client.setUserStateUpdate(true);
            client.onPlayStateUpdate = (type, streamid, error) => {
                if (type == 0) {
                    console.info('play  success');
                }
                else if (type == 2) {
                    console.info('play retry');
                }
                else {
                    console.error(`play error ${error.msg}`);
                    var _msg = error.msg;
                    if (error.msg.indexOf('server session closed, reason: ') > -1) {
                        var code = error.msg.replace('server session closed, reason: ', '');
                        if (code == 21) {
                            _msg = '音频编解码不支持(opus)';
                        }
                        else if (code == 22) {
                            _msg = '视频编解码不支持(H264)';
                        }
                        else if (code == 20) {
                            _msg = 'sdp 解释错误';
                        }
                    }
                    alert(`拉流失败,reason = ${_msg}`);
                }
            };
            client.onPublishStateUpdate = (type, streamid, error) => {
                if (type == 0) {
                    console.info(' publish  success');
                }
                else if (type == 2) {
                    console.info(' publish  retry');
                }
                else {
                    console.error(`publish error ${error.msg}`);
                    var _msg = error.msg;
                    if (error.msg.indexOf('server session closed, reason: ') > -1) {
                        var code = error.msg.replace('server session closed, reason: ', '');
                        if (code == 21) {
                            _msg = '音频编解码不支持(opus)';
                        }
                        else if (code == 22) {
                            _msg = '视频编解码不支持(H264)';
                        }
                        else if (code == 20) {
                            _msg = 'sdp 解释错误';
                        }
                    }
                    alert(`推流失败,reason = ${_msg}`);
                }
            };
            client.onUserStateUpdate = (roomId, userList) => {
                console.log('onUserStateUpdate :', roomId, userList);
            };
            client.onDisconnect = (error) => {
                console.error(`onDisconnect ${JSON.stringify(error)}`);
                // alert("网络连接已断开" + JSON.stringify(error));
                super.emit('stream-error', JSON.stringify(error));
            };
            client.onKickOut = (error) => {
                console.error(`onKickOut ${JSON.stringify(error)}`);
                super.emit('user-kicked', this.mainUid);
            };
            client.onStreamUpdated = (type, streamList) => {
                if (type == 0) {
                    this.playRemoteStream(streamList, client);
                }
                else if (type == 1) {
                    const streamsList = Object.values(this.streamsList);
                    for (var k = 0; k < streamsList.length; k++) {
                        for (var j = 0; j < streamList.length; j++) {
                            const uid = streamsList[k].stream_id;
                            if (uid === streamList[j].stream_id) {
                                const mainUid = `${this.mainUid}`;
                                if (+mainUid === +uid) {
                                    console.log('mainUid removed return :', uid);
                                    return;
                                }
                                client.stopPlayingStream(uid);
                                delete this.streamsList[uid];
                                console.log('stream-removed %s', uid);
                                super.emit('stream-removed', uid);
                                break;
                            }
                        }
                    }
                }
            };
        }
    }
    /**
     * leave
     */
    leave() {
        const _self = this;
        if (!this.client) {
            console.error('Please Join First!');
            return;
        }
        if (!this.joined) {
            console.error('You are not in channel');
            return;
        }
        if (this.line === 0) {
            /**
             * Leaves an AgoraRTC Channel
             * This method enables a user to leave a channel.
             * */
            this.client.leave(function () {
                // stop stream
                _self.localStream.stop();
                // close stream
                _self.localStream.close();
                while (_self.remoteStreams.length > 0) {
                    var stream = _self.remoteStreams.shift();
                    // var id = stream.getId();
                    stream.stop();
                    // removeView(id);
                }
                _self.localStream = null;
                _self.remoteStreams = [];
                // _self.client = null;
                console.log('client leaves channel success');
                _self.published = false;
                _self.joined = false;
                console.warn('leave success');
                _self.joined = false;
            }, function (err) {
                // console.log("channel leave failed");
                console.error(err);
            });
        }
        else if (this.line === 1) {
            // ensure the local stream is unpublished before leaving.
            this.unpublish();
            // leave the room
            this.client.leave();
            this.localStream.stop();
            this.localStream.close();
            this.localStream = null;
            this.joined = false;
        }
        else {
            console.info('leave room  and close stream');
            // isPreviewed = false;
            // this.client.stopPreview(previewVideo:htmlElement);
            this.client.stopPublishingStream(this.mainUid);
            var { streamsList } = this;
            for (var i = 0; i < streamsList.length; i++) {
                this.client.stopPlayingStream(streamsList[i].stream_id);
            }
            this.streamsList = {};
            this.client.logout();
            this.joined = false;
        }
    }
    /**
     *
     * @param type
     */
    getStream(type) {
        const stream = this.localStream;
        if (!stream)
            throw '流未初始化';
        return stream;
    }
    /**
     * muteAudio
     */
    muteAudio(type = 0) {
        const _self = this;
        const { client } = this;
        if (this.line === 2) {
            const dom = _self.getVideoDomView(this.domMap[1].main);
            return client.enableCamera(dom, true);
        }
        const stream = this.getStream(type);
        return stream.muteAudio();
    }
    /**
     * unmuteAudio
     */
    unmuteAudio(type = 0) {
        const stream = this.getStream(type);
        return stream.unmuteAudio();
    }
    // ? zego ?
    /**
     * unmuteVideo
     */
    unmuteVideo(type = 0) {
        const stream = this.getStream(type);
        return stream.unmuteVideo();
    }
    /**
     * muteVideo
     */
    muteVideo(type = 0) {
        const stream = this.getStream(type);
        return stream.muteVideo();
    }
    /**
     * setVideoProfile
     */
    setVideoProfile(type, dpi) {
        const stream = this.getStream(type);
        return stream.setVideoProfile(dpi);
    }
    /**
     * resume
     */
    resume(uid) {
        const stream = this.streamsList[uid];
        if (!stream)
            throw '流未初始化';
        return stream.resume();
    }
    /**
     * 获取本地视频数据
     */
    upDataLocal(name) {
        const { client } = this;
        const tempRet = {
            video: {},
            audio: {},
        };
        let _userId = '';
        // 视频数据
        if (this.line === 2) {
            // zego
            let _userId;
            client.onPublishQualityUpdate = (streamid, quality) => {
                _userId = streamid;
                const { videoBitrate: vbps, videoFractionLost: vplr, videoFPS: vfr, videoTransferFPS: Tsb, frameHeight: vfh, frameWidth: vfw, audioBitrate: abps, audioBitrate: rkps, currentRoundTripTime: ved, audioFractionLost: aplr, } = quality;
                tempRet.video = {
                    type: `${_userId}`,
                    vbps,
                    vplr,
                    Tsb,
                    vfr,
                    vfh,
                    vfw,
                    ved,
                };
                tempRet.audio = {
                    abps,
                    rkps,
                    ved,
                    aplr,
                };
                _userId && this.netData.up.set(_userId, tempRet);
            };
        }
        else {
            client.getLocalVideoStats((videoDatas) => {
                // let userId: string = String(Reflect.ownKeys(videoDatas)[0]);
                for (var userId in videoDatas) {
                    // console.log("userId", userId)
                    _userId = userId;
                    try {
                        const { 
                        // 实际可以拿到的数据
                        EncodeDelay: ved = '-', // 本地视频从采集到编码的延时
                        SendBitrate: vbps = '-', // 视频发送码率
                        SendFrameRate: vfr = '-', // 视频发送帧率
                        SendResolutionWidth: vfw = '-', // 视频发送分辨率宽度
                        SendResolutionHeight: vfh = '-', // 视频发送分辨率高度
                        TargetSendBitrate: Tsb = '-', // setVideoProfile 中设置的目标发送码率
                        // 实际拿不到,凑数
                        PacketLossRate: vplr = '-', // 远端音频丢包
                        ReceiveKps: rkps = '-', // 从远端接收的码率
                        End2EndDelay: vcd = '-', } = videoDatas[userId];
                        tempRet.video = {
                            type: `${_userId}`,
                            vbps,
                            Tsb,
                            vfr,
                            vfw,
                            vfh,
                            vplr,
                            ved,
                            rkps,
                            vcd,
                        };
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            });
            // 音频数据
            client.getLocalAudioStats((audioData) => {
                for (const userId in audioData) {
                    try {
                        const { 
                        // 实际能获取
                        SendBitrate: abps = '-', // 视频发送码率
                        // 实际不能
                        PacketLossRate: aplr = '-', End2EndDelay: acd = '-', } = audioData[userId];
                        tempRet.audio = { abps, aplr, acd };
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                // let userId: string = String(Reflect.ownKeys(audioData)[0])
            });
            _userId && this.netData.up.set(_userId, tempRet);
        }
    }
    /**
     * 获取远端视频数据
     */
    upDataRemote() {
        const { client } = this;
        const tempRet = {};
        if (this.line === 2) {
            client.onPlayQualityUpdate = (stream_id, streamQuality) => {
                const tempRet = {};
                console.log('stream_id :', stream_id, streamQuality);
                const { videoBitrate: vbps, videoFPS: vfr, videoTransferFPS: Tsb, frameHeight: vfh, frameWidth: vfw, audioBitrate: abps, videoFractionLost: vplr, audioBitrate: rkps, currentRoundTripTime: ved, audioFractionLost: aplr, } = streamQuality;
                tempRet.video = {
                    type: `${stream_id}`,
                    vbps,
                    Tsb,
                    vfr,
                    vfh,
                    vfw,
                    vplr,
                    ved,
                };
                tempRet.audio = {
                    abps,
                    rkps,
                    ved,
                    aplr,
                };
                stream_id && this.netData.down.set(stream_id, tempRet);
            };
        }
        else {
            client.getRemoteVideoStats((videoDatas) => {
                for (let i = 0; i < Reflect.ownKeys(videoDatas).length; i++) {
                    const userId = String(Reflect.ownKeys(videoDatas)[i]);
                    const { 
                    // 实际可以拿到的数据
                    End2EndDelay: vcd = '-', // 端到端延时（ms）
                    PacketLossRate: vplr = '-', // 远端视频的丢包率
                    RecvBitrate: vbps = '-', // 视频接收码率
                    RecvResolutionHeight: vfh = '-', RecvResolutionWidth: vfw = '-', RenderFrameRate: vfr = '-', // 渲染帧率（fps）
                    // 实际拿不到,凑数
                    // none: vnq = "-"
                    ReceiveLocalKps: rlkps = '-', } = videoDatas[userId];
                }
            });
            client.getRemoteAudioStats((audioData) => {
                for (let i = 0; i < Reflect.ownKeys(audioData).length; i++) {
                    const userId = String(Reflect.ownKeys(audioData)[i]);
                    const { 
                    // 实际可以拿到的数据
                    End2EndDelay: acd = '-', PacketLossRate: aplr = '-', RecvBitrate: abps = '-', 
                    // 实际拿不到,凑数
                    none: anq = '-', } = audioData[userId];
                }
            });
            this.netData.down.clear();
            for (const item in tempRet) {
                this.netData.down.set(item, tempRet[item]);
            }
        }
    }
    /**
     * 获取全量数据
     */
    getNetStats() {
        this.client && this.upDataLocal('main');
        // this.viceClient && this.upDataLocal("vice");
        this.client && this.upDataRemote();
        const ret = {
            up: {},
            down: {},
        };
        const iterator1 = this.netData.up.keys();
        // {"10228373", "11228373"}
        for (let i = 0; i < 2; i++) {
            const temp = iterator1.next().value;
            if (temp) {
                ret.up[`${temp}`] = this.netData.up.get(temp);
            }
            else {
                break;
            }
        }
        const iterator2 = this.netData.down.keys();
        for (let i = 0; i < 2; i++) {
            const temp = iterator2.next().value;
            if (temp) {
                ret.down[`${temp}`] = this.netData.down.get(temp);
            }
            else {
                break;
            }
        }
        // 扁平化
        const upArr = [];
        if (ret.up !== {}) {
            for (const item in ret.up) {
                const { vbps, vfr, vfw, vfh, ved, vplr, Tsb, type, rkps } = ret.up[item].video;
                const { abps, aplr, acd } = ret.up[item].audio;
                upArr.push({
                    camera: '本地',
                    deviceName: 'web',
                    type,
                    vbps,
                    Tsb,
                    vplr,
                    ved,
                    vfr,
                    vfwh: `${vfw}*${vfh}`,
                    abps,
                    aplr,
                    acd,
                    rkps,
                });
            }
        }
        const downArr = [];
        if (ret.down !== {}) {
            for (const item in ret.down) {
                const { vbps, vfr, vfw, vfh, vplr, vcd, type, rlkps } = ret.down[item].video;
                const { abps, aplr, acd, anq } = ret.down[item].audio;
                console.log(anq);
                downArr.push({
                    camera: '远端',
                    deviceName: 'web',
                    type,
                    vbps,
                    vplr,
                    vcd,
                    vfr,
                    vfwh: `${vfw}*${vfh}`,
                    abps,
                    aplr,
                    acd,
                    rlkps,
                });
            }
        }
        const refFinal = {
            up: upArr,
            down: downArr,
        };
        return refFinal;
    }
    stopNetStats() {
        // ? 空函数 ?
        if (this.line == 2) {
            this.client.onPlayQualityUpdate = () => { };
            this.client.onPublishQualityUpdate = () => { };
        }
    }
}

export default Rtc;
export { streamType, zegoRole };
//# sourceMappingURL=index.js.map
