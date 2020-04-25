import {
  GET_CANDIDATES,
  DELETE_CANDIDATE,
  EDIT_CANDIDATE,
  ADD_TAG,
  DELETE_TAG,
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

    case ADD_TAG:
      return state.map((candidate) =>
        candidate._id === payload.id
          ? { ...candidate, tags: [...candidate.tags, payload.tag] }
          : candidate
      );

    case DELETE_TAG:
      return state.map((candidate) =>
        candidate._id === payload.id
          ? {
              ...candidate,
              tags: candidate.tags.filter((tag) => tag !== payload.tag),
            }
          : candidate
      );
    default:
      return state;
  }
};

export default reducer;
