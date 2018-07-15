const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  // Set the test suite title to match HTTP verb and route it will test
  describe("GET /", () => {

    // Status code of 200 indicates that the request was successful
    it("should return status code 200", (done) => {

      // Send GET request to the base URL
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
	expect(body).toContain("Welcome to Blocipedia-node");

        // done method lets Jasmine know test is completed
        done();
      });
    });
  });
});
