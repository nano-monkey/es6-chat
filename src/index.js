'use strict';

import express from 'express';
import {init} from './Chat'
import {createServer} from 'http';
import SocketIO from 'socket.io';
const app = express();
const http = createServer(app);
const io = SocketIO(http);
const people = {};

http.listen(3000, () => console.log('listening on *:3000'));

// Set up the public directory and serve index.html
app.use(express.static('src/public'));
app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
	socket.emit('client-connected', 'a user connected');

	io.sockets.emit('broadcast',{ description: 'new user connected!'});

	socket.on('join', (name) => {
		people[socket.id] = name;
		socket.emit('update', 'You have connected to the chat server');
		io.sockets.emit('update', `${name} has joined the server`)
	});

	init(socket, io);

	socket.on('disconnect', () => {
		console.log('user disconnected');
		io.sockets.emit('broadcast',{ description: 'user disconnected!'});
	});
});

