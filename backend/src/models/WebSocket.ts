/*
class WebSocketServer {
  private server: Server;
  private io: SocketIO.Server;

  constructor() {
    this.server = createServer();
    this.io = socketio(this.server);
    this.io.on('connection', this.onConnection);
  }

  private onConnection = (socket: SocketIO.Socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  };

  public start = (port: number) => {
    this.server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  };
}
*/
