function setTimeoutDuration() {
    const minutes = document.getElementById('timeout-input').value;
    if (!isNaN(minutes) && minutes > 0) {
        const now = new Date().getTime();
        const timeout = now + minutes * 60000; 
        localStorage.setItem('timeout', timeout);
        alert('alarm in' + minutes + ' minutes.');
    } else {
        alert('wrong input');
    }
    setInterval(checkTimeout, 1000);
}

function checkTimeout() {
    const timeout = localStorage.getItem('timeout');
    if (timeout) {
        const now = new Date().getTime();
        const timeLeft = timeout - now;

        if (timeLeft <= 0) {
            window.location.href = 'timeout.html'; 
        } else {

            const secondsLeft = Math.floor(timeLeft / 1000);
            console.log( secondsLeft + ' seconds');
        }
    }
}

const currentPage = window.location.pathname;


if (
    currentPage.includes("game1.html") || 
    currentPage.includes("games2.html") || 
    currentPage.includes("hangman.html") || 
    currentPage.includes("SnakeAndLadder.html")
) {
    setInterval(checkTimeout, 1000);
}