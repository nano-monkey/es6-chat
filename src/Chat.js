'use strict';

/**
 * PRIVATE
 */
let chatServer;
let chatClient;

function chatMessage(msg){
	chatServer.emit('chat message', msg);
}

function userJoinedChat(name) {

		// this is sent to the new user only
	  chatClient.emit('welcome-user', `Hi ${name}! You have connected to the chat server`);

		// this is sent to all the other connected clients to let them  know someone else has joined
	  chatClient.broadcast.emit('update', { description: `${name} has joined the server`});

}

/**
 * PUBLIC
 */

/**
 * Called by index.js to initialize the Chat application.
 *
 * @param socket The socket object for the connected client.
 * @param io The socket server
 */

function init(socket, io){

	chatServer = io;
	chatClient = socket;

	chatClient.on('chat message', chatMessage);
	chatClient.on('join', userJoinedChat);

}

export {init};
