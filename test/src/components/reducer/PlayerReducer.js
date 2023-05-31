import { SELECT_PLAYER } from '../Type';

const initialState = {
  selectedPlayer: null
}

const PlayerReducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      }
    default:
      return state;
  }
}

export default PlayerReducer;
