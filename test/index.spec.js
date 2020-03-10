'use strict';

import request from 'request';
import { expect } from "chai";

describe("Express integration tests", () => {
	it('localhost:3000 should return a status code of 200', (done) =>  {
		request('http://localhost:3000' , (error, response, body) => {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});

	it('localhost:3000 should return index.html for the / route', (done) =>  {
		request('http://localhost:3000' , (error, response, body) => {

			// @todo
			// expect app.get to be called with '/'
			// expect res.sendFile called with `${__dirname}/index.html`

			done();
		});
	});
});