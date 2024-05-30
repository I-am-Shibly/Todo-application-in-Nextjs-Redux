import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';
import { saveTodoMiddleware } from './middlewares/saveTodoMiddleware';
import { updateStatusMiddleware } from './middlewares/updateStatusMiddleware';
import { updateColorMiddleware } from './middlewares/updateColorMiddleware';
import { deleteTodoMiddleware } from './middlewares/deleteTodoMiddleware';
import { completeAllTodoMiddleware } from './middlewares/completeAllMiddleware';
import { clearCompletedTodoMiddleware } from './middlewares/clearCompletedMiddleware';
import { editTodoMiddleware } from './middlewares/editTodoMiddleware';
import { updateDateMiddleware } from './middlewares/updateDateMiddleware';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      saveTodoMiddleware,
      editTodoMiddleware,
      updateStatusMiddleware,
      updateColorMiddleware,
      updateDateMiddleware,
      deleteTodoMiddleware,
      completeAllTodoMiddleware,
      clearCompletedTodoMiddleware
    )
  )
);

export default store;
