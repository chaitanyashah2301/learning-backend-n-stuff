

let count = 0;
let countEL = document.getElementById("count-el");
let saveEL = document.getElementById("save-el")

console.log(countEL)


function increment() {
    count = count + 1;
    countEL.innerText = count;
}
function decrement() {

    count = count - 1;
    countEL.innerText = count;
}

function save() {
    let countStr = count + "-";
    saveEL.innerText +=" "+ countStr;
    console.log(count);
}