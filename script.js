playGame = () => {

    function Game() {
        this.arrowKeys = [37, 38, 39, 40];
        this.gameArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; //2D
        this.hasMoved = false;
        this.getRandomEmptyCell = function() {
            const emptyCells = []; //2D
            for(let i = 0; i < this.gameArray.length; i++) {
                const row = this.gameArray[i];
                for(let j = 0; j < row.length; j++) {
                    if(!row[j]) {
                        emptyCells.push([i, j]);
                    }
                }
            }
            return emptyCells[Math.floor((Math.random() * 10) % emptyCells.length)];
        };
        /* getRandomRow: function() {
            return Math.round((Math.random() * 10) % 4);
        },
        getRandomColumn: function() {
            return Math.round((Math.random() * 10) % 4);
        }, */
        this.getRandomValue = function() {
            const values = [2, 2, 2, 2, 4]; // Using this to give 2 most of the times.
            return values[Math.floor((Math.random() * 10) % 5)];
        };
        this.insertNewValue = function() {
            const cell = game.getRandomEmptyCell();
            const rand = game.getRandomValue();
            this.gameArray[cell[0]][cell[1]] = rand;
        };
        this.reArrangeValues = function(direction) {
            if(direction === 'right') {
                // console.log(this.gameArray);
                for(let i = 0; i < this.gameArray.length; i++) {
                    const row = this.gameArray[i];
                    let maxIndex = row.length - 1;
                    for(let j = row.length - 1; j >= 0; j--) {
                        if(row[j] === 0) {

                        } else {
                            if(row[j] === row[maxIndex]) {
                                if(maxIndex === j) {
                                    continue;
                                }
                                row[maxIndex] += row[j];
                                maxIndex--;
                                row[j] = 0;
                                hasMoved = true;
                            } else {
                                maxIndex = row[maxIndex] !== 0 ? --maxIndex : maxIndex;
                                if(maxIndex === j) {
                                    continue;
                                }
                                row[maxIndex] = row[j];
                                row[j] = 0;
                            }
                        }
                    }
                }
                // console.log(this.gameArray);
                this.insertNewValue();
                console.log(this.gameArray);
            }
        }
    }

    const game = new Game();
    for(let i = 0; i < 2; i++) {
        game.insertNewValue();
    }

    console.log(game.gameArray);

    window.onkeyup = ($event) => {
        const arrowKeys = [37, 38, 39, 40];
        const keyCode = $event.keyCode;
        if(arrowKeys.indexOf(keyCode) === -1) {
            return;
        }
        switch(keyCode) {
            case 37: //left arrow key
                game.reArrangeValues('left');
                break;
            case 38: //top arrow key
                game.reArrangeValues('top');
                break;
            case 39: //right arrow key
                game.reArrangeValues('right');
                break;
            case 40: //down arrow key
                game.reArrangeValues('down');
                break;
            default:
                const emptyCell = game.getRandomEmptyCell();
                const newValue = game.getRandomValue();
                game[emptyCell[0]][emptyCell[1]] = newValue;
                break;
        }
    };


}

playGame();
