'use strict';

import io from 'socket.io-client';
import Chat from '../src/Chat';
import { expect } from "chai";
import sinon from "sinon";
let socket;

describe("Socket Server Integration tests", () => {

	sinon.stub(Chat, 'init');

	beforeEach((done) =>{
		socket = io.connect("http://localhost:3000");
		socket.on('connect', () => {
				done();
			});
	});

	afterEach((done) => {
		if (socket.connected) {
			socket.disconnect();
		}
		done();
	});

	it("Should be able to make a connection to the socket.io server", (done) => {
		socket.once('client-connected', (message) => {
			console.log('message from the integration tests means we are connected')
			expect(message).to.equal('a user connected');

			console.log(Chat.init.called); // false


			done();
		});

	});

});