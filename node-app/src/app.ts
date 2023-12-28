import dotenv     from 'dotenv';
import { Server } from './models';

// if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
// }

const server = new Server();
server.listen();
