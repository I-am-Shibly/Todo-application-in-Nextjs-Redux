export const clearCompletedTodoMiddleware = (store) => (next) => (action) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
    
  if (action.type === 'todos/clearcompleted') {
    const updatedTodos = existingTodos.filter((todo) => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  next(action);
};
