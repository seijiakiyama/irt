'use strict';

function getInformation(student, item) {
  var p = getProbability(student, item);
  var c = getCasual(item);
  var a = getDiscrimination(item);
  var q = 1 - p;
  var c2 = Math.pow(c, 2);
  return Math.pow(a, 2) * (q / p) * Math.pow((p - c) / (1 - c), 2); // max 0.25 ('cause it means 50/50 chance)
}

function getProbability(student, item) {
  // Item data
  var c = getCasual(item);
  var b = getDifficulty(item);
  // Student Data
  var t = getProficiency(student);

  var a = getDiscrimination(item);

  var exp = Math.exp((-1 * a) * (t - b));
  return c + (1 - c)  / (1 + exp);
}

//__________________________________________________________________________

function getCasual(item) {
  if (item && item.casualChance && item.casualChance <= 1) {
    return Number(item.casualChance);
  } else {
    return 0; // 1 / Number((item.options || [1,2,3,4,5]).length);
  }
}

//
function getDiscrimination(item) {
  if (item && item.discrimination) {
    return Number(item.discrimination);
  } else {
    return 1;
  }
}

//
function getDifficulty(item) {
  if (item && item.difficulty) {
    return Number(item.difficulty);
  } else {
    return (1 + getCasual()) / 2;
  }
}

//
function getProficiency(student) {
  if (student && student.proficiency) {
    return Number(student.proficiency);
  } else {
    return 0;
  }
}

//
function getCorrect(item, student) {
  if (item && item.correct) {
    return item.correct;
  } else {
    return 0;
  }
}

function calibrateProficiency(student, items) {
  //var iterationItems = [];
  //var j = {t: getProficiency(student)};
  /*for (var k = 0; k < items.length; k++) {
    j.t = iterateThroughProficiency(j.t, iterationItems);
  }*/
  student.proficiency = iterateThroughProficiency(student, items);
  return student;
}

// Newton-Raphson e “Scoring”de Fisher
function iterateThroughProficiency(student, items) {
  var prevProfic = getProficiency(student)
  return prevProfic - Math.pow(getHzao(student, items), -1) * getHzinho(items, student, prevProfic)
}

function getHzinho(items, student, prevProfic) {
  var sum = 0;
  for (var i = 0; i < items.length; i++) {
    var u = getCorrect(items[i]);
    //var p = getProficiency({t:prevProfic},items[i]);
    var p = getProbability(student, items[i]);
    var w = getW(items[i], student, p);
    var a = getDiscrimination(items[i]);
    var c = getCasual(items[i]);
    sum += (u - p) * w * (a * (1 - c))
    // console.log(u,p,w,a,c,sum)
  }
  return sum;
}

function getW(student, item, _p) {
  var p = _p || getProbability(student, item);
  var q = 1 - p;
  var px = getPx(student, item);
  var qx = 1 - px;
  // console.log('--',p,q,px,qx)
  return (px * qx) / (p * q);
}

function getPx(student, item) {
  var a = getDiscrimination(item);
  var t = getProficiency(student);
  var b = getDifficulty(item);
  var exp = Math.exp((-1 * a) * (t - b));
  // console.log('---',a,t,b,exp)
  return Math.pow(1 + exp, -1);
}

function getHzao(student, items) {
  var sum = 0;
  for (var i = 0; i < items.length; i++) {
    var u = getCorrect(items[i]);
    //var p = getProficiency({t:prevProfic},items[i]);
    var p = getProbability(student,items[i]);
    var w = getW(student, items[i], p);
    var a = getDiscrimination(items[i]);
    var c = getCasual(items[i]);
    var px = getPx(student, items[i]);
    sum += (u - p) * w *
      ((Math.pow(a, 2) * (1 - c) * (1 - 2 * px)) - (u - p) * w * (Math.pow((a * (1 - c)), 2)));
  }
  return sum;
}

//function getQx(px) {
//  px = px || getPx();
//  return 1 - px;
//}

module.exports = {
  calibrateProficiency: calibrateProficiency,
  getProbability: getProbability,
  getInformation: getInformation
};
