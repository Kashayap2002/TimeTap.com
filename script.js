let timerInterval;
let timerRunning = false;
let timerTime = 0;

let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let stopwatchRecords = [];

function startTimer() {
  if (!timerRunning) {
    const timerInput = document.getElementById('timer-input');
    const initialTime = parseInt(timerInput.value, 10);

    if (initialTime > 0) {
      timerTime = initialTime;
      updateTimerDisplay();
      timerInterval = setInterval(updateTimer, 1000);
      timerRunning = true;
      timerInput.value = '';
    }
  }
}

function pauseTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTime = 0;
  updateTimerDisplay();
}

function updateTimer() {
  timerTime--;
  if (timerTime >= 0) {
    updateTimerDisplay();
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
    playTimerEndVoice();
    
  }
}

function updateTimerDisplay() {
  const hours = Math.floor(timerTime / 3600);
  const minutes = Math.floor((timerTime % 3600) / 60);
  const seconds = timerTime % 60;
  document.getElementById('timer-display').textContent = `${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  if (stopwatchRunning) {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchTime = 0;
  updateStopwatchDisplay();
  clearRecords();
}

function updateStopwatch() {
  stopwatchTime++;
  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 3600);
  const minutes = Math.floor((stopwatchTime % 3600) / 60);
  const seconds = stopwatchTime % 60;
  document.getElementById('stopwatch-display').textContent = `${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function recordStopwatch() {
  if (stopwatchRunning && stopwatchRecords.length < 5) {
    const recordTime = document.getElementById('stopwatch-display').textContent;
    stopwatchRecords.push((stopwatchRecords.length + 1) + '. ' + recordTime);
    const recordList = document.getElementById('record-list');
    const listItem = document.createElement('li');
    listItem.textContent = recordTime;
    recordList.appendChild(listItem);
  }
}

function clearRecords() {
  stopwatchRecords = [];
  const recordList = document.getElementById('record-list');
  recordList.innerHTML = '';
}

function playTimerEndVoice() {
  const message = 'Timer finished.';
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  }
}

document.getElementById('set-timer').addEventListener('click', startTimer);
document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);
document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
document.getElementById('stop-stopwatch').addEventListener('click', stopStopwatch);
document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);
document.getElementById('record-stopwatch').addEventListener('click', recordStopwatch);
