const moveScore = [[4],[0,2,6,8],[1,3,5,7]];


function bestmove(map){
    let move = [];
    let continues = true;

    /* search for moves*/
    moveScore.forEach((score) =>{
        let i = 0;
        if(!continues){
            i = 1000;
        }

        for(;i<score.length;i++){
            if(map[score[i]] == 0){
                move.push(score[i]);
                continues = false;
            }
        }
    })
    continues = true;

    return choseMove(move);
}

/* chose a random move from aviliable */
function choseMove(move){
    let number = Math.floor(Math.random() * move.length);
    console.log(move.length + " move avil " + move[number] + " chosen"); 

    return move[number];
}