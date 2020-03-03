'use strict';

import io from 'socket.io-client';
import { expect } from "chai";
let socket;


/**
 * OK what do we care about?
 *
 * Integration tests:
 *
 *
 * the socket is available and it can send and receive
 * messages from a client - copy example from here: https://gist.github.com/tozwierz/76be651cc7a7d5c06ea290eec8a0ed73
 *
 * app-specific Behaviour tests:
 * When the socket receives a specific 'chat message' event from the client
 * it emits back a 'chat message' message to the client CONTAINING the
 * same message.
 * I think we create another module called Chat and pass the socket
 * server to that
 *
 *
 *
 *
 */

describe("Socket Server tests", () => {

        beforeEach((done) =>{

                socket = io.connect("http://localhost:3000");
                socket.on('connect', () => {
                        console.log('connected');
                        done();
                });
        });

        afterEach((done) => {
                // Cleanup
                if (socket.connected) {
                        socket.disconnect();
                        console.log('disconnected');
                }
                done();
        });

        it("Should be able to make a connection to the socket.io server", () => {


        });

});