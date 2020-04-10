$(function () {
	let socket = io();

	/***************************************************************************************************************
	 * Form logic
	 ****************************************************************************************************************/

	// submit chat message to server
	$('#chat').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	// capture username
	$('#join').submit(function(e){
		e.preventDefault();
		socket.emit('join', $('#name').val());
		$('#name').val('');
		return false;
	});

	/***************************************************************************************************************
	 * Message passing
	 ***************************************************************************************************************/

	// receive chat message from server and display it
	socket.on('chat message', function(msg){
		console.log('message received outputting chat');
		$('#chat-messages').append($('<li>').text(msg));
	});

	// receive the user connected/disconnected broadcast from the server
	socket.on('broadcast',function(data) {
		$('#chat-messages').append($('<li>').text(data.description));
	});

	// output messages when a user joins the chat
	socket.on('update', function(data){
		$('#system-updates').append($('<li>').text(data));
	});


});