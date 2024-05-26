import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';
import { saveTodoMiddleware } from './middlewares/saveTodoMiddleware';
import { updateStatusMiddleware } from './middlewares/updateStatusMiddleware';
import { updateColorMiddleware } from './middlewares/updateColorMiddleware';
import { thunk } from 'redux-thunk';
import { deleteTodoMiddleware } from './middlewares/deleteTodoMiddleware';
import { completeAllTodoMiddleware } from './middlewares/completeAllMiddleware';
import { clearCompletedTodoMiddleware } from './middlewares/clearCompletedMiddleware';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      saveTodoMiddleware,
      updateStatusMiddleware,
      updateColorMiddleware,
      deleteTodoMiddleware,
      completeAllTodoMiddleware,
      clearCompletedTodoMiddleware
    )
  )
);

export default store;
