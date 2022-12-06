import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { SocketUnixClient } from './src/models/SocketUnixClient';
dotenv.config();

const app: Express = express();
const cors = require('cors')
app.use(cors())

const port = process.env.PORT;
const appUrl = process.env.APP_URL;
const socketPath = process.env.SOCKET_KEYCOUNTER_PATH;

const keyCounterStats = {current: 0, max: 0, min: 0};

function callbackDataSocket(nread:any, buf: any) {
    console.log('Data: ' + buf.slice(0, nread).toString());

    let value = parseInt(buf.slice(0, nread).toString());

    keyCounterStats.current = value;


     io.emit('keycounter', keyCounterStats);

}

// Se inicia el socket solo si lo hemos establecido
if (socketPath) {
    const socketUnixKeycounter = new SocketUnixClient(socketPath, callbackDataSocket);




}

// TODO: extraer a una clase independiente

import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: false
  }
});

io.on('connection', (socket: any) => {
  console.log('a user connected');
  if (socketPath) {
    socket.broadcast.emit('keycounter', keyCounterStats);
  }

  socket.on('keycounter', () => {
    console.log('Recibe keycounter desde el cliente');

    io.emit('keycounter', keyCounterStats);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



app.get('/', (req: Request, res: Response) => {
    res.send('Página Principal');
    });

app.get('/keycounter', (req: Request, res: Response) => {
    res.send('Este es el keycounter!');
    });

/**
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 */

app.listen(port, () => {
    console.log(`Example app listening at ${appUrl}`);
});
