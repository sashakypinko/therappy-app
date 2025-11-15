import { combineReducers } from 'redux';

import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
