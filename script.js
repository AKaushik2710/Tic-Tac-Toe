let boxes = document.querySelectorAll(".board-boxes");
let i = 1;
let last_marker;
const markers = ['X','O'];

document.getElementById("turn").innerHTML = "Turn : " + markers[0];
                            // APPENDING MARKERS
for(let box of boxes){
    let tr=1;
    box.addEventListener('click',()=>{
        const box_id = box.getAttribute('id');
        // console.log(box_id,typeof box_id);

        if(box.innerHTML == ""){
        box.innerHTML = marker_update();
        }
        win_check(box);
        turn_indicator();
    })
}

                            // UPDATING MARKERS
const marker_update = ()=>{
    if(last_marker == markers[0]){
        i++;
    }
    else{
        i--;
    }
    let marker = markers[i];
    last_marker = marker;

    return marker;
}
let id_Arr_X = [];
let id_Arr_O = [];

                        // WIN DISPLAYER
const display = document.createElement('div');
display.setAttribute('id','display');
document.getElementById("body").append(display);

                        // WIN CHECKER
const win_check = (box)=>{
    const wind_condt = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    let id = "";
    switch(box.innerHTML){
        case markers[0]:
            id = box.getAttribute('id');
            id_Arr_X.push(id);
            break;

        case markers[1]:
            id = box.getAttribute('id');
            id_Arr_O.push(id);
            break;
        
        default:
            console.log("Something is not right");
    }

    for(let wins of wind_condt){
        let condition_count_X = 0;
        let condition_count_O = 0;
        for(let win of wins){
            for(let cond of id_Arr_X){
                // console.log(win,cond);
                if(win==cond){
                    condition_count_X++;
                    // console.log(win,cond,condition_count);
                    if(condition_count_X == 3){
                        console.log("X won");
                        condition_count_X = 0;
                        display.innerHTML = `X Won`;
                        for(let box of boxes){
                            box.innerHTML += `<!-- Filled Up-->`;
                        }
                    }
                }
            }
            for(let cond of id_Arr_O){
                // console.log(win,cond);
                if(win==cond){
                    condition_count_O++;
                    // console.log(win,cond,condition_count);
                    if(condition_count_O == 3){
                        console.log("O won");
                        condition_count_O =0;
                        display.innerHTML = `O Won`;
                        
                    }
                }
            }
        }
    }

}
                            // TURN INDICATOR
function turn_indicator(){
    if(last_marker == markers[0] || last_marker == ""){
        document.getElementById("turn").innerHTML = "Turn : " + markers[1];
    }
    else{
        document.getElementById("turn").innerHTML = "Turn : " + markers[0];
    }
}
                            // NEW TURN
function new_Turn(){
    for(let x=0;id_Arr_X.length!=0; x++){
        id_Arr_X.pop();
    }
    for(let o=0;id_Arr_O.length!=0; o++){
        id_Arr_O.pop();
    }
}

                            // RESET BUTTON
document.getElementById('reset').addEventListener('click',()=>{
    new_Turn();
    display.innerHTML = "";
    for(let box of boxes){
        box.innerHTML = "";
    }
    last_marker = markers[1];
    i=1;
    document.getElementById("turn").innerHTML = "Turn : " + markers[0];
})

                            // COLOR CHANGING FUNCTION
function chng(){
    let clr_1 = Math.floor(Math.random()*255);
    let clr_2 = Math.floor(Math.random()*255);
    let clr_3 = Math.floor(Math.random()*255);
    let visi = Math.random();

    return `rgba(${clr_1},${clr_2},${clr_3},${visi})`
}

                            // COLOR & BORDER CHANGE
setInterval(()=>{
document.getElementById("reset").style.borderLeft = ` 5px solid ${chng()}`;
document.getElementById("reset").style.borderTop = ` 5px solid ${chng()}`;
document.getElementById("reset").style.borderRight = ` 5px solid ${chng()}`;
document.getElementById("reset").style.borderBottom = ` 5px solid ${chng()}`;
display.style.color = chng()
},300);

