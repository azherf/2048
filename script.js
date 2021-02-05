playGame = () => {

    function Game() {
        this.arrowKeys = [37, 38, 39, 40];
        this.gameArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; //2D
        this.score = 0;
        this.bestScore = +localStorage.getItem("bestScore");
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
            return emptyCells.length ? emptyCells[Math.floor((Math.random() * 10) % emptyCells.length)] : emptyCells;
        };
        this.getRandomValue = function() {
            const values = [2, 2, 2, 2, 4]; // Using this to give 2 most of the times.
            return values[Math.floor((Math.random() * 10) % 5)];
        };
        this.insertNewValue = function() {
            const cell = this.getRandomEmptyCell();
            if(!cell || !cell.length) {
                window.alert("Game Over");
                window.removeEventListener('keyup', (e) => {
                    const keyCode = e.keyCode;
                });
                return;
            }
            const rand = this.getRandomValue();
            this.gameArray[cell[0]][cell[1]] = rand;
            this.bindToDOM();
        };
        this.reArrangeValues = function(direction) {
            let hasMoved = false;
            if(direction === 'right') {
                hasMoved = this.handleRightClick(this.gameArray);
            } else if(direction === 'left') {
                hasMoved = this.handleLeftClick(this.gameArray);
                // console.log(this.gameArray);
            } else if(direction === 'top') {
                //convert gameArray to columnar array
                const colArray = this.transformToColumnarArray(this.gameArray);
                hasMoved = this.handleLeftClick(colArray);
                this.gameArray = this.transformToColumnarArray(colArray);
            } else if(direction === 'down') {
                //convert gameArray to columnar array
                const colArray = this.transformToColumnarArray(this.gameArray);
                hasMoved = this.handleRightClick(colArray);
                this.gameArray = this.transformToColumnarArray(colArray);
            }
            if(hasMoved) {
                this.insertNewValue();
            } else {
                const cell = this.getRandomEmptyCell();
                if(!cell || !cell.length) {
                    window.alert("Game Over");
                    window.removeEventListener('keyup', (e) => {
                        const keyCode = e.keyCode;
                    });
                    return;
                }
            }

            // console.log(this.gameArray);
        };
        this.handleLeftClick = function(array) {
            let hasMoved = false;
            for(let i = 0; i < array.length; i++) {
                const row = array[i];
                let minIndex = 0;
                for(let j = 0; j < row.length; j++) {
                    if(row[j] === 0) {

                    } else {
                        if(row[j] === row[minIndex]) {
                            if(minIndex === j) {
                                continue;
                            }
                            row[minIndex] += row[j];
                            this.addToCurrentScore(row[minIndex]);
                            minIndex++;
                            row[j] = 0;
                            hasMoved = true;
                        } else {
                            minIndex = row[minIndex] !== 0 ? ++minIndex : minIndex;
                            if(minIndex === j) {
                                continue;
                            }
                            row[minIndex] = row[j];
                            row[j] = 0;
                            hasMoved = true;
                        }
                    }
                }
            }
            return hasMoved;
        };
        this.handleRightClick = function(array) {
            let hasMoved = false;
            for(let i = 0; i < array.length; i++) {
                const row = array[i];
                let maxIndex = row.length - 1;
                for(let j = row.length - 1; j >= 0; j--) {
                    if(row[j] === 0) {

                    } else {
                        if(row[j] === row[maxIndex]) {
                            if(maxIndex === j) {
                                continue;
                            }
                            row[maxIndex] += row[j];
                            this.addToCurrentScore(row[maxIndex]);
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
                            hasMoved = true;
                        }
                    }
                }
            }
            return hasMoved;
        };
        this.transformToColumnarArray = (array) => {
            const colArray = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
            for(let i = 0; i < array.length; i++) {
                const row = array[i];
                for(let j = 0; j < row.length; j++) {
                    colArray[j][i] = row[j];
                }
            }
            return colArray;
        };
        this.bindToDOM = function() {
            for(let i = 0; i < this.gameArray.length; i++) {
                const row = this.gameArray[i];
                for(let j = 0; j < row.length; j++) {
                    const elem = document.querySelector('.tile_' + i + j);
                    const prefix = 'value-';
                    this.removeClassByPrefix(elem, prefix);
                    if(row[j] !== 0)
                    {
                        elem.innerHTML = row[j];
                        elem.classList.add(prefix + row[j]);
                    } else {
                        elem.innerHTML = '&nbsp';
                    }
                }
            }
        };
        this.removeClassByPrefix = function(node, prefix) {
            var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
            node.className = node.className.replace(regx, '');
            return node;
        };
        this.resetGame = function() {
            this.gameArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            this.insertInitialValues();
            this.bindToDOM();
            this.score = 0;
            this.updateCurrentScoreOnDOM();
        };
        this.insertInitialValues = function() {
            for(let i = 0; i < 2; i++) {
                this.insertNewValue();
            }
        };
        this.addToCurrentScore = function(value) {
            this.score += value;
            this.updateCurrentScoreOnDOM();
            if(this.score > this.bestScore) {
                this.updateBestScore(this.score);
            }
        };
        this.updateBestScore = function(value) {
            this.bestScore = value;
            localStorage.setItem("bestScore", value);
            this.updateBestScoreOnDOM();
        };
        this.updateCurrentScoreOnDOM = function() {
            document.querySelector(".thisScore .total").innerText = this.score;
        };
        this.updateBestScoreOnDOM = function() {
            document.querySelector(".bestScore .total").innerText = this.bestScore;
        }; 
        this.setGame = function () {
            this.insertInitialValues();
            this.score = 0;
            this.updateCurrentScoreOnDOM();
            this.updateBestScoreOnDOM();
        };
        this.setGame();
    }

    window.onload = () => {
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
                    break;
            }
        };

        document.querySelector(".newGame").addEventListener("click", function() {
            game.resetGame();

        });
    }
}

playGame();
