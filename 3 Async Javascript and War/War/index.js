
let deckId
const cardContainer =  document.getElementById('cards')
const newDeck = document.getElementById("new-deck")
const drawCard = document.getElementById("draw-card")
const callWinner = document.getElementById("callWinner")
const remainingCards = document.getElementById("remaining-card") 
const computerScore = document.getElementById("computerScore")
const myScore = document.getElementById("myScore")
let cScore = 0
let mScore = 0

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle")
    .then(response => response.json())
    .then(data =>{ 
        console.log(data)
        remainingCards.innerHTML = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
        

})
}

newDeck.addEventListener('click', handleClick)


drawCard.addEventListener('click', () =>{
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data.cards)
        cardContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="h-full w-full" />
        `
       cardContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="h-full w-full" />
        `
        const winnerText = determineWinner(data.cards[0],data.cards[1])
        console.log(winnerText)
        callWinner.textContent = winnerText
        remainingCards.innerHTML = `Remaining cards: ${data.remaining}`

        if(data.remaining === 0){
            console.log("Disbaled")
            drawCard.disabled = true
            drawCard.style.cursor = "not-allowed";
            if(cScore>mScore){
                callWinner.textContent = "Computer won the Game"
            }else if(cScore<mScore){
                callWinner.textContent = "You won the Game"
            }else{
                callWinner.textContent = "It's a Tie Game"
            }
        }
    })
})


function determineWinner(card1,card2){
    const valueOption = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE",]
    const card1ValueIndex = valueOption.indexOf(card1.value)
    const card2ValueIndex = valueOption.indexOf(card2.value)
    if(card1ValueIndex > card2ValueIndex){
        cScore++
        computerScore.innerHTML = cScore
        return "Computer Win"
        
    }else if(card1ValueIndex < card2ValueIndex){
        mScore++
        myScore.innerHTML = mScore
        return "You Win"
    }else{
        return "War"
    }
}
