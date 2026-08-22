import { getstockData } from '/fakeStockAPI.js'
console.log(getStockData())

setInterval (function(){
    const stockData =getstockData()
    renderStockTicker(stockData)
},1500)


function renderStockTicker(stockData) {
    const stockDisplayName = document.getElementById('name')
    const stockDisplaySymbol = document.getElementById('symbol')
    const stockDisplayPrice = document.getElementById('price')
    const stockDisplayPriceIcon = document.getElementById('price-icon')
    const stockDisplayTime = document.getElementById('time')

    const {name,sym,price,time}= stockData

    stockDisplayName.innerText = name
}