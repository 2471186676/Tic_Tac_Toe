/* constructor */
const ttt = (() =>{
    /* 0 = empty, 1 = X, 2 = O */
    let field = [0,0,0,0,0,0,0,0,0];
    let turn = 0;

    const reset = () =>{
        for(let i = 0; i < field.length; i++){
            field[i] = 0;
        }
        updateUI(); 
        ttt.turn = 0;
    }
    const get = (i) => {return field[i];}
    const changeField = (loc, to) => {
        if(field[loc] == 0){
            field[loc] = Number(to);
            ttt.turn += 1;
        }
    }

    const check = (turn) => {
        let won = false;

        /* check column */
        for(let i = 0; i < 3; i++){
            if(field[0 + i] == turn &&
               field[3 + i] == turn &&
               field[6 + i] == turn){
                    won = true;
                    i = 10; 
            }
        }

        /* check row */
        for(let i = 0; i < 9; i+=3){
            if(field[0 + i] == turn &&
               field[1 + i] == turn &&
               field[2 + i] == turn){
                    won = true;
                    i = 10; 
             }
        }

        /* check dign top left to bot right*/
        if(field[0] == turn &&
           field[4] == turn &&
           field[8] == turn){
                won = true; 
         }

        /* check dign bot left to top right*/
        if(field[6] == turn &&
           field[4] == turn && 
           field[2] == turn){
                won = true;
           }

           return won;

    }

    return {changeField, check, reset, get, turn, field};
})()

const player = (name) => {
    let win = 0, lose = 0;
    const winRate = () => {return win/(win+lose)};

    return(name, win, lose, winRate);
}

/* add event listener for game button*/
let turn = 1;
let AI = player("P1", 0, 0), friendly = player("P2",0,0);
let buttons = document.querySelectorAll(".game button");
buttons.forEach((button) =>{
    button.addEventListener('click', event => {
        game_cycle(button);
    })
})

/* algorithms */
function game_cycle(button){   
    let gameTurn = document.getElementById("turn"); 
    let playerPoint = document.getElementById("player");
    let AIPoint = document.getElementById("AI");
    let id = button.id;
    ttt.changeField(id, turn);

    if(!ttt.check(turn)){
        if(turn == 1){
            turn = 2;
            gameTurn.innerHTML = "O turn";
        }else{
            turn = 1;
            gameTurn.innerHTML = "X turn";
        }
    }else{
        if (turn == 1) {
            playerPoint.innerHTML++;
            gameTurn.innerHTML = "X win this round";
        }else{
            AIPoint.innerHTML++;
            gameTurn.innerHTML = "O win this one"
        }
        ttt.reset();
    }
    if(ttt.turn == 9){
        /* stop game */
        ttt.reset();
        gameTurn.innerHTML="Draw";
    }
    updateUI();
}

function updateUI(){
    let i = 0;
    buttons.forEach((button) => {
        switch(ttt.get(i)){
            case 1:
                button.innerHTML = "X";
                break;
            case 2:
                button.innerHTML = "O";
                break;
            default:
                button.innerHTML = "";
                break;
        }
        i++;
    })
}

function findBestMove(){

    /* 
        I relize I screw up when i wrote this,
        I used a global turn order instead of the one inside ttt construct
        too much work to change it now
    */

    let gameTurn = document.getElementById("turn"); 
    let playerPoint = document.getElementById("player");
    let AIPoint = document.getElementById("AI");

    console.log(ttt.field);

    ttt.changeField(bestmove(ttt.field),turn);
    updateUI();
    if(!ttt.check(turn)){
        if(turn == 1){
            turn = 2;
            gameTurn.innerHTML = "O turn";
        }else{
            turn = 1;
            gameTurn.innerHTML = "X turn";
        }
    }else{
        if (turn == 1) {
            playerPoint.innerHTML++;
            gameTurn.innerHTML = "X win this round";
        }else{
            AIPoint.innerHTML++;
            gameTurn.innerHTML = "O win this one"
        }
        ttt.reset();
    }
    if(ttt.turn == 9){
        /* stop game */
        ttt.reset();
        gameTurn.innerHTML="Draw";
    }
}