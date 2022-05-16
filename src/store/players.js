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

const handleAddPlayer = (player = {}) => (dispatch) => {
  const newPlayer = {...defaultPlayer, ...player};
  createPlayer(newPlayer);
  dispatch({
    type: ADD,
    player: newPlayer,
  });
}

const handleRemovePlayer = (index) => (dispatch) => {
  updatePlayer(index, {removed: true});
  dispatch({
    type: REMOVE,
    index,
  });
}

const handleRestorePlayer = (index) => (dispatch) => {
  updatePlayer(index, {remove: false});
  dispatch({
    type: RESTORE,
    index,
  });
}

const handleSetPlayerName = (index, name) => (dispatch) => {
  updatePlayer(index, {name});
  dispatch({
    type: SET_NAME,
    index,
    name,
  });
}

const handleSetPlayerScore = (index, score) => (dispatch) => {
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
  dispatch(handleAddPlayer());
  // add an entry to the history stack
  dispatch(addHistory(
    // restore the deleted player when the redo button is hit
    handleRestorePlayer(newPlayerIndex),
    // delete (mark as "removed") the player when the undo button is hit
    handleRemovePlayer(newPlayerIndex),
  ));
}

export const removePlayer = (index) => (dispatch) => {
  dispatch(withHistory(
    handleRemovePlayer(index),
    handleRestorePlayer(index),
  ));
}

export const restorePlayer = (index) => (dispatch) => {
  dispatch(withHistory(
    handleRestorePlayer(index),
    handleRemovePlayer(index),
  ));
}

export const setPlayerName = (index, name) => (dispatch, getState) => {
  // get the current name from the store
  const oldName = getState().players[index].name;
  dispatch(withHistory(
    handleSetPlayerName(index, name),
    handleSetPlayerName(index, oldName),
  ));
}

export const setPlayerScore = (index, score) => (dispatch, getState) => {
  // get the current score from the store
  const oldScore = getState().players[index].score;
  dispatch(withHistory(
    handleSetPlayerScore(index, score),
    handleSetPlayerScore(index, oldScore),
  ));
}
