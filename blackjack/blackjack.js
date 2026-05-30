
let firstcard = 4;
let secondcard = 10;
let win = false
let cards=[firstcard,secondcard]
let sum = firstcard + secondcard;
let messegeEL = document.getElementById("message-el");
let newcardmessage = "Do you want a new card?"
let sumEL = document.getElementById("sum-el")
let cardsEL = document.getElementById("cards-el")


function renderGame() {
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
    cardsEL.textContent = cards[0] + " and " + cards[1]
}
function startGame() {
    renderGame()
}
function newCard() {
    console.log("New card drawn!")
    let newcardvar = 7;
    sum = sum + newcardvar
    cards.push(newcardvar)
    startGame();
}
