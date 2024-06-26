import {
  ADDED,
  ALLCOMPLETED,
  CLEARCOMPLETED,
  COLORSELECTED,
  DATESELECTED,
  DELETED,
  EDIT,
  FETCHED,
  TOGGLED,
} from './actionTypes';

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADDED:
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ];

    case FETCHED:
      return action.payload;

    case TOGGLED:
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

    case COLORSELECTED:
      const { todoId, color } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          color: color,
        };
      });

    case DATESELECTED:
      const { id: dateTodoId, time } = action.payload;
      return state.map((todo) =>
        todo.id === dateTodoId ? { ...todo, time } : todo
      );

    case EDIT:
      const { id, editedText } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      );

    case DELETED:
      return state.filter((todo) => todo.id !== action.payload);

    case ALLCOMPLETED:
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });

    case CLEARCOMPLETED:
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};

export default reducer;
