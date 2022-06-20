const toggleList = ['none','wrong','misplaced','correct'];
const letterButtons = document.querySelectorAll('.letter');
const btnOne = document.querySelector('#btnOne');
const btnTwo = document.querySelector('#btnTwo');
const btnThree = document.querySelector('#btnThree');
const btnFour = document.querySelector('#btnFour');
const btnFive = document.querySelector('#btnFive');
const btnSix = document.querySelector('#btnSix');
let rowLock = [];

// Button listner
btnOne.addEventListener('click', e => {
    sendFeedback(1, 'two');
    btnOne.disabled = true;
    btnOne.style.visibility = 'hidden';
});
btnTwo.addEventListener('click', e => {
    sendFeedback(2, 'three');
    btnTwo.disabled = true;
    btnTwo.style.visibility = 'hidden';
});
btnThree.addEventListener('click', e => {
    sendFeedback(3, 'four');
    btnThree.disabled = true;
    btnThree.style.visibility = 'hidden';
});
btnFour.addEventListener('click', e => {
    sendFeedback(4, 'five');
    btnFour.disabled = true;
    btnFour.style.visibility = 'hidden';
});
btnFive.addEventListener('click', e => {
    sendFeedback(5, 'six');
    btnFive.disabled = true;
    btnFive.style.visibility = 'hidden';
});
btnSix.addEventListener('click', e => {
    sendFeedback(6, 'seven');
    btnSix.disabled = true;
    btnSix.style.visibility = 'hidden';
});


// Onclick for letters
document.addEventListener('click', e => {
    if (!e.target.classList.contains('letter')) return;

    let div = e.target;
    let index = 0;

    //Break if row locked from chaning colors
    ///////////////////
    // add class 'one', 'two', etc to 'letter-group'
    // check this event listner for the parent
    // ???

    toggleList.forEach(x => {
        if (div.classList.contains(x)) index = toggleList.indexOf(x);
    });

    div.classList.toggle(toggleList[index]);
    index === 3 ? index = 1 : index++;
    div.classList.toggle(toggleList[index]);
});


function sendFeedback(round, nextRow) {
    // Send feedback and get new word to guess
    // this line here

    if (round === 6) { alert('you lost!'); return;}
    // Display new row
    let newRow = document.querySelector(`.round.${nextRow}`);
    newRow.style.visibility = 'visible';
}