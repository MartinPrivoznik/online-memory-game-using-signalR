import memoryGame from "../model/index";

const initState = memoryGame.initGame();

export default (state = initState, action) => {
  //console.log(action.type);
  let pg = new memoryGame(state);

  switch (action.type) {
    case turn:
      pg.connectionHub
      .invoke('GetPlayerNum').then(function(playerNum) {
          console.log(playerNum);
          console.log(pg.playerTurn);
        if (playerNum === pg.playerTurn)
        {
            pg.connectionHub
            .invoke('GetRoom').then(function(result) {
                pg.connectionHub
                .invoke('TurnCard', String(result), String(action.value));
            });
        }
        else
        {
            alert("Not your turn!");
        }
      });
      return pg;

    case turnEnemy:
        pg.Turn(action.value);
        return pg;

    case passTurn:
        pg.connectionHub
      .invoke('GetPlayerNum').then(function(playerNum) {
          console.log(playerNum);
          console.log(pg.playerTurn);
        if (playerNum === pg.playerTurn)
        {
            pg.connectionHub
            .invoke('GetRoom').then(function(result) {
                pg.connectionHub
                .invoke('TurnBackAll', String(result));
            });
        }
        else
        {
            alert("Not your turn!");
        }
      });
        return pg;

    case passTurnEnemy:
        pg.TurnBackAll();
        return pg;
    default:
      return state;
  }
};

const turn = "turn-action;";
const turnEnemy = "turnEnemy-action;";
const passTurn = "passTurn-action;";
const passTurnEnemy = "passTurnEnemy-action"

export const actionCreators = {
  turn: value => ({ type: turn, value: value }),
  turnEnemy: value => ({ type: turnEnemy, value: value}),
  passTurn: () => ({type: passTurn}),
  passTurnEnemy: () => ({type: passTurn})
};
