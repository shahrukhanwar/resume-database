import {
  GET_CANDIDATES,
  DELETE_CANDIDATE,
  EDIT_CANDIDATE,
  ADD_TAG,
  DELETE_TAG,
  ADD_NOTES,
} from '../actions/actionTypes';

// get all candidates
export const getCandidates = (data) => ({
  type: GET_CANDIDATES,
  payload: data,
});

// delete a candidate by id
export const deleteCandidate = (id) => ({
  type: DELETE_CANDIDATE,
  payload: id,
});

// edit candidate details
export const editCandidate = (data) => ({
  type: EDIT_CANDIDATE,
  payload: data,
});

// add a tag to a candidate
export const addTag = (id, tag) => ({
  type: ADD_TAG,
  payload: { id, tag },
});

// delete tag
export const deleteTag = (id, tag) => ({
  type: DELETE_TAG,
  payload: { id, tag },
});

// add notes for a candidate
export const addNotes = (id, notes) => ({
  type: ADD_NOTES,
  payload: { id, notes },
});
