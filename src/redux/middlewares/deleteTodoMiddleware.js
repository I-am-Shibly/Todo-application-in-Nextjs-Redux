export const deleteTodoMiddleware = (store) => (next) => (action) => {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  if (action.type === 'todos/deleted') {
    const updatedTodos = existingTodos.filter(
      (todo) => todo.id !== action.payload
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  next(action);
};
