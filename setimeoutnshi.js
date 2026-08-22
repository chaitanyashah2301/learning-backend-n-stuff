function logAnswer(answer,points){
    console.log(`The answer is ${answer} of course! If you got that right give yourself ${points} points`)
}

console.log(`what is the capital of Peru?`)

setTimeout(logAnswer,3000,"Lima",10)