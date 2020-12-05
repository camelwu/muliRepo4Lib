/**
 * @description [声网, 腾讯, 即构]3家sdk的备线，因3家sdk的api和init方法和流程有差别，编写空对象，引入三家SDK。根据适配模式对外暴露方法。
 *              首先，调用`line`参数，根据`line`对sdk初始化`rtc`，再create`Client`；
 *              提供对外的on等方法，请见注释
 * @param {Number} line
 * @param {Object} option
 *
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import AgoraRTC from 'agora-rtc-sdk';
import TRTC from 'trtc-js-sdk';
import { ZegoClient as ZRTC } from 'webrtc-zego';
export interface NetDatas {
    up: Map<string, NetData>;
    down: Map<string, NetData>;
}
export interface NetData {
    video: {
        /** 视频丢包率 */
        vplr: any;
        /** 视频当前延迟 */
        vcd: any;
        /** 视频带宽 */
        vbps: any;
        /** 视频帧率 */
        vfr: any;
        /** 视频分辨率-宽 */
        vfw: any;
        /** 视频分辨率-高 */
        vfh: any;
        /** 视频端到端延迟 */
        ve2ed?: any;
        /** 静音状态 */
        vms?: any;
    };
    audio: {
        /** 音频丢包率 */
        aqlr: any;
        /** 音频带宽 */
        abps: any;
        /** 音频质量 */
        anq: any;
        /** 音频是否静音 */
        ams?: any;
    };
}
export interface Device {
    client: any;
    domId?: string;
    streamID?: number;
    cameraId: string | void | any;
    microphoneId?: string;
    audio?: boolean;
    video?: boolean;
    screen?: boolean;
    mirror?: boolean;
}
export declare type model = {
    mode: 'live' | 'rtc';
    codec: 'vp8' | 'h264';
};
/**
* @description main:主, vice:副
*/
export declare enum streamType {
    main = 0,
    vice = 1
}
export declare enum zegoRole {
    host = 1,
    audience = 2
}
/**
 * @description 因3家sdk的api和init方法和流程有差别，所以先引入skd，编写空对象，根据传入参数的不同，再进行逻辑编写
 */
export default class Rtc extends EventEmitter {
    private token;
    private mainUid;
    private appId;
    private device;
    private roomId;
    private model;
    private domMap;
    private line;
    private sdk;
    rtc: typeof AgoraRTC | ZRTC | typeof TRTC;
    logLevel: number;
    client: any;
    joined: boolean;
    published: boolean;
    localStream: any;
    remoteStreams: any[];
    streamsList: any;
    constructor(line: number);
    /**
     * @description 设置用哪个sdk，公用方法
     */
    switchSdk(line: number): void;
    /**
     * @description 初始化客户端对象
     *
     */
    init(option: any): Promise<void>;
    private loadLoginToken;
    private playRemoteStream;
    private setVideoDomView;
    getstreams(): any;
    getDevices(next: Function): void;
    join(_roomId: string, func: Function): Promise<void>;
    private getVideoDomView;
    publish(): Promise<void>;
    unpublish(): Promise<void>;
    handleEvents(client: any): void;
    /**
     * leave
     */
    leave(): void;
    /**
     *
     * @param type
     */
    private getStream;
    /**
     * muteAudio
     */
    muteAudio(type?: number): any;
    /**
     * unmuteAudio
     */
    unmuteAudio(type?: number): any;
    /**
     * unmuteVideo
     */
    unmuteVideo(type?: number): any;
    /**
     * muteVideo
     */
    muteVideo(type?: number): any;
    /**
     * setVideoProfile
     */
    setVideoProfile(type: number, dpi: string): any;
    /**
     * resume
     */
    resume(uid: number): any;
    /**
     * netData
     */
    private netData;
    /**
     * 获取本地视频数据
     */
    private upDataLocal;
    /**
     * 获取远端视频数据
     */
    private upDataRemote;
    /**
     * 获取全量数据
     */
    getNetStats(): {
        up: any;
        down: any;
    };
    stopNetStats(): void;
}
