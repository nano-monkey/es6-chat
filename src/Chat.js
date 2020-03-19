'use strict';

let init = (socket) => {
	console.log(socket.id);
	return socket.id;
}

export default {init};
