import { getPlayers } from '../api/players';
import { setLoading } from './system';



// =======
// actions
// =======

const LOAD      = 'players/LOAD';
const ADD       = 'players/ADD';
const REMOVE    = 'players/REMOVE';
const RESTORE   = 'players/RESTORE';
const SET_NAME  = 'players/SET_NAME';
const SET_SCORE = 'players/SET_SCORE';



// =======
// reducer
// =======

const defaultPlayer = {
  name: '',
  score: 0,
  removed: false,
}

const players = (state = [], action) => {
  switch (action.type) {

    case LOAD:
      return action.players;

    case ADD:
      return [
        ...state,
        {...defaultPlayer, ...action.player},
      ];

    case REMOVE:
      return state.map((player, index) => (
        (index === action.index)
          ? {...player, removed: true}
          : player
      ));

    case RESTORE:
      return state.map((player, index) => (
        (index === state.index)
          ? {...player, removed: false}
          : player
      ));

    case SET_NAME:
      return state.map((player, index) => (
        (index === state.index)
          ? {...player, name: action.name}
          : player
      ));

    case SET_SCORE:
      return state.map((player, index) => (
        (index === state.index)
          ? {...player, score: action.score}
          : player
      ));

    default:
      return state;

  }
}

export default players;



// ===============
// action creators
// ===============

export const loadPlayers = () => async (dispatch) => {
  const response = await getPlayers();
  dispatch({
    type: LOAD,
    players: response.players,
  });
  dispatch(setLoading(false));
}

export const addPlayer = (player = {}) => ({
  type: ADD,
  player,
});

export const removePlayer = (index) => ({
  type: REMOVE,
  index,
});

export const restorePlayer = (index) => ({
  type: RESTORE,
  index,
});

export const setPlayerName = (index, name) => ({
  type: SET_NAME,
  index,
  name,
});

export const setPlayerScore = (index, score) => ({
  type: SET_SCORE,
  index,
  score,
});
