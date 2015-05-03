var expect = require('expect.js');
var http = require('http');

describe('test http request', function () {
  it('should return 200 status code', function (done) {
    http.get("http://127.0.0.1:3000", function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('should return 200 status code', function (done) {
    http.get("http://127.0.0.1:3001", function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('should return 200 status code', function (done) {
    http.get("http://127.0.0.1:3002", function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
