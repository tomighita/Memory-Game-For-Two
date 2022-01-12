const game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.playerAScore = 0;
    this.playerBScore = 0;
    this.id = gameID;
    this.cards = shuffleArr();

    this.checkIfEq = function (id1,id2){ return this.cards[id1] == this.cards[id2] };
};


function shuffleArr() {
    let arr = [];
    for (var i = 1; i < 13; i++){
        arr.push(`blob-${i}.svg`);
        arr.push(`blob-${i}.svg`);
    }

    // console.log(arr.sort((a, b) => 0.5 - Math.random()));
    // console.log(arr.sort((a, b) => 0.5 - Math.random()));
    // console.log(arr.sort((a, b) => 0.5 - Math.random()));

    const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
    return shuffledArray;
};

module.exports = game;
