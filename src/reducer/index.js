import {
  GET_CANDIDATES,
  DELETE_CANDIDATE,
  EDIT_CANDIDATE,
} from '../actions/actionTypes';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_CANDIDATES:
      return [...payload];

    case DELETE_CANDIDATE:
      return state.filter((candidate) => candidate._id !== payload);

    case EDIT_CANDIDATE:
      return state.map((candidate) =>
        candidate._id === payload._id ? payload : candidate
      );

    default:
      return state;
  }
};

export default reducer;
