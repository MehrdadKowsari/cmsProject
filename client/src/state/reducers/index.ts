import { combineReducers } from 'redux';
import confirmReducer from './confirmReducer';

const reducers = combineReducers({
    confirmReducer: confirmReducer
});

export default reducers;