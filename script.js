function gameBoard() {
    const board = [];

    //make board a 3x3 array
    for (let i = 0; i < 3; ++i) {
        board.push([]);
        for(let j = 0; j < 3; ++j) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;
    const modify = (row, col, player) => {
        if (board[row][col] == 0) {
            board[row][col] = player;
            return true;
        }
        return false;
    }

    const printBoard = () =>{
        console.log(board);
    }

    return {getBoard, modify, printBoard}; 
}


function gameController() {
    const board = gameBoard(); 
    let activePlayer = 1; 

    function printNewRound() {
        console.log(`player ${activePlayer}'s turn`);
        board.printBoard();
    }

    function playRound(row, col) {
        if (board.modify(row, col, activePlayer)) {
            if (checkWinner(row, col, activePlayer) == activePlayer) {
                console.log(`${activePlayer} wins`);
            }
            activePlayer = 3 - activePlayer; //just switching between players 
        }
        printNewRound();
    }

    function checkWinner(row, col, player) {//one of the hardest part 
        let vertical = 0, horizontal = 0, mainDiag = 0, suppDiag = 0; 
        let arr = board.getBoard(); 

        //check vertical line
        for(let i = row; i >= 0; --i) {
            if (arr[i][col] == player) ++vertical;
            else break;
        }
        for(let i = row + 1; i < 3; ++i) {
            if (arr[i][col] == player) ++vertical;
            else break;
        }
        if (vertical >= 3) return player;

        //check horizontal line
        for(let i = col; i >= 0; --i) {
            if (arr[row][i] == player) ++horizontal;
            else break;
        }
        for(let i = col + 1; i < 3; ++i) {
            if (arr[row][i] == player) ++horizontal;
            else break;
        }
        if (horizontal >= 3) return player;

        //check main diagonal
        for(let i = row, j = col; i >= 0 && j >= 0; --i, --j) {
            if (arr[i][j] == player) ++mainDiag;
            else break;
        }
        for(let i = row + 1, j = col + 1; i < 3 && j < 3; ++i, ++j) {
            if (arr[i][j] == player) ++mainDiag;
            else break;
        }
        if (mainDiag >= 3) return player;

        //check supp diagonal
        for(let i = row, j = col; i >= 0 && j < 3; --i, ++j) {
            if (arr[i][j] == player) ++suppDiag;
            else break;
        }
        for(let i = row + 1, j = col - 1; i < 3 && j >= 0; ++i, --j) {
            if (arr[i][j] == player) ++suppDiag;
            else break;
        }
        if (suppDiag >= 3) return player;

        return -1; 
    }

    printNewRound();

    return {playRound, getBoard: board.getBoard()}; 
}


function screenController() {
    let game = gameController(); 
    function render() {
        
    }
}