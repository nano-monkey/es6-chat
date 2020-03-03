'use strict';

import request from 'request';
import { expect } from "chai";

describe("Server integration tests", () => {
    it('localhost:3000 should return a status code of 200', (done) =>  {
        request('http://localhost:3000' , (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});