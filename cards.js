let cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "AC", "AD", "AH", "AS", "JC", "JD", "JH", "JS", "KC", "KD", "KH", "KS", "QC", "QD", "QH", "QS", "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "AC", "AD", "AH", "AS", "JC", "JD", "JH", "JS", "KC", "KD", "KH", "KS", "QC", "QD", "QH", "QS"];
let dealerPosX = -400;
let dealerPosY = 0;
let youPosX = 140;
let youPosY = 0;
let youNum = 0;
let dealNum = 0;
let dealerHand = [];
let dealerValue = [];
let youValue = [];
let youTotal = 0;
let dealerTotal = 0;
let bet = 0;
let gameStart = false;
let bal = 500;

function betAmt() {
  bet++;
  bal -= 1;
  document.getElementById("start-btn").style.animationName = "none";
  var betto = document.getElementById("bet");
  var balance = document.getElementById("balance");
  betto.innerText = bet;
  var img = document.createElement("img");
  var element = document.getElementById("addChip");
  element.appendChild(img)
  img.src = "PNG/chip.png";
  img.style.display = "inline-flex";
  img.style.animationFillMode = "forwards";
  img.style.animationName = "chip";
  img.style.animationDuration = "1s"
  img.style.position = "absolute";
  balance.innerText = "Bal: $" + bal;
}

function dealCard() {
  let trans = "translate(" + dealerPosX + "px, " + dealerPosY + "px)";
  let chosen = cards[Math.floor(Math.random() * cards.length)];
  let val = chosen.split("");
  val.pop();
  val.join("");
  if (val == "K" || val == "J" || val == "Q") val = "10";
  if (Array.isArray(val)) dealerValue.push(val[0]);
  if (!Array.isArray(val)) dealerValue.push(val);
  dealerHand.push(chosen);
  cards.splice(cards.indexOf(chosen), 1);
  let image = "PNG/" + chosen + ".png";
  dealNum++;
  let dealer = "deal" + dealNum;
  var img = document.createElement("img");
  var element = document.getElementById("deal");
  element.appendChild(img);
  img.id = dealer;
  if (dealNum == 1) img.src = "PNG/gray_back.png";
  if (dealNum != 1) img.src = image;
  img.style.display = "inline-flex";
  img.animate([
    // keyframes
    {
      transform: "translate(-30px, 300px)"
    },
    {
      transform: trans
    }
  ], {
    // timing options
    duration: 500,
    easing: "cubic-bezier(1, 1.18, 0.17, 1)",
    fill: "forwards"
  });
  dealerPosX += 40;
  dealerPosY -= 10;
  document.getElementById("card_count").innerText = cards.length;
}

function youCard() {
  let trans = "translate(" + youPosX + "px, " + youPosY + "px)";
  let chosen = cards[Math.floor(Math.random() * cards.length)];
  let val = chosen.split("");
  val.pop();
  val.join("");
  if (val == "K" || val == "J" || val == "Q") {
    youTotal += +10;
    youValue.push("10");
  } else if (val == "A") {
    if (youTotal + 11 > 21) {
      youTotal += +1;
      youValue.push("1");
    } else {
      youTotal += +11;
      youValue.push("11");
    }
  } else {
    if (Array.isArray(val)) {
      youTotal += +val.join("");
      youValue.push(val.join(""));
    } else {
      youTotal += +val;
      youValue.push(val);
    }
  }
  if (youTotal > 21 && youValue.includes("11")) {
    youValue.forEach(e => {
      if (e == "11") {
        youValue.splice(youValue.indexOf("11"), 1);
        youTotal -= 10;
      }
    })
  } else if (youTotal > 21) {
    var flipCard = document.getElementById("deal1");
    flipCard.src = "PNG/" + dealerHand[0] + ".png";
    endGame();
  }
  cards.splice(cards.indexOf(chosen), 1);
  let image = "PNG/" + chosen + ".png";
  youNum++;
  let you = "you" + youNum;
  var img = document.createElement("img");
  var element = document.getElementById("youA");
  element.appendChild(img);
  img.id = you;
  img.src = image;
  img.style.display = "inline-flex";
  img.animate([
    // keyframes
    {
      transform: "translate(-30px, 300px)"
    },
    {
      transform: trans
    }
  ], {
    // timing options
    duration: 500,
    easing: "cubic-bezier(1, 1.18, 0.17, 1)",
    fill: "forwards"
  });
  youPosX += 40;
  youPosY -= 10;
  document.getElementById("card_count").innerText = cards.length;
}

function newGame() {
  if(bet == 0) return;
  document.getElementById("player-info").style.display = "none";
  document.getElementById("start-btn").style.display = "none";
  document.getElementsByTagName("body")[0].style.pointerEvents = "none";
  gameStart = true;
  document.getElementById("pre-ul").style.visibility = "visible";
  var addAmt = document.getElementById("addAmt");
  var addAmtImg = document.getElementById("addAmtImg");
  var addChip = document.getElementById("addChip");
  var gameBoard = document.getElementById("pre-game");
  addAmtImg.style.display = "none"
  addChip.className = "addChipHover";
  gameBoard.style.display = "block";
  setTimeout(function () {
    dealCard();
  }, 200);
  setTimeout(function () {
    dealCard();
  }, 500);
  setTimeout(function () {
    youCard();
  }, 800);
  setTimeout(function () {
    youCard();
  }, 1100);
  setTimeout(function () {
    document.getElementsByTagName("body")[0].style.pointerEvents = "auto";
  }, 1500);
}

function stand() {
  var flipCard = document.getElementById("deal1");
  flipCard.src = "PNG/" + dealerHand[0] + ".png";
  dealerCheck();
}

function dealerCheck() {
  while (gameStart) {
    dealerTotal = 0;
    if (dealerValue.includes("A")) { //dealer has soft total
      let numOfA = 0;
      dealerValue.forEach(f => {
        if (f = "A") numOfA++;
        dealerValue.splice(dealerValue.indexOf("A"), 1);
      });
      dealerValue.forEach(plus => {
        dealerTotal += +plus;
      })
      if (dealerTotal + (numOfA * 11) > 21) {
        for (let i = 0; i < numOfA; i++) {
          dealerValue.push("1");
        }
      } else if (dealerTotal + (numOfA * 11) > 16) {
        gameStart = false; //END GAME
        endGame();
      } else {
        dealCard();
      }
    } else { //not a soft total
      dealerValue.forEach(plus => {
        dealerTotal += +plus;
      });
      if (dealerTotal > 16) {
        gameStart = false; //END GAME
        endGame();
      } else {
        dealCard();
      }
    }
  }
}

function endGame() {
  document.getElementsByTagName("body")[0].style.pointerEvents = "none";
  if (youTotal > 21) { //YOU BUST WITH OR WITHOUR DEALER BUSTING
    console.log("YOIU Dealer: " + dealerTotal + " You: " + youTotal)
  } else if (dealerTotal > 21) { //DEALER BUST
    console.log("DEALER BUST Dealer: " + dealerTotal + " You: "  + youTotal)
    bal += bet + bet;
  } else if (youTotal > dealerTotal) { //YOU WIN
    console.log("WIN Dealer: " + dealerTotal + " You: " + youTotal)
    bal += bet + bet;
  } else if (youTotal == dealerTotal) { //PUSH
    console.log("PUSH Dealer: " + dealerTotal + " You: " + youTotal)
    bal += bet;
  } else { //LOSE
    console.log("LOSE Dealer: " + dealerTotal + " You: " + youTotal)
  }
  setTimeout(function () {
    var searchEles = document.getElementById("youA").children;
    for (var i = 0; i < searchEles.length; i++) {
      while (searchEles[i]) {
        searchEles[i].remove();
      }
    }
    searchEles = document.getElementById("deal").children;
    for (var i = 0; i < searchEles.length; i++) {
      while (searchEles[i]) {
        searchEles[i].remove();
      }
    }
    searchEles = document.getElementById("addChip").children;
    for (var i = 0; i < searchEles.length; i++) {
      if (searchEles[i].src) {
        while (searchEles[i]) {
          searchEles[i].remove();
        }
      }
    }
    dealerPosX = -400;
    dealerPosY = 0;
    youPosX = 140;
    youPosY = 0;
    youNum = 0;
    dealNum = 0;
    dealerHand = [];
    dealerValue = [];
    youValue = [];
    youTotal = 0;
    bet = 0;
    document.getElementById("player-info").style.display = "block";
    document.getElementById("pre-ul").style.visibility = "hidden";
    document.getElementById("start-btn").style.display = "block";
    document.getElementById("start-btn").style.animationName = "shake";
    var addAmtImg = document.getElementById("addAmtImg");
    var addChip = document.getElementById("addChip");
    var gameBoard = document.getElementById("pre-game");
    var addAmt = document.getElementById("addAmt");
    addAmt.style.transform = "translate(700px, 0px);"
    addChip.className = "okbro";
    gameBoard.style.display = "none";
    addAmtImg.style.display = "inline-flex";
    var betto = document.getElementById("bet");
    betto.innerText = bet;
    document.getElementsByTagName("body")[0].style.pointerEvents = "auto";
    var balance = document.getElementById("balance");
    balance.innerText = "Bal: $" + bal;
  }, 5000);
}

function doubleDown() {
  if(!gameStart) return;
  if(youValue.length < 3) {
    document.getElementById("DOUBLE").style.animationName="none";
  } else {
    return document.getElementById("DOUBLE").style.animationName="doubleShake";
  }
  var addChip = document.getElementById("addChip");
  if (addChip.className != "addChipHover") return
  bal -= bet;
  bet = bet * 2;
  document.getElementsByTagName("body")[0].style.pointerEvents = "none";
  youCard();
  stand();
}