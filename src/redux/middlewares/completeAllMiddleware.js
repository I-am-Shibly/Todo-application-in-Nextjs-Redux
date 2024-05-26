export const completeAllTodoMiddleware = (store) => (next) => (action) => {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  if (action.type === 'todos/allcompleted') {
    const updatedTodos = existingTodos.map((todo) => {
      return { ...todo, completed: true };
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  next(action);
};
