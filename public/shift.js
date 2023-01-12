const modes = [" Major", " harmonic minor", " melodic minor"];
const majorShifts = [
  {'deg':3, 'dir':1, 'shift':4, 'mode':0, 'spec':0}, //sharp 4 > major 5 (forbidden from Do-sharp Major)
  {'deg':4, 'dir':1, 'shift':5, 'mode':1, 'spec':0}, //sharp 5 > harmonic 6
  {'deg':6, 'dir':-1, 'shift':3, 'mode':0, 'spec':0}, //flat 7 > major 4 (forbidden from Do-flat Major)
  {'deg':0, 'dir':1, 'shift':1, 'mode':2, 'spec':0}, //sharp 1 > melodic 2 (forbidden from Do-flat Major)
  {'deg':2, 'dir':-1, 'shift':0, 'mode':2, 'spec':0} //flat 3 > melodic 1 (forbidden from Do-flat, Sol-flat, Re-flat Major)
]
const harmonicShifts = [
  {'deg':6, 'dir':-1, 'shift':2, 'mode':0, 'spec':0}, //flat 7 > major 3
  {'deg':5, 'dir':1, 'shift':0, 'mode':2, 'spec':0}, //sharp 6 > melodic 1
  {'deg':2, 'dir':1, 'shift':3, 'mode':2, 'spec':-1} //sharp 3 (implied flat 7) > melodic 4 (forbidden from La-flat harmonic)
]
const melodicShifts = [
  {'deg':5, 'dir':-1, 'shift':0, 'mode':1, 'spec':0}, //flat 6 > harmonic 1
  {'deg':3, 'dir':1, 'shift':4, 'mode':1, 'spec':-1}, //sharp 4 (implied flat 7) > harmonic 5 (forbidden from La-sharp melodic)
  {'deg':6, 'dir':-1, 'shift':6, 'mode':0, 'spec':0}, //flat 7 > major flat 7 (forbidden from La-sharp melodic)
  {'deg':2, 'dir':1, 'shift':0, 'mode':0, 'spec':0} //sharp 3 > major 1 (forbidden from La-sharp, Re-sharp, Sol-sharp melodic)
]
const majorDichords = [0, 2, 4, 5, 7, 9, 11];
const validModeDCs = [
  [0, 2, 5, 7, 10],
  [0, 2, 4, 9],
  [0, 2, 5, 7, 9]
]

window.onload = () => {
  var restricted = document.getElementById("RESTRICTED");
  var solfege = document.getElementById("SOLFEGE");
  var doOnly = document.getElementById("DOONLY");
  var tSlider = document.getElementById("TIME");
  var nSlider = document.getElementById("NUM");
  var tOutput = document.getElementById("OUTTIME");
  var nOutput = document.getElementById("OUTNUM");
  var text = document.getElementById("OUTPUT");
  var startButton = document.getElementById("STARTBUTTON");
  tOutput.innerHTML = tSlider.value + ((tSlider.value == 1) ? " second" : " seconds") + " per shift";
  tSlider.oninput = function() {
    tOutput.innerHTML = tSlider.value + ((tSlider.value == 1) ? " second" : " seconds") + " per shift";
  }
  nOutput.innerHTML = "generate " + nSlider.value + " shifts";
  nSlider.oninput = function() {
    nOutput.innerHTML = "generate " + nSlider.value + " shifts";
  }

  var shifting = false;
  var intID;

  document.getElementById("RUN").onclick = function () {
    if(shifting == false) {
      startButton.innerText = "Stop Shifting";
      shifting = true;
      const names = solfege.checked ? ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"] : ["C", "D", "E", "F", "G", "A", "B"];
      const acc = solfege.checked ? ["-double-flat", "-flat", "", "-sharp", "-double-sharp"] : ["bb", "b", "", "#", "x"];
      let dichords = [0, 0, 0, 0, 0, 0, 0];
      let curKey = 0; //is always 1 less than the actual scale degree of the key
      let curMode = 0;
      let startingAcc = 0;
      let time = tSlider.value;
      let n = nSlider.value;
      let rest = restricted.checked;
      if (!doOnly.checked) { 
        startingAcc = Math.floor(Math.random() * 9) - 3; //generates a random starting key between Mi-flat and Si, the limits for viable keys
        if (startingAcc > 0) {
          for (var i = 0; i < startingAcc; i++) {
            dichords[(curKey + 3)%7]++;
            curKey = (curKey + 4)%7;
          }
        }
        if (startingAcc < 0) {
          for (var i = 0; i > startingAcc; i--) {
            dichords[(curKey + 6)%7]--;
            curKey = (curKey + 3)%7;
          }
        }
      }
      let curAcc = dichords[curKey];
      startingAcc = curAcc;
      let startingDichord = (12 + majorDichords[curKey] + curAcc)%12;
      let numShifts = 0;
      let doShift = () => {
        if(++numShifts > n) {
          text.innerHTML += "<br>We are in ".concat(names[curKey], acc[curAcc + 2], modes[curMode], ".");
          clearInterval(intID);
          text.innerHTML += "<br>Completed ".concat(n, " shifts.");
          startButton.innerText = "Start Shifting"
          shifting = false;
          text.scrollTop = text.scrollHeight;
        } else {
            text.innerHTML += "<br>We are in ".concat(names[curKey], acc[curAcc + 2], modes[curMode],".");
            text.scrollTop = text.scrollHeight;
            let viableShifts = [];
            if (curMode == 0) {
              if (curKey == 0 && curAcc == -1) viableShifts = majorShifts.slice(0, 2);
              else if ((curKey == 4 || curKey == 1) && curAcc == -1) viableShifts = majorShifts.slice(0, 4);
              else if (curKey == 0 && curAcc == 1) viableShifts = majorShifts.slice(1, 5);
              else viableShifts = majorShifts;
            } else if (curMode == 1) {
              if (curKey == 5 && curAcc == -1) viableShifts = harmonicShifts.slice(0, 2);
              else viableShifts = harmonicShifts;
            } else if (curMode == 2) {
              if (curKey == 5 && curAcc == 1) viableShifts = melodicShifts.slice(0, 1);
              else if ((curKey == 1 || curKey == 4) && curAcc == 1) viableShifts = melodicShifts.slice(0, 3);
              else viableShifts = melodicShifts;
            }
            if (rest) viableShifts = viableShifts.filter(shift => validModeDCs[shift.mode].includes((12 + majorDichords[(curKey + shift.shift)%7] + dichords[(curKey + shift.shift)%7] + (shift.deg == shift.shift ? shift.dir : 0) - startingDichord)%12));
            let curShift = viableShifts[Math.floor(Math.random()*viableShifts.length)];
            dichords[(curKey + curShift.deg)%7] += curShift.dir;
            if (curShift.spec != 0) dichords[(curKey + 6)%7]--;
            curMode = curShift.mode;
            text.innerHTML += "<br>We introduce ".concat(names[(curKey + curShift.deg)%7], acc[dichords[(curKey + curShift.deg)%7] + 2], ".");
            curKey = (curKey + curShift.shift)%7;
            curAcc = dichords[curKey];
            text.scrollTop = text.scrollHeight;
        }
      }
      doShift();
      intID = setInterval(doShift, time * 1000);
    } else {
      clearInterval(intID);
      text.innerHTML += "<br>Shifting canceled.";
      text.scrollTop = text.scrollHeight;
      startButton.innerText = "Start Shifting";
      shifting = false;
    }
  }
}