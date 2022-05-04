const cards = document.querySelectorAll(".card");

let inter;
let time = 10;
let moves = 0;
let matchedCard = 0;
let cardOne, cardTwo
let disableDeck = false;


function flipCard(e){
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");

        document.querySelector(".timer").innerHTML = `Hajrá`
        if(!cardOne){
            // return the cardOne value to clickedCard
            return cardOne = clickedCard; 
        }
        
        moves += 1;
        document.querySelector(".moves").innerHTML = `Lépések: ${moves}`
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
    


}

function matchCards(img1, img2){
    if (img1 === img2) { // if two cards img matched
        matchedCard++; // increment matched value by 1
        document.querySelector(".points").innerHTML = `Pontok: ${matchedCard}`
        //if matched value is 8 that means usert has matched all the cards (8 * 2 = cards)
        if(matchedCard == 8){
            document.querySelector(".timer").innerHTML = `Gratulálok`
            setTimeout(() => {
                return shuffleCard()
            },3000);
               
        }
        
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // setting both card value to blank
        return disableDeck = false;
        
    }
    

    // if two card not matched
    setTimeout(() => {
        // adding shake class to both car after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        // removeing both shake & flip classes from-- 
        //--the both card after 1.2 seconds
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = "";// setting both card value to blank
        disableDeck = false;
    }, 1100);
   
}

function shuffleCard(){
    matchedCard = 0;
    document.querySelector(".points").innerHTML = `Pontok: ${matchedCard}`
    moves = 0;
        document.querySelector(".moves").innerHTML = `Lépések: ${moves}`
    cardOne, cardTwo = "";
    disableDeck = false;
    //creating array of 16 items andeach itemis repeated twice
    let arr= [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1) //sorting array item randomoly
    
    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) =>{ 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src =`img/img-${(arr[index])}.png`;
        card.addEventListener("click", flipCard);
    });
    document.querySelector(".timer").innerHTML = `Ügyes legyél`
}



shuffleCard()


cards.forEach(card =>{ //adding click event to all cards
    
    card.addEventListener("click", flipCard);
});