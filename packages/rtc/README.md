# MEDIA 用到的API(列举声网)
完全适配sdk难度系数很大，流程和对象都不同。
agora和trtc 有client和stream
zego没有client和stream，可以强行赋值；
但agora与trtc的参数和回掉方法，zego即便重写，都存在回掉方法不同的问题；
业务层面就无法实现直接切换参数即可。所以，第一方案，写部分业务是最适合的。


- Logger
    - setLogLevel
    - enableLogUpload

- getDevices

- createClient => client
    - setClientRole
    - init
    - join
    - publish
    - on
    - subscribe
    - getLocalVideoStats
    - getLocalAudioStats
    - getRemoteVideoStats
    - getRemoteAudioStats
    - leave

- createStream => stream
    - init
    - close
    - play
    - resume
    - stop
    - getId
    - on
    - hasAudio
    - hasVideo
    - muteAudio
    - unmuteAudio
    - muteVideo
    - unmuteVideo
    - setVideoProfile
    - getAudioLevel
    - switchDevice
    - getStats

- client event
    - stream-added
    - stream-subscribed
    - connection-state-change
    - first-video-frame-decode
    - camera-changed
    - playout-device-changed
    - recording-device-changed
    - mute-audio
    - unmute-audio
    - mute-video
    - unmute-video
    - stream-removed
    - peer-leave
    - client-banned
    - error

- stream event
    - player-status-change


[API使用方法](https://docs.agora.io/cn/Video/API%20Reference/web/index.html)

 * TRTC Start Group
Logger {LogLevel: {…}, setLogLevel: ƒ, enableUploadLog: ƒ, disableUploadLog: ƒ}LogLevel: {TRACE: 0, DEBUG: 1,INFO: 2, WARN: 3, ERROR: 4, …}setLogLevel: ƒ (e)enableUploadLog: ƒ ()disableUploadLog: ƒ ()__proto__: Object
checkSystemRequirements ƒ (){return jp.apply(this,arguments)}
isScreenShareSupported ƒ (){return e=0,navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia&&(e=1),e;var e}
getDevices ƒ (){return Mp.apply(this,arguments)}
getCameras ƒ (){return Np.apply(this,arguments)}
getMicrophones ƒ (){return Lp.apply(this,arguments)}
getSpeakers ƒ (){return Dp.apply(this,arguments)}
createClient ƒ (e){Up.report("sdkAppID",{value:e.sdkAppId}),Up.report("version",{value:this.VERSION});var t={version:this.VERSION};return new kp(it({},t,e))}
createStream ƒ (e){if(!(void 0===e.audio&&void 0===e.video||void 0===e.audioSource&&void 0===e.videoSource))throw new xd({code:Pd.INVALID_PARAMETER,message:"LocalStream must be created by createStream() with either…
 * AgoraRTC Start Group
TranscodingUser {uid: 0, x: 0, y: 0, width: 0, height: 0, …}
LiveTranscoding {width: 640, height: 360, videoBitrate: 400, videoFramerate: 15, lowLatency: false, …}
createClient ƒ (e){var t=a.b.reportApiInvoke(null,{name:"createClient",options:arguments,tag:"tracer"});(e=S()({},e||{})).codec||(e.codec=function(e){switch(e){case"h264_interop":return"h264";default:return"vp8"}}(…
createStream ƒ (e){var t=a.b.reportApiInvoke(null,{name:"createStream",options:arguments,tag:"tracer"});X(e,"StreamSpec");var n=e.streamID,i=e.audio,o=e.video,s=e.screen,c=(e.audioSource,e.videoSource,e.cameraId),d…
Logger {DEBUG: 0, INFO: 1, WARNING: 2, ERROR: 3, NONE: 4, …}
getDevices ƒ (t,n){e._enumerateDevices(t,function(e){n&&n(e.name+": "+e.message)})}
getScreenSources ƒ (e){var t=a.b.reportApiInvoke(null,{callback:e,name:"getScreenSources",options:arguments,tag:"tracer"}),n=L();if(!n)return t&&t("electron is null");n.desktopCapturer.getSources({types:["window","scre…
getParameter ƒ (e){return void 0!==i[e]?i[e]:null}
setParameter ƒ (e,t){return void 0!==i[e]&&(i[e]=t,!0)}
checkSystemRequirements ƒ (){var e=a.b.reportApiInvoke(null,{name:"checkSystemRequirements",options:arguments,tag:"tracer"}),t=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,n=navigator.…
getSupportedCodec ƒ (e){return i(r,void 0,void 0,function(){var t,n,i,r,u;return o(this,function(o){switch(o.label){case 0:return t={video:[],audio:[]},"undefined"!=typeof window?[3,1]:(c.default.error("getSupportedCode…
VERSION 2.8.0
BUILD v2.8.0-0-g0d6a3be
PROFILE_TABLE {90p_1: Array(6), 120p_1: Array(6), 120p_3: Array(6), 120p_4: Array(6), 180p_1: Array(6), …}90p_1: (6) [160, 90, null, null, null, null]120p_1: (6) [160, 120, 15, 15, 30, 65]120p_3: (6) [120, 120, 15, 15, 30, 50]120p_4: (6) [212, 120, null, null, null, null]180p_1: (6) [320, 180, 15, 15, 30, 140]180p_3: (6) [180, 180, 15, 15, 30, 100]180p_4: (6) [240, 180, 15, 15, 30, 120]240p_1: (6) [320, 240, 15, 15, 40, 200]240p_3: (6) [240, 240, 15, 15, 40, 140]240p_4: (6) [424, 240, 15, 15, 40, 220]360p_1: (6) [640, 360, 15, 15, 80, 400]360p_3: (6) [360, 360, 15, 15, 80, 260]360p_4: (6) [640, 360, 30, 30, 80, 600]360p_6: (6) [360, 360, 30, 30, 80, 400]360p_7: (6) [480, 360, 15, 15, 80, 320]360p_8: (6) [480, 360, 30, 30, 80, 490]360p_9: (6) [640, 360, 15, 15, 80, 800]360p_10: (6) [640, 360, 24, 24, 80, 800]360p_11: (6) [640, 360, 24, 24, 80, 1000]480p_1: (8) [640, 480, 15, 15, 20, 500, 1, 5]480p_2: (8) [640, 480, 30, 30, 100, 1000, 25, 30]480p_3: (6) [480, 480, 15, 15, 100, 400]480p_4: (6) [640, 480, 30, 30, 100, 750]480p_6: (6) [480, 480, 30, 30, 100, 600]480p_8: (6) [848, 480, 15, 15, 100, 610]480p_9: (6) [848, 480, 30, 30, 100, 930]480p_10: (6) [640, 480, 10, 10, 100, 400]720p_1: (8) [1280, 720, 15, 15, 120, 1130, 1, 5]720p_2: (8) [1280, 720, 30, 30, 120, 2000, 25, 30]720p_3: (6) [1280, 720, 30, 30, 120, 1710]720p_5: (6) [960, 720, 15, 15, 120, 910]720p_6: (6) [960, 720, 30, 30, 120, 1380]1080p_1: (8) [1920, 1080, 15, 15, 120, 2080, 1, 5]1080p_2: (8) [1920, 1080, 30, 30, 120, 3000, 25, 30]1080p_3: (6) [1920, 1080, 30, 30, 120, 3150]1080p_5: (6) [1920, 1080, 60, 60, 120, 4780]1440p_1: (6) [2560, 1440, 30, 30, 120, 4850]1440p_2: (6) [2560, 1440, 60, 60, 120, 7350]4k_1: (6) [3840, 2160, 30, 30, 120, 8910]4k_3: (6) [3840, 2160, 60, 60, 120, 13500]__proto__: Object
AUDIO_SAMPLE_RATE_32000 32000
AUDIO_SAMPLE_RATE_44100 44100
AUDIO_SAMPLE_RATE_48000 48000
VIDEO_CODEC_PROFILE_BASELINE 66
VIDEO_CODEC_PROFILE_MAIN 77
VIDEO_CODEC_PROFILE_HIGH 100
REMOTE_VIDEO_STREAM_HIGH 0
REMOTE_VIDEO_STREAM_LOW 1
REMOTE_VIDEO_STREAM_MEDIUM 2
 * Zego Start Group
streamCenter i {playerList: {…}, publisherList: {…}, testEnvironment: false, heartbeatTimer: null, heartbeatInterval: 10000, …}
logger i {logUploadTimer: null, logUploadInterval: 10000, logCache: Array(0), logCacheSend: Array(0), logCacheMax: 100}
stateCenter t {testEnvironment: false, third_token: "", pullLimited: true, configOK: false, roomCreateFlag: 1, …}
audioMixing t {loop: false, replace: false, effectEndedCallBack: null, effectEndedListener: null, startTimes: 0, …}
socketCenter t {cmdSeq: 0, responseRouters: {…}, logger: i, stateCenter: t, getSocket: ƒ, …}
streamHandler t {logger: i, socketCenter: t, stateCenter: t, onStreamUpdated: ƒ, onPublishStateUpdate: ƒ, …}
heartBeatHandler t {logger: i, socketCenter: t, stateCenter: t, onRecvReliableMessage: ƒ, handleFetchStreamListRsp: ƒ, …}
roomHandler t {logger: i, socketCenter: t, stateCenter: t, loginSuccessCallBack: ƒ, onGetTotalUserList: ƒ, …}
messageHandler t {logger: i, socketCenter: t, stateCenter: t, onRecvCustomCommand: ƒ, onRecvBigRoomMessage: ƒ, …}
liveHandler t {logger: i, socketCenter: t, stateCenter: t, onRecvEndJoinLiveCommand: ƒ, onRecvInviteJoinLiveRequest: ƒ, …}
constructor ƒ i(){var i=this,n=new S.LoggerWeb,l=new w.StateCenter,p=new R.ZegoStreamCenterWeb(n,l);return(i=t.call(this)||this).streamCenter=p,i.logger=n,i.stateCenter=l,i.audioMixing=new L.audioMixUtil(n),i.init…
getSocket ƒ (t){return new WebSocket(t)}
enableCamera ƒ (t,i){return this.logger.debug("zc.p.ec.0 call"),"boolean"!=typeof i?(this.logger.error("zc.p.ec.0 argument is not bool"),!1):this.streamCenter.enableCamera(t,i)}
enableMicrophone ƒ (t,i){return this.logger.debug("zc.p.em.0 call"),"boolean"!=typeof i?(this.logger.error("zc.p.em.0 argument is not bool"),!1):this.streamCenter.enableMicrophone(t,i)}
setLocalAudioOutput ƒ (t,i){return this.logger.debug("zc.p.slao call"),"string"!=typeof i?(console.error("audiooutput is not string"),!1):this.streamCenter.setStreamAudioOutput(t,i)}
setPlayAudioOutput ƒ (t,i){return this.logger.debug("zc.p.spao call"),"string"!=typeof i?(console.error("audiooutput is not string"),!1):this.streamCenter.setPlayStreamAudioOutput(t,i)}
setCustomSignalUrl ƒ (t){return this.logger.debug("zc.p.scs.0 call: "+t),t&&0!=t.length?0!=t.indexOf("wss://")?(this.logger.error("zc.p.scs.0 url is not correct"),!1):void(this.stateCenter.customUrl=t):(this.logger.error…
setQualityMonitorCycle ƒ (t){"number"==typeof t&&t>=1e3&&this.streamCenter.setQualityMonitorCycle(t)}
startPlayingStream ƒ (t,i,n,l){var p=this;if(this.logger.debug("zc.p.sps.0 call"),!t||""===t)return this.logger.error("zc.p.sps.0 param error"),!1;if(!i)return this.logger.error("zc.p.sps.0 don't have remoteVideo"),!1;if…
stopPlayingStream ƒ (t){if(this.logger.debug("zc.p.sps.1.0 call"),!t||""===t)return this.logger.info("zc.p.sps.1.0 param error"),!1;for(var i in this.streamCenter.stopPlayingStream(t),this.stateCenter.streamUrlMap)if(th…
startPreview ƒ (t,i,n,l){if(this.logger.debug("zc.p.sp.0 call"),!t)return this.logger.error("zc.p.sp.0 no localVideo"),!1;if(i.audioBitRate){if("number"!=typeof i.audioBitRate)return void this.logger.error("zc.p.sp…
stopPreview ƒ (t){return this.logger.debug("zc.p.sp.1 call"),t?this.streamCenter.stopPreview(t):(this.logger.info("zc.p.sp.1 param error"),!1)}
startPublishingStream ƒ (t,i,n,l){var p=this;if(this.logger.debug("zc.p.sps.1 call"),!t)return this.logger.error("zc.p.sps.1 param error"),!1;if(l||(l={}),l.audioBitRate=this.stateCenter.audioBitRate,this.stateCenter.custom…
stopPublishingStream ƒ (t){return this.logger.debug("zc.p.sps.1.1 call"),t?(this.streamCenter.stopPublishingStream(t),this.stateCenter.publishStreamList[t]&&(this.stateCenter.publishStreamList[t].state>=T.ENUM_PUBLISH_STRE…
preloadEffect ƒ (t,i,n){var l=this;t&&"number"==typeof t&&i&&"string"==typeof i?this.stateCenter.audioEffectBuffer[t]?this.logger.error("zc.pe.0 audio buffer already exists"):this.audioMixing.preloadEffect(i,functio…
playEffect ƒ (t,i,n){if(t.streamId&&"string"==typeof t.streamId&&t.effectId&&"number"==typeof t.effectId)if(this.stateCenter.audioEffectBuffer[t.effectId]){var l=this.stateCenter.audioEffectBuffer[t.effectId],p=t…
pauseEffect ƒ (t){if(t&&"string"==typeof t){var i=this.getPublisher(t);i?i.pauseEffect():this.logger.error("zc.pe.2 publisher doesn't exist")}else this.logger.error("zc.pe.2 streamid format error")}
resumeEffect ƒ (t){if(t&&"string"==typeof t){var i=this.getPublisher(t);i?i.resumeEffect():this.logger.error("zc.re.0 publisher doesn't exist")}else this.logger.error("zc.re.0 streamid format error")}
unloadEffect ƒ (t){return t&&"number"==typeof t?(delete this.stateCenter.audioEffectBuffer[t],!0):(this.logger.error("zc.ue.0 params error"),!1)}
startMixingAudio ƒ (t,i,n){if(this.logger.debug("zc.sma.0 call"),!t||"string"!=typeof t)return this.logger.error("zc.sma.0 stream id error"),!1;if(!i)return this.logger.error("zc.sma.0 no audio"),!1;var l=this.getPubli…
stopMixingAudio ƒ (t){if(!t||"string"!=typeof t)return this.logger.error("zc.sma.1 param streamid format error"),!1;var i=this.getPublisher(t);return i?i.stopMixingAudio():(this.logger.error("zc.sma.1 publisher doesn'…
setMixingAudioVolume ƒ (t,i){if(this.logger.debug("zc.sma.2 call"),!t||"string"!=typeof t||"number"!=typeof i||i<0||i>100)return this.logger.error("zc.sma.2 param error"),!1;var n=this.getPublisher(t);return n?n.audioMixin…
getPublisher ƒ (t){var i=null,n=this.streamCenter.getTotalStreamId(t);return this.streamCenter.publisherList[n]&&this.streamCenter.publisherList[n].publisher&&(i=this.streamCenter.publisherList[n].publisher),i}
startScreenShotChrome ƒ (t){if(!i.screenShotReady)return this.logger.error('zc.b.ss Please install the extension:1. Go to chrome://extensions  2. Check: "Enable Developer mode   3. Click: "Load the unpacked extension... 4. …
startScreenSharing ƒ (t,i,n){var l=this;"getDisplayMedia"in navigator.mediaDevices?navigator.mediaDevices.getDisplayMedia({audio:i,video:{frameRate:t.frameRate||15,displaySurface:t.displaySurface||"minitor"}}).then(funct…
startScreenShotFirFox ƒ (t,i,n,l){var p=this,v={video:{width:t.width||window.screen.width,height:t.height||window.screen.height,frameRate:t.frameRate||15,bitRate:t.bitRate||800},audio:n};v.video.mediaSource=i,navigator.medi…
stopScreenShot ƒ (){this.stateCenter.screenShotStream.getTracks().forEach(function(t){t.stop()}),window.postMessage({type:"SS_UI_CANCEL",text:"start"},"*")}
switchDevice ƒ (t,i,n,l,p){var v=this;"audio"!==t&&"video"!==t||"string"!=typeof n?this.logger.error("zg.sd.0 param error"):this.enumDevices(function(T){var E=T.cameras,S=T.microphones;E.find(function(t){return t.d…
WebrtcOnPublishStateUpdateHandle ƒ (t,i,n){this.stateCenter.publishStreamList[i].state==T.ENUM_PUBLISH_STREAM_STATE.publishing&&this.onPublishStateUpdate(t,i,n)}
setCDNInfo ƒ (t,i){t.urls_flv=i.urls_flv,t.urls_hls=i.urls_m3u8,t.urls_https_flv=i.urls_https_flv,t.urls_https_hls=i.urls_https_m3u8,t.urls_rtmp=i.urls_rtmp}
loginBodyData ƒ (){return{id_name:this.stateCenter.idName,nick_name:this.stateCenter.nickName,role:this.stateCenter.role,token:this.stateCenter.token,version:T.PROTO_VERSION,room_name:this.stateCenter.roomid,user_st…
screenStreamFrom ƒ (t,i,n){var l=this,p={};p.audio={mandatory:{chromeMediaSource:"desktop",chromeMediaSourceId:t}},p.video={mandatory:{chromeMediaSource:"desktop",chromeMediaSourceId:t,maxWidth:window.screen.width,maxH…
filterStreamList ƒ (t){var i={},n={},l={},p=[],v=0;for(var T in this.stateCenter.streamList.forEach(function(i,n){i.stream_id==t&&(v=n)}),this.stateCenter.streamList[v])"urls_flv"!=T&&"urls_https_flv"!=T||(i[T]=this.st…
voiceChange ƒ (t,i){return t&&"number"==typeof t?i&&"string"==typeof i?this.getPublisher(i).voiceChange(t):(this.logger.error("zc.vc.0 stream id error"),!1):(this.logger.error("zc.vc.0 mult error"),!1)}
voiceBack ƒ (t){return this.getPublisher(t).voiceBack()}
enumDevices ƒ (t,n){i.enumDevices(t,n)}
bindWindowListener ƒ (){var t=this,i=navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPhone/i)?"pagehide":"beforeunload";window.addEventListener(i,function(i){for(var n in window.event.cancelBubble=!0,t.st…
init ƒ (){this.bindSocketHandler(),this.bindStreamHandler(),this.bindHeatBeatHandler(),this.bindRoomHandler(),this.bindMessageHandler(),this.bindLiveHandler(),this.bindStreamCenterHandler()}
bindSocketHandler ƒ (){var t=this;this.socketCenter=new S.SocketCenter(this.logger,this.stateCenter),this.socketCenter.registerRouter("push_signal",function(i){t.liveHandler.handlePushSignalMsg(i)}),this.socketCenter.ge…
bindStreamHandler ƒ (){var t=this;this.streamHandler=new M.StreamHandler(this.logger,this.stateCenter,this.socketCenter),this.streamHandler.onStreamUpdated=function(i,n){t.onStreamUpdated(i,n)},this.streamHandler.onPubl…
bindHeatBeatHandler ƒ (){var t=this;this.heartBeatHandler=new L.HeartBeatHandler(this.logger,this.stateCenter,this.socketCenter),this.heartBeatHandler.onRecvReliableMessage=function(i,n,l){t.onRecvReliableMessage(i,n,l)},…
bindRoomHandler ƒ (){var t=this;this.roomHandler=new R.RoomHandler(this.logger,this.stateCenter,this.socketCenter),this.roomHandler.loginSuccessCallBack=function(i,n){var l=n.body.hearbeat_interval<T.MINIUM_HEARTBEAT_…
bindMessageHandler ƒ (){var t=this;this.messageHandler=new e.MessageHandler(this.logger,this.stateCenter,this.socketCenter),this.messageHandler.onRecvCustomCommand=function(i,n,l){t.onRecvCustomCommand(i,n,l)},this.messa…
bindLiveHandler ƒ (){var t=this;this.liveHandler=new w.LiveHandler(this.logger,this.stateCenter,this.socketCenter),this.liveHandler.onRecvEndJoinLiveCommand=function(i,n,l,p){t.onRecvEndJoinLiveCommand(i,n,l,p)},this.…
bindStreamCenterHandler ƒ (){var t=this;this.streamCenter.onPlayStateUpdate=function(i,n,l){t.onPlayStateUpdateHandle(i,n,l)},this.streamCenter.onPlayQualityUpdate=function(i,n){t.onPlayQualityUpdate(i,n)},this.streamCenter.o…
config ƒ (t){return this.logger.debug("zb.cm.cf call"),E.ClientUtil.checkConfigParam(t,this.logger)?(this.stateCenter.appid=t.appid,this.stateCenter.server=t.server,this.stateCenter.idName=t.idName,this.state…
login ƒ (t,i,n,l,p){"string"==typeof t?"string"==typeof n?1===i||2===i?this.roomHandler.login(t,i,n,null,l,p):this.logger.error("zb.rh.lg role error"):this.logger.error("zb.rh.lg token type error"):this.logg…
loginWithAuthor ƒ (t,i,n,l,p,v){"string"!=typeof t||"string"!=typeof n||"string"!=typeof l||1!==i&&2!==i?this.logger.error("zb.rh.lg params error"):this.roomHandler.login(t,i,n,l,p,v)}
logout ƒ (){return this.roomHandler.logout()}
setUserStateUpdate ƒ (t){"boolean"==typeof t?this.roomHandler.setUserStateUpdate(t):console.error("setUserStateUpdate param error")}
onUserStateUpdate ƒ (t,i){}
onGetTotalUserList ƒ (t,i){}
onUpdateOnlineCount ƒ (t,i){}
onGetAnchorInfo ƒ (t,i){}
release ƒ (){this.logger.debug("zb.cm.rl call"),this.roomHandler.setRunState(T.ENUM_RUN_STATE.logout),this.roomHandler.resetRoom(),this.logger.stopLogServer(),this.logger.debug("zb.cm.rl call success")}
sendCustomCommand ƒ (t,i,n,l){return"string"!=typeof i&&"object"!=typeof i?(this.logger.error("zb.mh.scc params error"),!1):this.messageHandler.sendCustomCommand(t,i,n,l)}
onRecvCustomCommand ƒ (t,i,n){}
sendRoomMsg ƒ (t,i,n,l,p){this.messageHandler.sendRoomMsg(t,i,n,l,p)}
onRecvRoomMsg ƒ (t,i,n){}
sendReliableMessage ƒ (t,i,n,l){this.messageHandler.sendReliableMessage(t,i,n,l)}
onRecvReliableMessage ƒ (t,i,n){}
sendBigRoomMessage ƒ (t,i,n,l,p){this.messageHandler.sendBigRoomMessage(t,i,n,l,p)}
onRecvBigRoomMessage ƒ (t,i){}
sendRelayMessage ƒ (t,i,n,l){this.messageHandler.sendRelayMessage(t,i,n,l)}
requestJoinLive ƒ (t,i,n,l){return this.liveHandler.requestJoinLive(t,i,n,l)}
onRecvJoinLiveRequest ƒ (t,i,n,l){}
inviteJoinLive ƒ (t,i,n,l){return this.liveHandler.inviteJoinLive(t,i,n,l)}
onRecvInviteJoinLiveRequest ƒ (t,i,n,l){}
endJoinLive ƒ (t,i,n){return this.liveHandler.endJoinLive(t,i,n)}
onRecvEndJoinLiveCommand ƒ (t,i,n,l){}
respondJoinLive ƒ (t,i,n,l){return this.liveHandler.respondJoinLive(t,i,n,l)}
updateMixStream ƒ (t,i,n){return this.streamHandler.updateMixStream(t,i,n)}
stopMixStream ƒ (t,i,n){return this.streamHandler.stopMixStream(t,i,n)}
publishTarget ƒ (t,i,n){return this.streamHandler.publishTarget(t,i,n)}
updateStreamExtraInfo ƒ (t,i){return this.streamHandler.updateStreamExtraInfo(t,i)}
onStreamUrlUpdate ƒ (t,i,n){}
onStreamUpdated ƒ (t,i){}
onStreamExtraInfoUpdated ƒ (t){}
onPlayStateUpdate ƒ (t,i,n){}
onVideoSizeChanged ƒ (t,i,n){}
onPlayQualityUpdate ƒ (t,i){}
onPublishStateUpdate ƒ (t,i,n){}
onPublishQualityUpdate ƒ (t,i){}
onDisconnect ƒ (t){}
onKickOut ƒ (t){}
onPlayStateUpdateHandle ƒ (t,i,n){1==t&&this.stopPlayingStream(i),this.onPlayStateUpdate(t,i,n)}
onPublishStateUpdateHandle ƒ (t,i,n){var p=this;0==t?this.stateCenter.publishStreamList[i]&&(this.stateCenter.publishStreamList[i].state==l.ENUM_PUBLISH_STREAM_STATE.tryPublish?(this.stateCenter.publishStreamList[i].state=l.ENUM…
resetStreamCenter ƒ (){if(this.stateCenter.customUrl&&(this.stateCenter.customUrl=null),this.streamCenter.reset(),!this.socketCenter.isDisConnect())for(var t in this.stateCenter.publishStreamList)this.stateCenter.publis…
handleFetchWebRtcUrlRsp ƒ (t){var i=t.body.stream_id;if("push"===t.body.ptype)this.stateCenter.publishStreamList[i]?this.streamCenter.startPublishingStream(i,t.body.urls):this.logger.error("cb.cm.hfwur no streamid to publish"…




