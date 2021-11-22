import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan'
import menuRouter from './router/menu.js';

const PORT = 3000;
const server = express();

server.use(morgan('tiny'));
server.use(express.json());
server.use(cors({
    origin: 'http://127.0.0.1:5500',
}))

server.use(express.static(path.resolve('static')));

server.use('/menu', menuRouter);

server.use((error, req, res, next) => {
    console.error(error);
})

server.listen(PORT, () => console.log(`server running on ${PORT} port`));