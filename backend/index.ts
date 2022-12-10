import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { SocketUnixClient } from './src/models/SocketUnixClient';
import { WebSocketServer } from './src/models/WebSocketServer';
dotenv.config();

const app: Express = express();
const cors = require('cors')
app.use(cors())

const port = process.env.PORT;
const appUrl = process.env.APP_URL;
const socketPath = process.env.SOCKET_KEYCOUNTER_PATH;

var keyCounterStats = {
  pulsations_current: 0,
  pulsations_total: 0,
  pulsation_average: 0,
};

function callbackDataSocket(nread: any, buf: any) {
  try {
    const dataRaw = buf.slice(0, nread).toString();
    const data = JSON.parse(dataRaw);

    console.log('Pulsaciones: ' + data.streak?.pulsations_current);

    if (data && data.session && data.streak) {
      keyCounterStats = { ...keyCounterStats, ...data.session, ...data.streak }
    }

    if (webSocketServer) {
      webSocketServer.emit('keycounter', keyCounterStats);
    }
  } catch (error) {
    console.log('Error al parsear el JSON');
  }
}

let webSocketHandlers = [
  {
    event: 'connection',
    callback: (socket: any) => {
      console.log('New Client Connected');
    }
  },
  {
    event: 'disconnect',
    callback: () => {
      console.log('Client Disconnected');
    }
  },
  {
    event: 'keycounter',
    callback: () => { console.log('LLEGA BIEN') }
  }
];

let webSocketServer = new WebSocketServer(webSocketHandlers);


// Se inicia el socket solo si lo hemos establecido
if (socketPath) {
  const socketUnixKeycounter = new SocketUnixClient(socketPath, callbackDataSocket);
}

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
