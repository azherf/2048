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
            return emptyCells[Math.round((Math.random() * 10) % emptyCells.length)];
        };
        /* getRandomRow: function() {
            return Math.round((Math.random() * 10) % 4);
        },
        getRandomColumn: function() {
            return Math.round((Math.random() * 10) % 4);
        }, */
        this.getRandomValue = function() {
            const values = [2, 4];
            return values[Math.round((Math.random() * 10) % 2)];
        };
        this.reArrangeValues = function(direction) {
            if(direction === 'right') {
                for(let i = 0; i < this.gameArray.length; i++) {
                    const row = this.gameArray[i];
                    let emptyCellIndex = -1;
                    let lastMovedValue = 0;
                    for(let j = row.length - 1; j >= 0; j--) {
                        if(row[j] === 0) {
                            emptyCellIndex = j;
                        } else {
                            if(lastMovedValue !== 0 && lastMovedValue === row[j]) {
                                
                            }
                            lastMovedValue = row[j];
                        }

                    }
                }
            }
        }
    }

    const game = new Game();

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
