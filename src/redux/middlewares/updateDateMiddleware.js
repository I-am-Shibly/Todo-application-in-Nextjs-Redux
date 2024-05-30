export const updateDateMiddleware = (store) => (next) => (action) => {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
  if (action.type === 'todos/dateSelected') {
    const updatedTodos = existingTodos.map((todo) =>
      todo.id === action.payload.id
        ? { ...todo, time: action.payload.time }
        : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  next(action);
};
