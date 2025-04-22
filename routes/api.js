"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    if (!input) return res.send("invalid unit");

    let initNum, initUnit, returnNum, returnUnit;
    try {
      initNum = convertHandler.getNum(input);
      initUnit = convertHandler.getUnit(input);
      if (initNum === null && initUnit === null) {
        throw new Error("invalid number and unit");
      }
      if (initNum === null) throw new Error("invalid number");
      if (initUnit === null) throw new Error("invalid unit");
      returnNum = convertHandler.convert(initNum, initUnit);
      returnUnit = convertHandler.getReturnUnit(initUnit);
    } catch (error) {
      return res.send(error.message);
    }

    const responseString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: responseString,
    });
  });
};
