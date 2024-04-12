const expect = require("chai").expect;
const request = require("request");

describe("backend State code", () => {
  it("Is successful", (done) => {
    request("http://localhost:3001/api/favorites", (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
