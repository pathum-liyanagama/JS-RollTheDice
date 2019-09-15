var scores,
    currenPlayer,
    roundScore,
    score,
    isPlaying;

var diceDOM = document.getElementsByClassName('dice')[0];
var btnRollDiceDOM = document.getElementsByClassName('btn-roll')[0];
var btnHoldDOM = document.getElementsByClassName('btn-hold')[0];
var btnNewGameDOM = document.getElementsByClassName('btn-new')[0];

function startNewGame() {
    scores = [0, 0];
    currenPlayer = 0;
    roundScore = 0;
    score = 0;
    isPlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementsByClassName("player-0-panel")[0].classList.remove("active");
    document.getElementsByClassName("player-1-panel")[0].classList.remove("active");
    document.getElementsByClassName("player-0-panel")[0].classList.remove("winner");
    document.getElementsByClassName("player-1-panel")[0].classList.remove("winner");
    document.getElementsByClassName("player-0-panel")[0].classList.add("active");
    document.getElementById('name-0').textContent = "PLAYER 1";
    document.getElementById('name-1').textContent = "PLAYER 2";
}

btnRollDiceDOM.addEventListener('click', function () {
    if (isPlaying) {
        score = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = "block";
        diceDOM.src = "img/" + "dice-" + score + ".png";

        if (score !== 1) {
            roundScore = roundScore + score;

            if ((roundScore + scores[currenPlayer]) >= 100) {
                document.getElementById('name-' + currenPlayer).textContent = "WINNER";
                document.getElementById('score-' + currenPlayer).textContent = roundScore + scores[currenPlayer];
                document.getElementById('current-' + currenPlayer).textContent = 0;
                document.getElementsByClassName("player-" + currenPlayer + "-panel")[0].classList.add("winner");
                isPlaying = false;
                return;
            }

            document.getElementById('current-' + currenPlayer).textContent = roundScore;
        }
        else {
            togglePlayer();
        }
    }
})

btnHoldDOM.addEventListener('click', function () {
    if (isPlaying) {
        scores[currenPlayer] += roundScore;
        document.getElementById('score-' + currenPlayer).textContent = scores[currenPlayer];
        diceDOM.style.display = "none";
        togglePlayer();
    }
})

btnNewGameDOM.addEventListener('click', startNewGame);

function togglePlayer() {
    roundScore = 0;
    document.getElementById('current-' + currenPlayer).textContent = 0;
    document.getElementsByClassName("player-" + currenPlayer + "-panel")[0].classList.remove("active");
    currenPlayer = (currenPlayer === 0) ? 1 : 0;
    document.getElementsByClassName("player-" + currenPlayer + "-panel")[0].classList.add("active");
}

startNewGame();

