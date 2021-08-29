import ACTIONS from '../actions/'

const initialState = [];

const bugReducers = (state = initialState, action) => {
  switch (action.type) {   
    case ACTIONS.GET_ALL_BUGS:
        return action.payload
    default:
      return state
  }
};

export default bugReducers;
