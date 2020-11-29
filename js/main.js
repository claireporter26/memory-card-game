let cards = document.querySelectorAll(".card")

console.log(cards)



cards.forEach(function(card){
    card.addEventListener("click", function(e){
        let chosenCard = e.target.childElement;
        chosenCard.style.opacity = 0;
    })
})