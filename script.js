const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    secondes: document.getElementById('secondes')
}

let prevDiff = {};
const countdown = document.querySelector('#countdown');
const launchDate = Date.parse(countdown.dataset.time) / 1000;

function refreshCountdown() {

    const rest = launchDate - Date.now() / 1000;
    if (rest <= 0) {
        window.location.reload;
        return;
    }

    const diff = {
        days: Math.floor(rest / DAYS),
        hours: Math.floor(rest % DAYS / HOURS),
        minutes: Math.floor(rest % HOURS / MINUTES),
        secondes: Math.floor(rest % MINUTES)
    }

    updateDom(diff);

    window.setTimeout(() => {
        window.requestAnimationFrame(refreshCountdown)
    }, 1000);
}

function updateDom(diff) {

    Object.keys(diff).forEach((key) => {
        if (prevDiff[key] !== diff[key]) {
            elements[key].innerText = diff[key]

            console.log(`Updating ${key}`);
        }
    })

    prevDiff = diff
}

refreshCountdown();