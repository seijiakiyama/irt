const expect = require('chai').expect

const triCalc = require('../index');

describe('TRI (IRT) Calc', function () {
  it('returns the correct probability', function () {
    let testParams = require('./items.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    testParams.items.forEach(function (item) {
      let res = triCalc.getProbability(testParams.student, item);
      console.log(item.difficulty, res);
    })
  })
})

describe('TRI (IRT) Information', function () {
  it('returns the correct information', function () {
    let testParams = require('./items.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    testParams.items.forEach(function (item) {
      let res = triCalc.getInformation(testParams.student, item);
      console.log(item.difficulty, res);
    })
  })
})

describe('TRI (IRT) Calibration, Zero Student', function () {
  it('returns the correct calibrated hability', function () {
    let testParams = require('./items2.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    let res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log(res);
  })
})

describe('TRI (IRT) Calibration, Bad Student', function () {
  it('returns the correct calibrated hability', function () {
    let testParams = require('./items3.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    let res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log(res);
  })
})

describe('TRI (IRT) Calibration, Good Student', function () {
  it('returns the correct calibrated hability', function () {
    let testParams = require('./items4.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    let res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log(res);
  })
})

describe('TRI (IRT) Calibration, What Student', function () {
  it('returns the correct calibrated hability', function () {
    let testParams = require('./items5.json');
    testParams.student.proficiency = 0;
    expect(testParams).to.not.be.null;
    let res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log(res);
  })
})

describe('TRI (IRT) Calibration, Many Iterations', function () {
  it('returns the correct calibrated hability', function () {
    let testParams = require('./items4.json');
    expect(testParams).to.not.be.null;
    testParams.student.proficiency = 0;
    let res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log('first', res.proficiency);
    testParams.student.proficiency = res.proficiency;
    res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log('second', res.proficiency);
    testParams.student.proficiency = res.proficiency;
    res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log('third', res.proficiency);
    testParams.student.proficiency = res.proficiency;
    res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log('forth', res.proficiency);
    testParams.student.proficiency = res.proficiency;
    res = triCalc.calibrateProficiency(testParams.student, testParams.items);
    console.log('last', res.proficiency);
  })
})
