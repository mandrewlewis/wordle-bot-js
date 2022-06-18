// commonLettersRanked
// startingWords
// wordsRanked
// wordsExtensive


let possibleWords = wordsRanked;
let extraWords = wordsExtensive;
let letters = commonLettersRanked;
let possibleLetters = [];
let wrongLetters = [];
let wordKey = [0,0,0,0,0]; // 0 = wrong, 1 = correct, -1 = misplaced
let turn = 0;
let notInDictionary = false;
let guess = '';
let guessLetters = [];
let regEx;

while (wordKey !== [1,1,1,1,1]) {

    // Select guess
    if (turn === 0) {
        guess = startingWords[Math.random(0, startingWords.length)];
    }
    else if (possibleWords.length > 0) {
        guess = possibleWords[0];
    }
    else if (possibleWords.length === 0 && extraWords > 0) {
        guess = extraWords[Math.random(0, extraWords.length)];
    }
    else {
        alert('Error: Could not find a valid word to guess');
        break;
    }

    guessLetters = guess.split('');


    //
    // button press should set notInDictionary flag to true
    //
    if (notInDictionary) {
        possibleWords.splice(possibleWords.indexOf(guess),1);
        if (extraWords.includes(guess)) extraWords.splice(extraWords.indexOf(guess),1);
        notInDictionary = false;
        continue;
    }
    

    // Break if wordle solved
    if (wordKey === [1,1,1,1,1]) break;


    // Eliminate wrong letters and protect possible/correct letters
    for (let i=0; i < 5; i++) {
        if (wordKey[i] === 0 && !wrongLetters.includes(guessLetters[i]) && !possibleLetters.includes(guessLetters[i])) {
            letters.splice(letters.indexOf(guessLetters[i]),1);
            wrongLetters.push(guessLetters[i]);    
        }
        else if (wordKey[i] !== 0 && !possibleLetters.includes(guessLetters[i])) {
            possibleLetters.push(guessLetters[i]);
        }
        else if (wordKey[i] === 0 && possibleLetters.includes(guessLetters)) {
            // remove words that have this double letter
            possibleWords = possibleWords.filter(word => {
                let temp = word.split(''); // [a b c f y]
                temp.splice(temp.indexOf(guessLetters[i]),1);
                return !temp.includes(guessLetters[i]);
            });
        }
    }


    // Eliminate words that contain wrong letters
    regEx = new RegExp(wrongLetters, 'gi');
    possibleWords = possibleWords.filter(word => {
        return !regEx.test(word);
    })
    extraWords = extraWords.filter(word => {
        return !regEx.test(word);
    })

    // Narrow word list that contain misplaced letters somewhere
    for (let i=0; i<5; i++) {
        if (wordKey[i] === -1) {
            possibleWords = possibleWords.filter(word => {
                return word.includes(guessLetters[i]);
            });
            extraWords = extraWords.filter(word => {
                return word.includes(guessLetters[i]);
            });
        }
    }

    // Catch case when misplaced letter is actually in correct spot
    for (let i=0; i<5, i++) {
        if (wordKey[i] === -1) {
            possibleWords = possibleWords.filter(word => {
                return word[i] !== guessLetters[i];
            })
            extraWords = extraWords.filter(word => {
                return word[i] !== guessLetters[i];
            })
        }
    }

    // Narrow list to words with letters in correct places
    for (let i=0; i<5, i++) {
        if (wordKey[i] === -1) {
            possibleWords = possibleWords.filter(word => {
                return word[i] === guessLetters[i];
            })
            extraWords = extraWords.filter(word => {
                return word[i] === guessLetters[i];
            })
        }
    }

    turn += 1;
    if (turn > 5) {
        alert("I'm sorry :[ I tried my best.");
        break;
    }


}