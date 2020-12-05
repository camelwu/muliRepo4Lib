enum CONNECT_STATE {
    DEFAULT = 0, // 默认连接状态
    CONNECTED = 1, // 当前处于连接成功状态
    DISCONNECTED = 2, // 连接成功后断开链接
    ERROR = -1, // 链接失败
}

export default CONNECT_STATE;
