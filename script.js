const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lock = false;
let firstCard, secondCard;
let matchCount = 0;

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? lockcards() : unflipCards();
}

function lockcards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matchCount += 1;

    if (matchCount === cards.length / 2) {
        setTimeout(() => {
            showWinMessage(); 
        }, 500);
    }
}

function unflipCards() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function restartGame() {
    // Reset the cards to their initial state
    cards.forEach(card => {
        card.classList.remove('flip'); //essentially "turns off" the animation for a moment, giving it a hard reset.
        card.style.animation = 'none'; 
        card.offsetHeight; // force a reflow needed to ensure that when the animation is re-enabled, it restarts properly
        card.style.animation = ''; // back to an empty string removes the inline 'none'
        card.addEventListener('click', flipCard);
    });
    
    matchCount = 0;
    shuffle(); 

    
    setTimeout(() => {
        
        document.querySelector('.wrapper').style.animation = 'dropAnimation 1s ease-out forwards';
    }, 100);
}

cards.forEach((card, index) => {
    card.style.setProperty('--index', index);
});


cards.forEach(card => card.addEventListener('click', flipCard));

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);


const winMessage = document.getElementById('winMessage');

function showWinMessage() {
    winMessage.classList.add('show'); 
    setTimeout(() => {
        winMessage.classList.remove('show'); 
    }, 3000); 
}




// Initialize the game
shuffle();
