const game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
};


game.prototype.shuffleArr = function (){
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
