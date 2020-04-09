$(function () {
	let socket = io();

	// submit chat message to server
	$('form').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	// receive chat message from server and display it
	socket.on('chat message', function(msg){
		console.log('message received outputting chat');
		$('#chat-messages').append($('<li>').text(msg));
	});

	// receive the user connected/disconnected broadcast from the server
	socket.on('broadcast',function(data) {
		$('#chat-messages').append($('<li>').text(data.description));
	});

	// generate a username for now from the socket id
	socket.on('client-connected', function(msg){
		let name = `${socket.id}_user`;
		socket.emit('join', name);
	});

	// output welcome message to a new user when they join
	socket.on('welcome-user', function(data){
		$('#system-updates').append($('<li>').text(data));
	});

	// inform other users when a new user joins
	socket.on('update', function(data){
		$('#system-updates').append($('<li>').text(data.description));
	});


});