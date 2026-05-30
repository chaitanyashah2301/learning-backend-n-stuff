let cards = []
let sum = 0;
let win = false
let messegeEL = document.getElementById("message-el");
let newcardmessage = "Do you want a new card?"
let sumEL = document.getElementById("sum-el")
let cardsEL = document.getElementById("cards-el")
let isAlive = false;
let playerEL = document.getElementById("player-el")

let player = {
    name: "chai",
    chips: 150
}
playerEL.textContent = player.name + " :$" + player.chips
function renderGame() {
    cardsEL.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEL.textContent += cards[i] + " ";


    }
    if (sum < 21) {
        console.log(newcardmessage)
    }
    else if (sum == 21) {
        console.log("You win!")
        win = true
    }
    else {
        console.log("You lose!")

    }
    messegeEL.textContent = newcardmessage
    sumEL.textContent = "Sum: " + sum


}
function startGame() {
    isAlive = true;
    let firstcard = getrandomcard();
    let secondcard = getrandomcard();
    cards = [firstcard, secondcard]
    sum = firstcard + secondcard
    renderGame()
}
function newCard() {
    if (isAlive && win) {

    }
    console.log("New card drawn!")
    let newcardvar = getrandomcard();
    sum = sum + newcardvar
    cards.push(newcardvar)
    renderGame();
}

function getrandomcard() {
    let randcard = Math.floor(Math.random() * 13);
    if (randcard == 1) {
        return 11;
    }
    if (randcard == 11 || randcard == 12 || randcard == 13) {
        return 10;
    }
    else {
        return randcard
    }
}