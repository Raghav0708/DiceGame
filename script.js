'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, current, activePlayer, playing;
//starting conditions
const init = function()
{
    scores = [0, 0];
    current = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
}

init();

//functions
const switchPlayer = function(){
        current = 0;
        document.getElementById(`current--${activePlayer}`).textContent = current;
        activePlayer = activePlayer==0 ? 1 : 0; 
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

//Rolling dice personality
btnRoll.addEventListener('click', function(){
    if(playing){
    
        //1. Generate random dice number
        const dice = Math.trunc(Math.random()*6)+1;

        //2. show photo according to number
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. check for 1
        if(dice !== 1)
        {
            //Add to the current score
            current += dice;
            document.getElementById(`current--${activePlayer}`).textContent = current;
            console.log(current);
        }
        else
        {
            //Switch to the other user
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function() {
   if(playing)
    { //1. Update score with current
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    current = 0;
    document.getElementById(`current--${activePlayer}`).textContent = current;

    //2. check player's score >=100
    if(scores[activePlayer]>=50){
        //finish game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
    }
    else{
        switchPlayer();
    }}

})

btnNew.addEventListener('click', init);