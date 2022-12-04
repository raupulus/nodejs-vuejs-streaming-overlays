interface SocketClientOptionsInterface {
    path: string;
    bytesRead: number | null | undefined;
    setkeepAlive: boolean | null | undefined;
    onread: {
        buffer: Buffer | null | undefined;
        callback: Function;
    }
}
