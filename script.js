/* constructor */
const ttt = (() =>{
    /* 0 = empty, 1 = X, 2 = O */
    let field = [0,0,0,0,0,0,0,0,0];

    const check = () => {return "X";}
    const reset = () =>{field = [0,0,0,0,0,0,0,0,0];}
    const get = (i) => {return field[i];}

    const changeField = (loc, to) => {
        if(field[loc] == 0){
            field[loc] = Number(to);
        }
    }


    return {changeField, check, reset, get};
})()

const player = (name) => {
    let win = 0, lose = 0;
    const winRate = () => {return win/(win+lose)};

    return(name, win, lose, winRate);
}

/* algorithms */
let turn = 1;
let AI = player("AI", 0, 0), friendly = player("player",0,0);
let buttons = document.querySelectorAll(".game button");
buttons.forEach((button) =>{
    button.addEventListener('click', event => {
        game_cycle(button);
    })
})

function game_cycle(button){    
    let id = button.id;
    ttt.changeField(id, turn);

    if(turn == 1){
        turn = 2;
    }else{
        turn = 1;
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

function resetBoard(){
    ttt.reset();
    updateUI();
}