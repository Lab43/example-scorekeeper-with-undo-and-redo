import { getPlayers, createPlayer, updatePlayer } from '../api/players';
import { setLoading } from './system';
import { addHistory, withHistory } from './history';



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

const doAddPlayer = (player = {}) => (dispatch) => {
  const newPlayer = {...defaultPlayer, ...player};
  createPlayer(newPlayer);
  dispatch({
    type: ADD,
    player: newPlayer,
  });
}

const doRemovePlayer = (index) => (dispatch) => {
  updatePlayer(index, {removed: true});
  dispatch({
    type: REMOVE,
    index,
  });
}

const doRestorePlayer = (index) => (dispatch) => {
  updatePlayer(index, {remove: false});
  dispatch({
    type: RESTORE,
    index,
  });
}

const doSetPlayerName = (index, name) => (dispatch) => {
  updatePlayer(index, {name});
  dispatch({
    type: SET_NAME,
    index,
    name,
  });
}

const doSetPlayerScore = (index, score) => (dispatch) => {
  updatePlayer(index, {score});
  dispatch({
    type: SET_SCORE,
    index,
    score,
  });
}

export const addPlayer = (player = {}) => (dispatch, getState) => {
  // figure out what the new player's index will be
  const newPlayerIndex = getState().players.length;
  // create the player
  dispatch(doAddPlayer());
  dispatch(addHistory(
    // restore the deleted player when the redo button is hit
    doRestorePlayer(newPlayerIndex),
    // delete (mark as "removed") the player when the undo button is hit
    doRemovePlayer(newPlayerIndex),
  ));
}

export const removePlayer = (index) => (dispatch) => {
  dispatch(withHistory(
    doRemovePlayer(index),
    doRestorePlayer(index),
  ));
}

export const restorePlayer = (index) => (dispatch) => {
  dispatch(withHistory(
    doRestorePlayer(index),
    doRemovePlayer(index),
  ));
}

export const setPlayerName = (index, name) => (dispatch, getState) => {
  const oldName = getState().players[index].name;
  dispatch(withHistory(
    doSetPlayerName(index, name),
    doSetPlayerName(index, oldName),
  ));
}

export const setPlayerScore = (index, score) => (dispatch, getState) => {
  const oldScore = getState().players[index].score;
  console.log({index, score, oldScore});
  dispatch(withHistory(
    doSetPlayerScore(index, score),
    doSetPlayerScore(index, oldScore),
  ));
}
