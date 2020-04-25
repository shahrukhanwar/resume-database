import {
  GET_CANDIDATES,
  DELETE_CANDIDATE,
  EDIT_CANDIDATE,
  ADD_TAG,
  DELETE_TAG,
  ADD_NOTES,
} from '../actions/actionTypes';

export const getCandidates = (data) => ({
  type: GET_CANDIDATES,
  payload: data,
});

export const deleteCandidate = (id) => ({
  type: DELETE_CANDIDATE,
  payload: id,
});

export const editCandidate = (data) => ({
  type: EDIT_CANDIDATE,
  payload: data,
});

export const addTag = (id, tag) => ({
  type: ADD_TAG,
  payload: { id, tag },
});

export const deleteTag = (id, tag) => ({
  type: DELETE_TAG,
  payload: { id, tag },
});

export const addNotes = (id, notes) => ({
  type: ADD_NOTES,
  payload: { id, notes },
});
