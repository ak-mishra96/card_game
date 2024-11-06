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
            alert('You won!');
        }, 500);
    }
}

function unflipCards() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
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
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    matchCount = 0;
    shuffle();
}

cards.forEach(card => card.addEventListener('click', flipCard));

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);

// Initialize the game
shuffle();
