const container = document.querySelector(".contanier");
const boxes = document.querySelectorAll(".box");
const restartButton = document.querySelector(".restart");
const whoWinner = document.createElement('p');
const popUp=document.querySelector(".popUp");
const aiBtn=document.querySelector(".ai");
const humanBtn=document.querySelector(".human");
const changeModePlaying=document.querySelector(".change");
let selectMode;
let isXTurn = true;
let isGameOver = false;
let checkWinner = () => {
  const rowCol=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
  for (let [a, b, c] of rowCol) {
    if (boxes[b].textContent===boxes[c].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent&&boxes[a].textContent) {
      return boxes[a].textContent;

    }
  }
  if ([...boxes].every(box => box.textContent)) {
    return 'draw';
  }

};
const restartGame = () => {
  container.style.margin = "70px auto auto auto";
  boxes.forEach(box => {
    box.textContent = "";
  });
  if (whoWinner) whoWinner.textContent="";
  
  isGameOver = false;
  isXTurn=true;
};

const play= (box) => {
  if (!isGameOver && !box.textContent) {
    if (isXTurn) {
      box.textContent = "X";
    }else{
      box.textContent="O";
    }
    isXTurn = !isXTurn;

    let winner = checkWinner();
    if (winner) {
      container.style.margin = "0";
      if (winner === 'draw') {
        whoWinner.textContent = "draw";
      } else {
        whoWinner.textContent = `The Winner Is ${winner}`;
      }
      document.body.prepend(whoWinner);
      isGameOver = true;
    }
    if(selectMode==="ai"){
      if (!isGameOver) {
        setTimeout(() => {
          aiMoev();
          winner = checkWinner();
          if (winner) {
            container.style.margin = "0";
            if (winner === 'draw') {
              whoWinner.textContent = "draw";
            } else {
              whoWinner.textContent = `The Winner Is ${winner}`;
            }
            document.body.prepend(whoWinner);
            isGameOver = true;
          }
        }, 500);
      }
    }
    
  }
};



function randomPlay(){
  const emptyBox=[...boxes].filter(box=>!box.textContent);
  if(emptyBox.length>0){
    const randomPlay=Math.floor(Math.random()*emptyBox.length);
    return emptyBox[randomPlay];
  }
   return null;
}
function aiMoev(){
  const aiPlayer=randomPlay();
  if(aiPlayer){
    if(!isXTurn){
      aiPlayer.textContent='O';
    }
   
    isXTurn=!isXTurn;
  }
}


restartButton.addEventListener('click', restartGame);
changeModePlaying.addEventListener("click",()=>{
  
  popUp.style.display="block";
  whoWinner.textContent="";
  boxes.forEach(box=>box.textContent="");
   isXTurn = true;
   isGameOver = false;
});

aiBtn.addEventListener('click',()=>{
  popUp.style.display="none";
  selectMode="ai";
});
humanBtn.addEventListener('click',()=>{
  container.style.margin = "70px auto auto auto";
  popUp.style.display="none";
  selectMode="human";
});
boxes.forEach(box => {
  box.addEventListener('click', () => {
    play(box);
  });
});

