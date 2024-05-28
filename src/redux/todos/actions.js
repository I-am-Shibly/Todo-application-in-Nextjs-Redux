import {
  ADDED,
  ALLCOMPLETED,
  CLEARCOMPLETED,
  COLORSELECTED,
  DELETED,
  EDIT,
  FETCHED,
  TOGGLED,
} from './actionTypes';

export const added = (todoText) => {
  return {
    type: ADDED,
    payload: todoText,
  };
};

export const fetched = (todos) => {
  return {
    type: FETCHED,
    payload: todos,
  };
};

export const toggled = (todoId) => {
  return {
    type: TOGGLED,
    payload: todoId,
  };
};

export const textEdited = (id, editedText) => {
  return {
    type: EDIT,
    payload: {
      id,
      editedText,
    },
  };
};

export const colorSelected = (todoId, color) => {
  return {
    type: COLORSELECTED,
    payload: {
      todoId,
      color,
    },
  };
};

export const deleted = (todoId) => {
  return {
    type: DELETED,
    payload: todoId,
  };
};

export const allCompleted = () => {
  return {
    type: ALLCOMPLETED,
  };
};

export const clearCompleted = () => {
  return {
    type: CLEARCOMPLETED,
  };
};
