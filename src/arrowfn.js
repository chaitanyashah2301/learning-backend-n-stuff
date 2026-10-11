// const getSpendAlert = amount => {
//     return `Warning! you just spend xyz ${amount}`
// }
// console.log(getSpendAlert(100))

// const speedWarning = speed => `You are going at ${speed} mph!`

// console.log(speedWarning(100))


//REST FUNCTIONS

// function setpermissionlevel ( permissionlevel, ...names){
//     names.forEach((name)=>console.log(`${name} has admin access`))
// }

// setpermissionlevel("admin","a","b","c")


function notifyuser(notificationfn){
    notificationfn()
}

const emailnotif = () => console.log(`Sent`)

notifyuser