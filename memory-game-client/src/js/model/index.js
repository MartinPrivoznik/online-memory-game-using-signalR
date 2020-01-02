import * as signalR from '@aspnet/signalr';

//herní karta s hodnotou na líci a yin-yang na rubu
class boardPiece {
  constructor(value) {
    this.turned = false;
    this.value = value;
  }

  turn() {
    this.turned = !this.turned;
  }
}

//herní mechanika
class memoryGame {
  constructor(gameData) {
    this.board = gameData.board; //kolekce karet na DESKu
    this.maxTurned = gameData.maxTurned; //maximální počet v jednu chvíli otočených karet
    this.selected = gameData.selected; //kolekce hodnot (value) otočených karet
    this.connectionHub = gameData.connectionHub;
    this.roomName = gameData.roomName;
    this.playerTurn = gameData.playerTurn;
    this.passTurnEn = gameData.passTurnEn;
  }

  static initGame(maxTurned = 2, noOfCards = 28) {
    const newBoard = [];

    for (let index = 1; index <= noOfCards; index++) {
      newBoard.push(new boardPiece(index));
    }

    memoryGame._shuffleBoard(newBoard);

    const connection =  new signalR.HubConnectionBuilder()
    // .withUrl("http://192.168.0.108:5001/memorygamehub")
    .withUrl("https://localhost:44301/memorygamehub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    let roomName = 0;

    connection.start().then(function () {
      console.log("connected");
      roomName = connection
                .invoke('JoinRoom')
                .catch(err => console.error(err))
    }).catch(function () {
      console.log("Error while connecting to hub");
    });

    let gD = {
      board: newBoard,
      maxTurned: maxTurned,
      selected: [],
      connectionHub: connection,
      roomName: roomName,
      playerTurn: 1,
      passTurnEn: true
    };

    return new memoryGame(gD);
  }

  static _shuffleBoard(board) {
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }
  }

  _getTurned() {
    return this.board.filter(bp => bp.turned).length;
  }

  //number - hodnota na kartě (nikoliv její index!)
  Turn(number) {
    var self = this;
    if (
      (this._getTurned() < this.maxTurned)
    ) {
      this.board.forEach(function(bp) {
        if (bp.value === parseInt(number) && bp.turned === false) {
          bp.turn();
          let positionInSelected = self.selected.indexOf(number);
          if (positionInSelected !== -1)
            self.selected.splice(positionInSelected, 1);
          else self.selected.push(number);
          if(self.selected.length === 2)
          {
            self.passTurnEn = false;
          }
        }
      });
    }
    else {
     alert("Not your turn!")
    }
  }

  TurnBackAll() {
    var self = this;
    this.board.forEach(function(bp) {
      if(bp.turned === true)
      {
        bp.turn()
        let positionInSelected = self.selected.indexOf(bp.value);
          if (positionInSelected !== -1)
            self.selected.splice(positionInSelected, 1);
      }
    if (self.playerTurn === 1)
      self.playerTurn = 2;
    else if (self.playerTurn === 2)
      self.playerTurn = 1;
    });
  }
}

export default memoryGame;
