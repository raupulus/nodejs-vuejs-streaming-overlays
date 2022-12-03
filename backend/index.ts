import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const appUrl = process.env.APP_URL;


const net = require('node:net');
//const fs = require('node:fs');

const socketPath = process.env.SOCKET_PATH;

console.log('Conectando al socket en: ' + socketPath);

function callbackDataSocket(nread:any, buf: any) {
    console.log('Data: ' + buf.slice(0, nread).toString());
}

const client = net.createConnection({
    path: socketPath,
    bytesRead: 2048,
    setkeepAlive: true,
    onread: {
        buffer: Buffer.alloc(2048),
        callback: callbackDataSocket
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Página Principal');
    });

app.get('/keycounter', (req: Request, res: Response) => {
    res.send('Este es el keycounter!');
    });

app.listen(port, () => {
    console.log(`Example app listening at ${appUrl}`);
});
