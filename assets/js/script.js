const gameSpace = document.querySelector('.game');
const results = document.querySelector('.results');
const ticTacToe = {
  board: ['', '', '', '', '', '', '', '', ''],
  container: null,
  gameOver: true,
  rounds: 0,
  player: {
    symbols: ['X', 'O'],
    playerIndex: 0,
    timeToPlay: function () {
      if (this.playerIndex === 0) {
        this.playerIndex = 1;
      } else {
        this.playerIndex = 0;
      }
    },
  },
  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  winingCheck: function (simbol) {
    for (i in this.winningCombinations) {
      if (
        this.board[this.winningCombinations[i][0]] == simbol &&
        this.board[this.winningCombinations[i][1]] == simbol &&
        this.board[this.winningCombinations[i][2]] == simbol
      ) {
        console.log(`Sequência vencedora ${i}`);
        return i;
      }
    }
  },
  drawCheck: function () {
    if (this.rounds === 9) {
      this.gameOver = false;
      gameSpace.style.display = 'none';
      results.style.display = 'flex';
      document.querySelector('.restart').style.display = 'none';
      document.querySelector(
        '.results h1'
      ).innerHTML = `Empate, ninguém venceu!`;
    }
  },
  init: function () {
    this.gameOver = true;
    this.rounds = 0;
    gameSpace.style.display = 'grid';
    results.style.display = 'none';
    document.querySelector('.restart').style.display = 'block';
    this.container = gameSpace;
    for (i in this.board) {
      this.board[i] = '';
    }
    this.draw();
  },
  makeAPlay: function (position) {
    if (this.gameOver) {
      if (this.board[position] === '') {
        this.board[position] = this.player.symbols[this.player.playerIndex];
        this.draw();
        let winingCheckIndex = this.winingCheck(
          this.player.symbols[this.player.playerIndex]
        );
        if (winingCheckIndex >= 0) {
          this.endGame();
        } else {
          this.player.timeToPlay();
          this.rounds++;
          this.drawCheck();
        }
      }
    }
  },
  endGame: function () {
    this.gameOver = false;
    gameSpace.style.display = 'none';
    results.style.display = 'flex';
    document.querySelector('.restart').style.display = 'none';
    document.querySelector('.results h1').innerHTML = `O jogador ${
      this.player.playerIndex + 1
    } venceu!`;
  },
  draw: function () {
    let content = '';
    for (let i in this.board) {
      content += `<div onclick="ticTacToe.makeAPlay(${i})">${this.board[i]}</div>`;
    }

    this.container.innerHTML = content;
  },
};
