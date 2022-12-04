import { NetConnectOpts, Socket, SocketAddress } from "net";

export class SocketUnixClient {
    public net = require('node:net');
    public client: any;

    public options:SocketClientOptionsInterface;

    private timeoutConnect: any;

    public test = 'CONTEXTO CORRECTO';

    constructor(path: string,
                callback: Function,
                options: SocketClientOptionsInterface|null = null) {
        this.options = {...{
            path: path,
            bytesRead: 2048,
            setkeepAlive: true,
            onread: {
                buffer: Buffer.alloc(2048),
                callback: callback
            }
        }, ...options};

        if (this.net) {
            this.connect();
        }
    }

    /**
     * Maneja el evento de error del socket
     *
     * @param error
     */
    handleOnError(error: Error) {
        console.log('Error: ' + error);
        //this.handleOnClose(true);
    }

    /**
     * Maneja cuando se cierra la conexión con el socket
     *
     * @param hasError
     */
    handleOnClose(hasError: boolean) {
        console.log('Conexión cerrada, hay error?: ' + hasError);

        this.timeoutConnect = setTimeout(() => this.connect(), 1000);
    }

    /**
     * Maneja el evento de fin de conexión con el socket, cuidado que se puede dar junto al evento "close" y lanzar/ejecutar dos veces.
     */
    handleOnEnd() {
        //this.handleOnClose(true);
    }

    async close() {
        if (this.client) {
            try {
                this.client.end();
            } catch (error) {
                console.log(error);
            } finally {
                this.client = null;
            }
        }
    }

    async connect() {
        console.log('Conectando al socket en: ' + this.options.path);

        try {
            let client =  this.net.createConnection(this.options);

            // Asignación y manejo de eventos sobre el socket client
            client.on('error', (error: Error) => this.handleOnError(error));
            client.on('close', (hasError: boolean) => this.handleOnClose(hasError));
            client.on('end', () => this.handleOnEnd());

            this.client = client;
        } catch (e) {
            console.log('ERROR AL CONECTAR AL SOCKET');
            //this.handleOnClose(true);
        }

    }
}
