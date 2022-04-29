// =======
// actions
// =======

const SET_LOADING = 'system/SET_LOADING';



// =======
// reducer
// =======

const system = (state = {loading: true}, action) => {
  switch (action.type) {

    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }

    default:
      return state;

  }
}

export default system;



// ===============
// action creators
// ===============

export const setLoading = (loading = true) => ({
  type: SET_LOADING,
  loading,
});
