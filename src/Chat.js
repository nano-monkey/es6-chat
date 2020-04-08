'use strict';

/**
 * PRIVATE
 */
let chatServer;

function chatMessage(msg){
	chatServer.emit('chat message', msg);
}

/**
 * PUBLIC
 */

/**
 * Called by index.js to initialize the Chat application.
 *
 * @param socket The socket object for the connected public.
 * @param io The socket server
 */

function init(socket, io){

	chatServer = io;

	socket.on('chat message', chatMessage);

}

export {init};
