const units = new Set(["gal", "l", "mi", "km", "lbs", "kg"]);

function ConvertHandler() {
  this.getNum = function (input) {
    if (units.has(input)) return 1;
    if (input.includes("//")) return null;
    let nrs = input
      .split(/[^0-9.\/-]/)[0]
      .split("/")
      .map((nr) => nr.trim())
      .filter((nr) => !!nr);
    if (!nrs.length) return null;

    const parseNr = (nr) => {
      const parsed = nr.includes(".") ? parseFloat(nr) : parseInt(nr);
      if (isNaN(parsed)) return null;
      return parsed;
    };

    if (nrs.length === 1) return parseNr(nrs[0]);
    if (nrs.length > 2) return null;

    return parseNr(nrs[0]) / parseNr(nrs[1]);
  };

  this.getUnit = function (input) {
    const parsed = input
      .split(/[0-9.\/-]/)
      .filter((el) => !!el)[0]
      .toLowerCase()
      .trim();
    if (!units.has(parsed)) return null;
    return parsed == "l" ? "L" : parsed;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitMap = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return unitMap[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversionMap = {
      gal: (num) => num * galToL,
      L: (num) => num / galToL,
      mi: (num) => num * miToKm,
      km: (num) => num / miToKm,
      lbs: (num) => num * lbsToKg,
      kg: (num) => num / lbsToKg,
    };
    return +conversionMap[initUnit](initNum).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
}

module.exports = ConvertHandler;
