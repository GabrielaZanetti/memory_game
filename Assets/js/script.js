const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let point;

function flipCard() {
    if (lockBoard) return;  //  Bloqueia as cartas do tabuleiro para nao dar duplo click
    if (this === firstCard) return;  // Bloqueia as cartas do

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkCard();
}
function inicia() {
    point = 0;
    $('#ganhou').hide();
    $('#pontos').show();
    $('.memory-game').show();
    cards.forEach((card) => {
        setTimeout(() => {
            card.classList.add('flip')
        });
        setTimeout(() => {
            card.classList.remove('flip')
            card.addEventListener('click', flipCard);  // Adiciona o evendo de click na carta
        }, 1500);

    })
    $('#pontos-soma').text(point);
}

inicia(); // Inicia jogo

function checkCard() {  // verifica se o valor das cartas sao iguais
    if (firstCard.dataset.card === secondCard.dataset.card) {
        point = point + 1;
        $('#pontos-soma').text(point);
        if (point === 6) {
            $('#ganhou').show("fast");
            $('#pontos').hide("show");
            $('.memory-game').hide("slow");
        }
        disabledCard();
        return;
    }
    unflippedCard();
}

function disabledCard() {   // se os valores sao iguais as cartas ficam viradas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflippedCard() {  // se os valores nao sao iguais as cartas desviram
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {  // reseta as variaveis para os valores iniciais
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {  // embaralhamento das cartas
    cards.forEach((card) => {
        let randownPosition = Math.floor(Math.random() * 12);
        card.style.order = randownPosition;
    })
})(); // invocação imediata da função

// Math.floor -> arredonda o numero