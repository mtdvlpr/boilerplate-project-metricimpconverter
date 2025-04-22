const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const { test } = require("mocha");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert 21L to gal", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "21L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 21);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 5.54762);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, "21 liters converts to 5.54762 gallons");
        done();
      });
  });

  test("Convert invalid 32g", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test("Convert invalid 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test("Convert invalid 3/7.2/4kilomegram", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegram" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});
