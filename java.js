var rod1 = document.getElementById('first');
var rod2 = document.getElementById('second');
var ball = document.getElementById('ball');

const storename = "ppname";
const storescore = "ppmaxscore";



const rod2name = "rod2";
const rod1name = "rod1";

let score, maxscore, movement, rod;
let ballspeedX = 2, ballspeedY = 2;

let Gameon = false;

(function () {
    rod = localStorage.getItem(storename);
    maxscore = localStorage.getItem(storescore);

    if (rod === "null" || maxscore === 'null') {
        alert(" This is your first time playing this game ")
        maxscore = 0;
        rod = "Rod1";
    }
    else {
        alert(rod + " has a maximum score of " + maxscore * 100);
    }

    resetboard(rod);
})();

function resetboard(rodname) {
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + 'px';

    if (rodname == rod2name) {
        ball.style.top = rod1.offsetTop + rod1.offsetHeight + 'px';
        ballspeedY = 2;
    }
    else if (rodname == rod1name) {
        ball.style.top = rod2.offsetTop - rod2.offsetHeight + 'px';
        ballspeedY = -2;
    }
    score = 0;
    Gameon = false;
}

function storewin(rod, score) {
    if (score > maxscore) {
        maxscore = score;
        localStorage.setItem(storename, rod);
        localStorage.setItem(storescore, maxscore);
    }
    clearInterval(movement);
    resetboard(rod);

    alert(rod + " wins with a score of " + (score * 100) + " max score is " + (maxscore * 100));
}


document.addEventListener('keypress', function (event) {
    var value = event.key;
    let rodspeed = 20;
    let rodrect = rod1.getBoundingClientRect();
    if ((value == 'a' || value == 'A') && (rodrect.x > 0)) {
        rod1.style.left = rodrect.x - rodspeed + 'px';
        rod2.style.left = rod1.style.left;
    }
    else if ((value == 'd' || value == 'D') && (rodrect.x + rodspeed < window.innerWidth)) {
        rod1.style.left = rodrect.x + rodspeed + 'px';
        rod2.style.left = rod1.style.left;
    }
    if (value == 'Enter') {
        if (!Gameon) {
            Gameon = true;
            let ballrect = ball.getBoundingClientRect();
            let ballx = ballrect.x;
            let bally = ballrect.y;
            let balldia = ballrect.width;

            let rod1height = rod1.offsetHeight;
            let rod2height = rod2.offsetHeight;

            let rod1width = rod1.offsetWidth;
            let rod2width = rod2.offsetWidth;

            movement = setInterval(function () {
                ballx += ballspeedX;
                bally += ballspeedY;

                rod1x = rod1.getBoundingClientRect().x;
                rod2x = rod2.getBoundingClientRect().x;

                ball.style.left = ballx + 'px';
                ball.style.top = bally + 'px';

                if (ballx + balldia > window.innerWidth || ballx < 0) {
                    ballspeedX = -ballspeedX;
                }

                let ballpos = ballx + balldia / 2;
                if (bally <= rod1height) {
                    ballspeedY = -ballspeedY;
                    score++;

                    if (ballpos < rod1x || (ballpos > rod1.x + rod1width)) {
                        storewin(rod2name, score);
                    }
                }
                else if (bally + balldia >= (window.innerHeight - rod2height)) {
                    ballspeedY = -ballspeedY;
                    score++;

                    if ((ballpos < rod2x) || ballpos > (rod2x + rod2width)) {
                        storewin(rod1name, score);
                    }
                }
            }, 10);

        }
    }

});