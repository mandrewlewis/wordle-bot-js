const toggleList = ['none','wrong','misplaced','correct'];
const letterButtons = [...document.querySelectorAll('.letter')];
const btnOne = document.querySelector('#btnOne');
const btnTwo = document.querySelector('#btnTwo');
const btnThree = document.querySelector('#btnThree');
const btnFour = document.querySelector('#btnFour');
const btnFive = document.querySelector('#btnFive');
const btnSix = document.querySelector('#btnSix');
let userArray = [];

// Button listner
btnOne.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(1, 'two');
    btnOne.disabled = true;
    btnOne.style.visibility = 'hidden';
});
btnTwo.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(2, 'three');
    btnTwo.disabled = true;
    btnTwo.style.visibility = 'hidden';
});
btnThree.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(3, 'four');
    btnThree.disabled = true;
    btnThree.style.visibility = 'hidden';
});
btnFour.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(4, 'five');
    btnFour.disabled = true;
    btnFour.style.visibility = 'hidden';
});
btnFive.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(5, 'six');
    btnFive.disabled = true;
    btnFive.style.visibility = 'hidden';
});
btnSix.addEventListener('click', e => {
    if (!checkValidFeedback()) return;
    sendFeedback(6, 'seven');
    btnSix.disabled = true;
    btnSix.style.visibility = 'hidden';
});


// Change class/color on letter click
document.addEventListener('click', e => {
    if (!e.target.classList.contains('letter')) return;

    let div = e.target;
    let index = 0;

    //Break if row locked from chaning colors
    if (div.classList.contains('freeze')) return;
    // ???

    toggleList.forEach(x => {
        if (div.classList.contains(x)) index = toggleList.indexOf(x);
    });

    div.classList.toggle(toggleList[index]);
    index === 3 ? index = 1 : index++;
    div.classList.toggle(toggleList[index]);
});


function checkValidFeedback() {
    //Catch if user did not input feedback for every letter in the round
    for (let i=0; i<5; i++) {
        if (letterButtons[i].classList.contains('none')) {
            alert('Please input feedback for each letter');
            return false;
        }
    } return true;
}

function sendFeedback(round, nextRow) {
    //Freeze each letter and update user array
    for (let i=0; i<5; i++) {
        letterButtons[0].classList.add('freeze');
        letterButtons.shift();
    }

    // Send feedback and get new word to guess
    // let divLetters = getWord();



    if (round === 6) { alert('you lost!'); return;}
    // Display new row
    let newRow = document.querySelector(`.round.${nextRow}`);
    newRow.style.visibility = 'visible';
}