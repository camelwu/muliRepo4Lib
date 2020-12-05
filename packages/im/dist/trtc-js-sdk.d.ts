// export = trtcJsSdk;
declare module 'trtc-js-sdk' {
    namespace Logger {
        type TRACE = 0;
        type DEBUG = 1;
        /** Outputs logs of the INFO, WARNING and ERROR levels. */
        type INFO = 2;
        /** Outputs logs of the WARNING and ERROR levels. */
        type WARNING = 3;
        /** Outputs logs of the ERROR level. */
        type ERROR = 4;
        /** Outputs no log. */
        type NONE = 5;
        function setLogLevel(level: DEBUG | INFO | WARNING | ERROR | NONE): void;
        /**
         * Enables Log Upload
         *
         * Call this method to enable log upload to Agora’s server.
         *
         * The log-upload function is disabled by default, if you need to enable this function, please call this method before all the other methods.
         *
         * **Note:**
         *
         * If the user fails to join the channel, the log information is not available on Agora’s server.
         * @example `TRTC.Logger.enableLogUpload();`
         */
        function enableLogUpload(): void;
        /**
         * Disables Log Upload
         *
         * This method disables log upload.
         *
         * By default, the log-upload function is disabled. If you have used {@link enableLogUpload}, call this method when you need to stop uploading the log.
         * @example `TRTC.Logger.disableLogUpload();`
         */
        function disableLogUpload(): void;
    }
    function checkSystemRequirements(): Promise<boolean>;
    function isScreenShareSupported(): boolean;
    function getDevices(): Promise<Array<MediaDeviceInfo>>;
    function getCameras(): Promise<Array<MediaDeviceInfo>>;
    function getMicrophones(): Promise<Array<MediaDeviceInfo>>;
    function getSpeakers(): Promise<Array<MediaDeviceInfo>>;
    /**
     * @description 创建一个实时音视频通话的客户端对象，在每次会话中仅需要调用一次。 
     *              通常一个客户端对象跟一个用户 ID(userId) 绑定，同一个页面中可以有多个不同的客户端对象，每个客户端对象跟不同的用户ID绑定
     *              比如：你可以使用一个客户端对象负责推送本地音视频流和接收 远端流，同时使用另外一个客户端对象负责推送屏幕分享流，但是不接收远端流
     * Name	Type	Attributes	Description
sdkAppId	number		
sdkAppId

userId	string		
用户ID

userSig	string		
userSig 签名

mode	string		
应用场景，目前支持以下两种场景：

'videoCall' 实时通话模式
'live' 互动直播模式
streamId	string	<optional>
绑定腾讯云直播 CDN 流 ID，设置之后，您就可以在腾讯云直播 CDN 上通过标准直播方案（FLV|HLS）播放该用户的音视频流。 限制长度为64字节，可以不填写，一种推荐的方案是使用 “sdkappid_roomid_userid_main” 作为 streamid，这样比较好辨认且不会在您的多个应用中发生冲突。

【特殊说明】要使用腾讯云直播 CDN，您需要先在控制台 中的功能配置页开启“启动自动旁路直播”开关。
【参考文档】CDN 旁路直播。
userDefineRecordId	string	<optional>
设置云端录制完成后的回调消息中的 "userdefinerecordid" 字段内容，便于您更方便的识别录制回调。

【推荐取值】限制长度为64字节，只允许包含大小写英文字母（a-zA-Z）、数字（0-9）及下划线和连词符。
【参考文档】云端录制。
pureAudioPushMode	number	<optional>
纯音频推流模式，需要旁路直播和录制时需要带上此参数:

1 表示本次是纯音频推流，不需要录制 MP3 文件
2 表示本次是纯音频推流，录制文件为 MP3
     * @param {Object} config配置
     * @static
     * @example `TRTC.createClient();`
     */
    function createClient(e: Object): Object;
    /**
     * @description 创建一个本地流 Stream 对象，本地流 Stream 对象通过 publish() 方法发布本地音视频流。
     * @note 一个音视频流 Stream 中最多只能包含一个音频 track 和一个视频 track。
     * @param e 
     * @static
     */
    function createStream(e: Object): Object;

}