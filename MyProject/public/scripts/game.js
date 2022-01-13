console.log("Working!");

const URL = "ws://localhost:3000";

let clicks = 0;
let start;
const socket = new WebSocket(URL);
let title = document.getElementById("title");
let finished = false;

function onStart(){
    console.log(socket);

    socket.onmessage = function (event){       

        // console.log(event);
        console.log(JSON.parse(event.data));
        var msg = JSON.parse(event.data);
        let cardToHide;
        let currScore;
        switch (msg.message_type){
            case "your_turn":
                clicks = 2;
                break;
            case "opponent's_choice":
                cardToHide = document.getElementById(msg.message_value);
                cardToHide.children[0].classList.add("hidden");
                break;
            case "correct_guess":
                cardToHide = document.getElementById(msg.message_value.id1);
                cardToHide.children[1].classList.add("hidden");
                cardToHide = document.getElementById(msg.message_value.id2);
                cardToHide.children[1].classList.add("hidden");
                break;
            case "incorrect_guess":
                cardToHide = document.getElementById(msg.message_value.id1);
                cardToHide.children[0].classList.remove("hidden");
                cardToHide = document.getElementById(msg.message_value.id2);
                cardToHide.children[0].classList.remove("hidden");
                break;
            case "update_your_score":
                currScore = document.getElementById("your_score");
                currScore.innerHTML = parseInt(currScore.innerHTML) + 1;
                break;
             case "update_opponent's_score":
                 currScore = document.getElementById("opponent's_score");
                 currScore.innerHTML = parseInt(currScore.innerHTML) + 1;
                 break;
            case "game_end":
                window.alert(msg.message_value + ".\nReturning to homescreen now...");
                window.location.href = "/";
                finished = true;
                break;
            case "start_time":
                start = Date.now();
                break;
            case "set_title":
                if (msg.message_value == "Your turn!")
                    addHover();
                else if (msg.message_value == "Opponent's turn!")
                    removeHover();
                title.innerHTML = msg.message_value;
                break;
        }
    }

    socket.onopen = function () {
        // socket.send("{}");
    };

    socket.onclose = function () {
        if (!finished) {
            window.alert("Opponent left! You won! You will be redirected to the home page...");
            window.location.href = "/";
        }
    };

    socket.onerror = function () {};

}


onStart();
/*
{
    "type" : "your_turn", "opponent_choice"
    "message" : {12};
}
*/

let cards = document.getElementsByClassName("cover");


for (card of cards){
   card.addEventListener("click",(e) => {
       if (clicks != 0) {
        let cover = e.target;
        
        let currId = cover.parentElement.id;
        console.log(cover);
        cover.classList.add("hidden");
        clicks--;
        socket.send(JSON.stringify({"card" : currId, "clicks" : 2 - clicks}));
       }
    })
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

setInterval(() => {
    let curr = 0;
    if (start)
        curr = Math.round((Date.now() - start) / 1000);
    document.getElementById("timer").innerHTML = curr.toString().toHHMMSS();
}, 1000);

function addHover(){
    let cards = document.getElementsByClassName("card");
    for (card of cards){
        card.classList.add("hoverable");
    }
}

function removeHover(){
    let cards = document.getElementsByClassName("card");
    for (card of cards){
        card.classList.remove("hoverable");
    }
}
