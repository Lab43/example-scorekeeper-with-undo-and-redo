const ADD_HISTORY = 'history/ADD_HISTORY';
const SET_CURSOR  = 'history/SET_CURSOR';



// =======
// reducer
// =======

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
        cursor: state.cursor + 1,
        undos: [
          ...state.undos.slice(0, state.cursor + 1),
          action.undo,
        ],
        redos: [
          ...state.redos.slice(0, state.cursor + 1),
          action.redo,
        ]
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

const setCursor = (cursor) => ({
  type: SET_CURSOR,
  cursor,
});

export const undo = () => (dispatch, getState) => {
  const { cursor, undos } = getState().history;
  if (cursor === -1) throw new Error('No actions to undo');
  dispatch(undos[cursor]);
  dispatch(setCursor(cursor - 1));
}

export const redo = () => (dispatch, getState) => {
  const { cursor, redos } = getState().history;
  if (cursor + 1 >= redos.length) throw new Error('No actions to redo');
  dispatch(redos[cursor + 1]);
  dispatch(setCursor(cursor + 1));
}
