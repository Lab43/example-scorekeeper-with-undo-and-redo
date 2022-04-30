import { getPlayers, createPlayer, updatePlayer } from '../api/players';
import { setLoading } from './system';



const defaultPlayer = {
  name: '',
  score: 0,
  removed: false,
}



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

const players = (state = [], action) => {
  switch (action.type) {

    case LOAD:
      return action.players;

    case ADD:
      return [
        ...state,
        action.player,
      ];

    case REMOVE:
      return state.map((player, index) => (
        (index === action.index)
          ? {...player, removed: true}
          : player
      ));

    case RESTORE:
      return state.map((player, index) => (
        (index === action.index)
          ? {...player, removed: false}
          : player
      ));

    case SET_NAME:
      return state.map((player, index) => (
        (index === action.index)
          ? {...player, name: action.name}
          : player
      ));

    case SET_SCORE:
      return state.map((player, index) => (
        (index === action.index)
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

// Most of these action creators are incomplete. We're optimistically updating the state before receiving the response from the API but not dealing with API errors. So if this app had a real API some of these requests would fail and the user would think changes are getting saved when they aren't.

export const loadPlayers = () => async (dispatch) => {
  const response = await getPlayers();
  dispatch({
    type: LOAD,
    players: response.players,
  });
  dispatch(setLoading(false));
}

export const addPlayer = (player = {}) => (dispatch) => {
  const newPlayer = {...defaultPlayer, ...player};
  createPlayer(newPlayer);
  dispatch({
    type: ADD,
    player: newPlayer,
  });
}

export const removePlayer = (index) => (dispatch) => {
  updatePlayer(index, {removed: true});
  dispatch({
    type: REMOVE,
    index,
  });
}

export const restorePlayer = (index) => (dispatch) => {
  updatePlayer(index, {remove: false});
  dispatch({
    type: RESTORE,
    index,
  });
}

export const setPlayerName = (index, name) => (dispatch) => {
  updatePlayer(index, {name});
  dispatch({
    type: SET_NAME,
    index,
    name,
  });
}

export const setPlayerScore = (index, score) => (dispatch) => {
  updatePlayer(index, {score});
  dispatch({
    type: SET_SCORE,
    index,
    score,
  });
}
