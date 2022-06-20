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

//debug

export function getNextWord(turn) {
    // Select guess
    if (turn === 0) {
        let randInt = Math.floor(Math.random() * (startingWords.length));
        guess = startingWords[randInt];
        return guess;
    }
    else if (possibleWords.length > 0) {
        return possibleWords[0];
        
    }
    else if (possibleWords.length === 0 && extraWords > 0) {
        let randInt = Math.floor(Math.random() * (extraWords.length));
        guess = extraWords[randInt];
        return guess;
    }
    else {
        alert('Critical Error: Could not find a valid word to guess');
        return;
    }
}



export function crunchData(guessLetters, wordKey) {

    // This is not functioning. Nothing in wordle_page is setting flag
    // button press should set notInDictionary flag to true
    //
    if (notInDictionary) {
        possibleWords.splice(possibleWords.indexOf(guess),1);
        if (extraWords.includes(guess)) extraWords.splice(extraWords.indexOf(guess),1);
        notInDictionary = false;
        return;
    }


    // (A) Eliminate wrong letters and protect possible/correct letters
    for (let i=0; i < 5; i++) {
        if (wordKey[i] === 0 && !wrongLetters.includes(guessLetters[i]) && !possibleLetters.includes(guessLetters[i])) {
            wrongLetters.push(guessLetters[i]);    
        }
        else if (wordKey[i] !== 0 && !possibleLetters.includes(guessLetters[i])) {
            possibleLetters.push(guessLetters[i]);
        }
        else if (wordKey[i] === 0 && possibleLetters.includes(guessLetters[i])) {
            // remove words that have this double letter
            possibleWords = possibleWords.filter(word => {
                let temp = word.split(''); // [a b c f y]
                temp.splice(temp.indexOf(guessLetters[i]),1);
                if (temp.includes(guessLetters[i])) { return false; }
                return true;
            });
        }
    }

    console.log(`possibleWords: ${possibleWords.length}`);
    // (B) Eliminate words that contain wrong letters
    possibleWords = possibleWords.filter(word => {
        let goodWord = true;
        wrongLetters.forEach(letter => {
            if (word.split('').includes(letter)) {goodWord = false; return;}
        });
        return goodWord;
    })
    extraWords = extraWords.filter(word => {
        let goodWord = true;
        wrongLetters.forEach(letter => {
            if (word.split('').includes(letter)) {goodWord = false; return;}
        });
        return goodWord;
    })
    console.log(`after (B): ${possibleWords.length}`);

    // (C) Narrow word list that contain misplaced letters somewhere
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
    console.log(`after (C): ${possibleWords.length}`);

    // (D) Catch case when word key says 'misplaced' => 
    // should eliminate words that have correct letter in that spot
    for (let i=0; i<5; i++) {
        if (wordKey[i] === -1) {
            possibleWords = possibleWords.filter(word => {
                return word[i] !== guessLetters[i];
            })
            extraWords = extraWords.filter(word => {
                return word[i] !== guessLetters[i];
            })
        }
    }
    console.log(`after (D): ${possibleWords.length}`);

    // (E) Narrow list to words with letters in correct places
    for (let i=0; i<5; i++) {
        if (wordKey[i] === 1) {
            possibleWords = possibleWords.filter(word => {
                return word[i] === guessLetters[i];
            })
            extraWords = extraWords.filter(word => {
                return word[i] === guessLetters[i];
            })
        }
    }
    console.log(`after (E): ${possibleWords.length}`);

}