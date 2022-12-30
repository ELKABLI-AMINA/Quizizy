"use strict";

var id_timer;
range = [];
var incorrect = [];

function move(deley) {
  var barTime = document.getElementById("BarTime");
  var width = 100;
  var smout = 0.01;
  if (deley < 10) smout = 0.1;
  newDellay = deley * 1000 * smout / 100;
  clearInterval(id_timer);
  id_timer = setInterval(frame, newDellay);

  function frame() {
    if (width <= 0) {
      clearInterval(id_timer);
      i = 0;
    } else {
      width -= smout;
      barTime.style.width = width + "%";
      if (width <= 65 && width > 25) barTime.style.backgroundColor = "#fde24f";else if (width <= 35) barTime.style.backgroundColor = "red";else {
        barTime.style.backgroundColor = "green";
      }
    }
  }
}

function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}

var arrObj = [];

function getJson_data() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      arrObj = JSON.parse(this.responseText);
      randoom(arrObj.length);
      showQuestion(arrObj);
    }
  };

  xhr.open("GET", "../assets/js/data.json", true);
  xhr.send();
}

var count = 0;
var correct = 0;
var totalcorrect = 0;

function showQuestion(arrObj) {
  if (count < arrObj.length) {
    move(30);
    correct = arrObj[range[count]].correct;
    document.getElementById("answers").innerHTML = "";
    document.getElementById("question").innerText = arrObj[range[count]].question;
    document.getElementById("countquestion").innerText = count + 1 + "/" + arrObj.length;

    for (var _i = 0; _i < arrObj[range[count]].answer.length; _i++) {
      document.getElementById("answers").innerHTML += "\n            <div class=\"answer\"  onclick=\"addSelected(this)\" id=\"".concat(_i + 1, "\">  ").concat(arrObj[range[count]].answer[_i], "                                  \n            </div>\n            ");
    }

    document.getElementById("answers").innerHTML += "<center><button class=\"button-8\" onclick=\"checkcorerect()\">Next</button></center>";
    count++;
  } else {
    document.getElementById("progress").innerHTML = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("question").innerHTML = "";
    var corectRange = totalcorrect * 100 / arrObj.length;

    if (corectRange <= 25) {
      document.getElementById("answers").innerHTML = "\n                  <div class=\"img-center\">\n                <img src=\"../assets/img/Frame-focus.png\" class=\"img_vector center\"  alt=\"\">\n                <h3 class=\"missyou\"> Focus more you can do it</h3> </div>";
    } else if (corectRange <= 55) {
      document.getElementById("answers").innerHTML = "\n                  <div class=\"img-center\">\n                <img src=\"../assets/img/Frame-good.png\"  alt=\"\">\n                <h3 class=\"missyou\"> Good job continue</h3> </div>";
    } else if (corectRange <= 90) {
      document.getElementById("answers").innerHTML = "\n                  <div class=\"img-center\">\n                <img src=\"../assets/img/Frame-exelent.png\"   alt=\"\">\n                <h3 class=\"missyou\"> Exelent near to be Master</h3> </div>";
    } else {
      document.getElementById("answers").innerHTML = "\n                  <div class=\"img-center\">\n                  <img src=\"../assets/img/Frame-boos.png\"  alt=\"\">\n                    <h3 class=\"missyou\"> You are the Master</h3> </div>";
    }

    document.getElementById("answers").innerHTML += " <div class=\"container\">\n                <h1 class=\"correctAs\">Your Score Is: ".concat(totalcorrect, "/").concat(arrObj.length, "</h1>\n                <a href=\"quiz.html\"><button class=\"button-6\" role=\"button\">Replay</button></a>\n                <button class=\"button-7\" onclick=\"focusex()\">Explication</button>\n                </div>");
    document.getElementById("answers").innerHTML += "<div  id=\"explicationn\" class=\"explication\">";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = incorrect[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _i2 = _step.value;
        // la valeur       // in (propriétés)
        document.getElementById("answers").innerHTML += " <ul class=\"ul\"><li class=\"questionli\"> <strong>Question ".concat(_i2, ":</strong> ").concat(arrObj[_i2].question, " </li> <li class=\"reponseli\">  <strong>Reponse</strong> :").concat(arrObj[_i2].answer[arrObj[_i2].correct - 1], " </li> <li class=\"explicationli\" > <strong>Explication:</strong> ").concat(arrObj[_i2].Explication, " </li> </ul>");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    document.getElementById("answers").innerHTML += "</div>";
  }
}

getJson_data();

function randoom(max) {
  var newnum;

  for (var _i3 = 1; _i3 <= max; _i3++) {
    newnum = Math.floor(Math.random() * max);

    while (range.includes(newnum)) {
      newnum = Math.floor(Math.random() * max);
    }

    range.push(newnum);
  }
}

var selected;

var addSelected = function addSelected(tag) {
  // arrow function
  selected = tag.id;
  tag.setAttribute("class", "answer bg-regulare");
  var answers = document.getElementsByClassName("answer");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = answers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var answer = _step2.value;
      answer.setAttribute("class", "answer");
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  tag.setAttribute("class", "answer bg-regulare");
}; // check selected choices---------------------------


var checkcorerect = function checkcorerect() {
  if (selected == correct) {
    totalcorrect += 1;
    document.getElementById(selected).setAttribute("class", "answer bg-green");
    var audio = new Audio('../assets/sound/bonneR.mp3');
    audio.play();
  } else {
    incorrect.push(range[count - 1]); // explication                   

    document.getElementById(selected).setAttribute("class", "answer bg-red");
    document.getElementById(correct).setAttribute("class", "answer bg-green");
    var audioE = new Audio('../assets/sound/Echeck.mp3');
    audioE.play();
  }

  setTimeout(function () {
    if (count < arrObj.length) {
      move(29);
    }

    showQuestion(arrObj);
  }, 700);
};

function focusex() {
  document.getElementById('explicationn').scrollIntoView();
}