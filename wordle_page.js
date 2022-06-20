const toggleList = ['none','wrong','misplaced','correct'];
const sendButton = document.querySelector('.send-feedback');
const letterButtons = document.querySelectorAll('.letter');

sendButton.addEventListener('click', () => {
    // Send feedback and get new word to guess
});

document.addEventListener('click', e => {
    if (!e.target.classList.contains('letter')) return;

    let div = e.target;
    let index = 0;

    toggleList.forEach(x => {
        if (div.classList.contains(x)) index = toggleList.indexOf(x);
    });

    div.classList.toggle(toggleList[index]);
    index === 3 ? index = 1 : index++;
    div.classList.toggle(toggleList[index]);
})

