//1. randomise all cards on load
let cards = document.querySelectorAll(".card");

let cardCounter = 0;
let matchCounter = 0;
let chosenCard;
let chosenCardImg;
let chosenCard1;
let chosenCard2;
let scoreCount = document.querySelector(".score");


//2. on click show that cards picture until 2 cards are shown


function once(fn, context) { 
    var result;

    return function() { 
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}



cards.forEach(function(card){
    card.addEventListener("click", function(e){
        chosenCard = e.target;
        chosenCardImg = chosenCard.querySelector(".card-img");


       startTimer()

        
        if(cardCounter < 2){
            chosenCardImg.style.opacity = 1;
            cardCounter++;
            chosenCardImg.classList.add("chosenCard" + cardCounter)
            console.log(chosenCardImg.dataset)
            
            if(cardCounter >= 2){
                isMatch()
            }
        }
    })
})

let startTimer = once(function(){
    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
})

//3. check if 2 cards match
function isMatch(){
    chosenCard1 = document.querySelector(".chosenCard1")
    chosenCard2 = document.querySelector(".chosenCard2")

    //4. if no match stop showing picture, if is match increase counter and leave picture showing
    if(chosenCard1.dataset.foodType === chosenCard2.dataset.foodType){
        
        matchCounter++;
        scoreCount.innerHTML = `Score: ${matchCounter} Pairs`

        if(matchCounter == 6){
            setTimeout(function(){
                alert("You've won!")
            }, 1500)
            
        }

    }else{
        setTimeout(function(){
            chosenCard1.style.opacity = 0;
            chosenCard2.style.opacity = 0;
        }, 1000)
      
    }

    cardCounter = 0;
    chosenCard1.classList.remove("chosenCard1");
    chosenCard2.classList.remove("chosenCard2");
    

 }











//5. once all matches found show end game modal
