import memoryGame from "../model/index";

const initState = memoryGame.initGame();

export default (state = initState, action) => {
  //console.log(action.type);
  let pg = new memoryGame(state);

  switch (action.type) {
    case turn:
      var room = pg.connectionHub
      .invoke('GetRoom').then(function(result) {
        console.log(room);
        pg.connectionHub
        .invoke('TurnCard', String(result), String(action.value))
        .catch(err => console.error(err));
      });
      return pg;

    case turnEnemy:
        console.log("Brasko, jsem tu" + action.value);
        pg.Turn(action.value);
        return pg;

    default:
      return state;
  }
};

const turn = "turn-action;";
const turnEnemy = "turnEnemy-action;";

export const actionCreators = {
  turn: value => ({ type: turn, value: value }),
  turnEnemy: value => ({ type: turnEnemy, value: value})
};
