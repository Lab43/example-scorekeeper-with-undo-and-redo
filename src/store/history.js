// =======
// actions
// =======

const ADD_HISTORY = 'history/ADD_HISTORY';
const SET_CURSOR  = 'history/SET_CURSOR';



// =======
// reducer
// =======

/* The cursor is zero-based since it's used to access items in the arrays.
   For example, if the cursor is 2 that means there 3 actions we can undo.
   If the cursor is -1 it means there are no undo actions available. */

const initialState = {
  cursor: -1,
  undos: [],
  redos: [],
}

const history = (state = initialState, action) => {
  switch (action.type) {

    case ADD_HISTORY:
      return {
        ...state,
        // remove any undos past the cursor position and add the new undo
        undos: [
          ...state.undos.slice(0, state.cursor + 1),
          action.undo,
        ],
        // remove any redos past the cursor position and add the new redo
        redos: [
          ...state.redos.slice(0, state.cursor + 1),
          action.redo,
        ],
        // move the cursor forward
        cursor: state.cursor + 1,
      }

    case SET_CURSOR:
      return {
        ...state,
        cursor: action.cursor,
      }

    default:
      return state;

  }
}

export default history;



// ===============
// action creators
// ===============

export const addHistory = (redo, undo) => ({
  type: ADD_HISTORY,
  redo,
  undo
});

// do an action then save that action and it's undo action to the history
export const withHistory = (redo, undo) => (dispatch) => {
  dispatch(redo);
  dispatch(addHistory(redo, undo));
};

const setCursor = (cursor) => ({
  type: SET_CURSOR,
  cursor,
});

export const undo = () => (dispatch, getState) => {
  const { cursor, undos } = getState().history;
  if (cursor === -1) throw new Error('No actions to undo');
  // undo the action at the cursor position
  dispatch(undos[cursor]);
  // then move the cursor back
  dispatch(setCursor(cursor - 1));
}

export const redo = () => (dispatch, getState) => {
  const { cursor, redos } = getState().history;
  if (cursor + 1 >= redos.length) throw new Error('No actions to redo');
  // move the cursor forward
  dispatch(setCursor(cursor + 1));
  // then redo the action at the new cursor position
  dispatch(redos[cursor + 1]);
}
