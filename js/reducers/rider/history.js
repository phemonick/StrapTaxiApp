import {TRIP_HISTORY_FETCHED, SHOW_SPINNER} from '../../actions/rider/history';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  trips: [],
  loadSpinner: false,
};
const history = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return {...state, loadSpinner: true};
    case TRIP_HISTORY_FETCHED:
      return {...state, trips: action.payload, loadSpinner: false};
    case REHYDRATE:
    if(Object.keys(action.payload).length !== 0 ) {
      return action.payload.rider.history;
    } else {
      return state;
    }
    default:
      return state;
  }
};
export default history;
