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

	console.log('user connected');
	// this is only used by the integration test!
	socket.emit('client-connected', 'a user connected');

	// this is sent to all clients
	io.sockets.emit('broadcast',{ description: 'new user connected!'});

	socket.on('join', (name) => {
		people[socket.id] = name;

		// this is sent to the new user only
		socket.emit('welcome-user', `Hi ${name}! You have connected to the chat server`);

		// this is sent to all the other connected clients to let them  know someone else has joined
		socket.broadcast.emit('update', { description: `${name} has joined the server`});
	});

	init(socket, io);

	socket.on('disconnect', () => {
		console.log('user disconnected');
		io.sockets.emit('broadcast',{ description: 'user disconnected!'});
	});
});

