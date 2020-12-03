//1. randomise all cards on load
let cards = document.querySelectorAll(".card");

let cardCounter = 0;
let matchCounter = 0;
let chosenCard;
let chosenCardImg;
let chosenCard1;
let chosenCard2;
let scoreCount = document.querySelector(".score");
let gamePlaying = false;
let timer;
let endModal = document.querySelector(".end-modal");
let endModalInfo = document.querySelector(".end-modal__info")
let sec;
let endMinutes;
let endSeconds;


let playAgainBtn = document.querySelector(".play-again__btn")
let cancelBtn = document.querySelector(".cancel__btn")





//2. on click show that cards picture until 2 cards are shown

cards.forEach(function(card){
    card.addEventListener("click", function(e){
        chosenCard = e.target;
        chosenCardImg = chosenCard.querySelector(".card-img");
        
        console.log(gamePlaying)
        

        if (gamePlaying === false){
            
            console.log("game playing is false")
            startTimer()
            gamePlaying = true;
        }

        
       

        
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


    function startTimer(){
        console.log("restart timer")
        sec = 50;
    

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

    //4. if no match stop showing picture, if is match increase counter and leave picture showing
    
    if(chosenCard1.dataset.foodType === chosenCard2.dataset.foodType){
        
        matchCounter++;
        scoreCount.innerHTML = `Score: ${matchCounter} Pairs`

        if(matchCounter == 6){
            stopTimer()
            setTimeout(function(){
                showModal()
            }, 1000)
            
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

 //5. once all matches found show end game modal
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





 











