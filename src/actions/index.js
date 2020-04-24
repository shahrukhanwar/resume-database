import {
  GET_CANDIDATES,
  DELETE_CANDIDATE,
  EDIT_CANDIDATE,
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
