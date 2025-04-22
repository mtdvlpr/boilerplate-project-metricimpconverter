const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", function (done) {
    assert.equal(convertHandler.getNum("32kg"), 32);
    done();
  });

  test("Decimal Input", function (done) {
    assert.equal(convertHandler.getNum("3.2kg"), 3.2);
    done();
  });

  test("Fractional Input", function (done) {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
    done();
  });

  test("Fractional Input with Decimal", function (done) {
    assert.equal(convertHandler.getNum("1.5/2kg"), 0.75);
    done();
  });

  test("Invalid Input (double fraction)", function (done) {
    assert.equal(convertHandler.getNum("1/2/3kg"), null);
    done();
  });

  test("No Numerical Input", function (done) {
    assert.equal(convertHandler.getNum("kg"), 1);
    done();
  });

  test("Invalid Unit Input", function (done) {
    assert.equal(convertHandler.getUnit("32kilo"), null);
    done();
  });

  test("Valid km Input", function (done) {
    assert.equal(convertHandler.getUnit("32kg"), "kg");
    done();
  });

  test("Valid Lbs Input", function (done) {
    assert.equal(convertHandler.getUnit("32lbs"), "lbs");
    done();
  });

  test("Valid L Input", function (done) {
    assert.equal(convertHandler.getUnit("32L"), "L");
    done();
  });

  test("Valid Gal Input", function (done) {
    assert.equal(convertHandler.getUnit("32gal"), "gal");
    done();
  });

  test("Valid mi Input", function (done) {
    assert.equal(convertHandler.getUnit("32mi"), "mi");
    done();
  });

  test("Valid km SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    done();
  });

  test("Valid L SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    done();
  });

  test("Valid gal SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    done();
  });

  test("Valid lbs SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    done();
  });

  test("Valid kg SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    done();
  });

  test("Valid mi SpellOut", function (done) {
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    done();
  });

  test("Valid conversion gal to L", function (done) {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    done();
  });

  test("Valid conversion L to gal", function (done) {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
    done();
  });

  test("Valid conversion mi to km", function (done) {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    done();
  });

  test("Valid conversion km to mi", function (done) {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
    done();
  });

  test("Valid conversion lbs to kg", function (done) {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    done();
  });

  test("Valid conversion kg to lbs", function (done) {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    done();
  });
});
