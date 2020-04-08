'use strict';

import express from 'express';
import {init} from './Chat'
import {createServer} from 'http';
import SocketIO from 'socket.io';
const app = express();
const http = createServer(app);
const io = SocketIO(http);

http.listen(3000, () => console.log('listening on *:3000'));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
	socket.emit('client-connected', 'a user connected');

	io.sockets.emit('broadcast',{ description: 'new user connected!'});

	init(socket, io);

	socket.on('disconnect', () => {
		console.log('user disconnected');
		io.sockets.emit('broadcast',{ description: 'user disconnected!'});
	});
});

