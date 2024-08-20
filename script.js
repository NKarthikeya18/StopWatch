// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let lapCount = 1;
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const lapsElement = document.getElementById('laps');

function updateHands() {
    const elapsed = difference / 1000; // in seconds
    const seconds = Math.floor(elapsed % 60);
    const minutes = Math.floor((elapsed / 60) % 60);
    const hours = Math.floor(elapsed / 3600);

    // Convert to degrees
    const secondDeg = (seconds / 60) * 360 + 90;
    const minuteDeg = (minutes / 60) * 360 + 90;
    const hourDeg = (hours / 12) * 360 + 90;

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            updateHands();
        }, 1000);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    updateHands();
    lapsElement.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const elapsed = difference / 1000;
        const seconds = Math.floor(elapsed % 60);
        const minutes = Math.floor((elapsed / 60) % 60);
        const hours = Math.floor(elapsed / 3600);

        const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const lapEntry = document.createElement('li');
        lapEntry.innerText = `Lap ${lapCount}: ${lapTime}`;
        lapsElement.appendChild(lapEntry);
        lapCount++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
