'use strict';

import express from 'express';
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
	// when we get the message from the client, we send it back to display on screen
	socket.on('chat message', (msg) => {
		console.log(`message: ${msg}`);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => console.log('user disconnected'));
});

