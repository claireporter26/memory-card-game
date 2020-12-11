
//card variables

let cards = document.querySelectorAll(".card");
let cardCounter = 0;
let chosenCard;
let chosenCardImg;
let chosenCard1;
let chosenCard2;
let chosenCardBase;
let chosenCardPointer1;
let chosenCardPointer2;

//play functionality variables

let scoreCount = document.querySelector(".score");
let matchCounter = 0;
let timer;
let gamePlaying = false;
let body = document.querySelector(".body");

//modal variables

let endModal = document.querySelector(".end-modal");
let endModalInfo = document.querySelector(".end-modal__info")
let sec;
let endMinutes;
let endSeconds;

//button variables

let playAgainBtn = document.querySelector(".play-again__btn")
let cancelBtn = document.querySelector(".cancel__btn")


// Play Game

//1. randomise all cards on load

let cardsArray = Array.from(document.getElementsByClassName("card"));

function shuffleCards(){
    for(let i = cardsArray.length - 1; i > 0; i--){
        let randomIndex = Math.floor(Math.random() * (i+1));
        cardsArray[randomIndex].style.order = i;
        cardsArray[i].style.order = randomIndex;
    }
}

shuffleCards()


//2. on click show that cards image and change background colour until 2 cards are shown

cards.forEach(function(card){
    card.addEventListener("click", function(e){
        chosenCard = e.target;
        chosenCardBase = chosenCard
        chosenCardImg = chosenCard.querySelector(".card-img");

        if (gamePlaying === false){
            startTimer()
            gamePlaying = true;
        }
       
        if(chosenCard.classList.contains("matchedCard") == false){
           
            if(cardCounter < 2){
                chosenCardImg.style.opacity = 1;
                chosenCard.style.backgroundColor = "rgb(252, 251, 249) "
                cardCounter++;
                chosenCardImg.classList.add("chosenCard" + cardCounter)
                chosenCard.classList.add("noPointerEvents" + cardCounter)
       
                if(cardCounter === 2){
                    chosenCard.classList.add("noPointerEvents" + cardCounter)
                    isMatch()
                }
            }
        }
    })
})


function startTimer(){
    sec = 0;

    function pad ( val ) { 
        return val > 9 ? val : "0" + val; 
    }
    
    timer = setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
}


//3. check if 2 cards match

function isMatch(){
    chosenCard1 = document.querySelector(".chosenCard1")
    chosenCard2 = document.querySelector(".chosenCard2")
    currentCardPointer1 = document.querySelector(".noPointerEvents1")
    currentCardPointer2 = document.querySelector(".noPointerEvents2")
    matchedCards = document.querySelector(".matchedCards")

    body.classList.add("noPointerEvents")


    //4. if no match stop showing image and change card background colour, if is a match the increase counter and leave image showing
    
    if(chosenCard1.dataset.foodType === chosenCard2.dataset.foodType){
        matchCounter++;
        scoreCount.innerHTML = `Score: ${matchCounter} Pairs`;
        cardCounter = 0;
        body.classList.remove("noPointerEvents");
        console.log(body.classList)
        currentCardPointer1.classList.add("matchedCards")
        currentCardPointer2.classList.add("matchedCards")
        currentCardPointer1.classList.remove("noPointerEvents1");
        currentCardPointer2.classList.remove("noPointerEvents2");
        chosenCard1.classList.remove("chosenCard1");
        chosenCard2.classList.remove("chosenCard2")

        if(matchCounter === 6){
            stopTimer()
            setTimeout(function(){
                showModal()
            }, 1000)
        }

    }else{
        function noMatch(callback){
            setTimeout(function(){
                chosenCard1.style.opacity = 0;
                chosenCard2.style.opacity = 0;
                currentCardPointer1.style.backgroundColor = "rgb(224, 162, 90)";
                currentCardPointer2.style.backgroundColor = "rgb(224, 162, 90)";
                console.log(currentCardPointer1);
        
            }, 375)

            setTimeout(function(){
                callback();
            }, 375)
        }

        noMatch(function(){
        cardCounter = 0;
        console.log("match is working")
        chosenCard1.classList.remove("chosenCard1");
        chosenCard2.classList.remove("chosenCard2");
        currentCardPointer1.classList.remove("noPointerEvents1");
        currentCardPointer2.classList.remove("noPointerEvents2");
        body.classList.remove("noPointerEvents");
        }) 
    };
 };


 //5. once all matches found stop timer and show end game modal

 function stopTimer(){
    clearInterval(timer)
    gamePlaying = false;
    console.log("stopping timer")
 }

 function calcTime(){
    endMinutes = parseInt(sec / 60);
    endSeconds = sec % 60; 
    console.log(endMinutes + endSeconds)
 }

 function showModal(){
    console.log(sec)
    calcTime()
    endModal.style.display = "block";
    endModalInfo.innerHTML = `You completed the game in ${endMinutes} minutes and ${endSeconds} seconds`
    
    playAgainBtn.addEventListener("click", function(){
        location.reload()
    })
    
    cancelBtn.addEventListener("click", function(){
        endModal.style.display = "none"
    })
 }





 











