import {CHANGE_PAGE_STATUS} from './home';
import {cancelRideByRider} from '../../services/ridersocket';

export const TRIP_REQUEST_UPDATED = 'TRIP_REQUEST_UPDATED';
export const DRIVER_LOCATION_UPDATED = 'DRIVER_LOCATION_UPDATED';
export const CANCEL_RIDE = 'CANCEL_RIDE';
export const TRIP_UPDATED = 'TRIP_UPDATED';
export const NO_NEARBY_DRIVER = 'NO_NEARBY_DRIVER';

export function tripRequestUpdated(tripRequest) {
  return dispatch => {
    switch (tripRequest.tripRequestStatus) {
      case 'noNearByDriver':
        alert('No Nearby Drivers available'); //modal or toast
        dispatch({type: NO_NEARBY_DRIVER});
        dispatch({type: CHANGE_PAGE_STATUS, payload: 'home'});
        break;
      case 'enRoute':
        dispatch({type: TRIP_REQUEST_UPDATED, payload: tripRequest});
        dispatch({type: CHANGE_PAGE_STATUS, payload: 'rideBooked'});
        break;
      default:
        dispatch({type: TRIP_REQUEST_UPDATED, payload: tripRequest});
    }
  };
}
export function driverLocationUpdated(gpsLoc) {
  return {
    type: DRIVER_LOCATION_UPDATED,
    payload: gpsLoc,
  };
}
export function cancelRide() {
  return (dispatch, getState) => {
    dispatch({type: CANCEL_RIDE});
    cancelRideByRider(getState().rider.tripRequest); // socket call
  };
}
export function tripUpdated(trip) {
  return dispatch => {
    switch (trip.tripStatus) {
      case 'endTrip':
        dispatch({type: TRIP_UPDATED, payload: trip});
        dispatch({type: CHANGE_PAGE_STATUS, payload: 'receipt'});
        break;
      default:
        dispatch({type: TRIP_UPDATED, payload: trip});
    }
  };
}
