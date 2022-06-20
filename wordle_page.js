const toggleList = ['none','wrong','misplaced','correct'];
const letterButtons = [...document.querySelectorAll('.letter')];
const btnOne = document.querySelector('#btnOne');
const btnTwo = document.querySelector('#btnTwo');
const btnThree = document.querySelector('#btnThree');
const btnFour = document.querySelector('#btnFour');
const btnFive = document.querySelector('#btnFive');
const btnSix = document.querySelector('#btnSix');
let userArray = [0,0,0,0,0];


//Get initial word
//add function here
let displayLetters = 'ROATE'.split('');

//Display the letters in DOM
for (let i=0; i<5; i++) {
    letterButtons[i].innerHTML = displayLetters[i];
}


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
        let color = letterButtons[0].classList[2];
        if (color === 'wrong') userArray[i] = 0;
        else if (color === 'misplaced') userArray[i] = -1;
        else if (color === 'correct') userArray[i] = 1;

        letterButtons[0].classList.add('freeze');
        letterButtons.shift();
    }

    //Win condition
    if (userArray.join('') === '11111') {
        alert('You won!');
        return;
    }

    // Send feedback and get new word to guess
    let displayLetters = 'APPLE'; //getNextWord().split('');

    //Setup new row before changing visibility
    for (let i=0; i<5; i++) {
        //Display new letters in DOM
        letterButtons[i].innerHTML = displayLetters[i];
        
        //Color and freeze next row's green letters
        if (round === 6 || userArray[i] !== 1) continue;
        letterButtons[i].classList.remove('none');
        letterButtons[i].classList.add('correct');
        letterButtons[i].classList.add('freeze');
    }

    
    



    if (round === 6) { alert('you lost!'); return;}
    //Display new row
    let newRow = document.querySelector(`.round.${nextRow}`);
    newRow.style.visibility = 'visible';
}