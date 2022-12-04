import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { setTimeout } from 'timers/promises';
import { SocketUnixClient } from './src/models/SocketUnixClient';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const appUrl = process.env.APP_URL;
const socketPath = process.env.SOCKET_KEYCOUNTER_PATH;

function callbackDataSocket(nread:any, buf: any) {
    console.log('Data: ' + buf.slice(0, nread).toString());
}

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

app.listen(port, () => {
    console.log(`Example app listening at ${appUrl}`);
});
