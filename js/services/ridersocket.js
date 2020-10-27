import { storeObj } from "../setup";
import config from "../../config.js";
import { logOutUser } from "../actions/common/signin";
import { setCurrentMap } from "../components/rider/rootView";
import {
  socketDisconnected,
  syncDataAsync,
  nearByDriversList
} from "../actions/rider/home";
import {
  tripRequestUpdated,
  tripUpdated,
  driverLocationUpdated
} from "../actions/rider/rideBooked";
import { changeRegion } from "../actions/rider/home";
import "../UserAgent";

const io = require("socket.io-client");

let socket = null;

export function socketRiderInit() {
  const { dispatch, getState } = storeObj.store;
  socket = io(`${config.serverSideUrl}:${config.port}`, {
    jsonp: false,
    transports: ["websocket"],
    query: `token=${getState().rider.appState.jwtAccessToken}`
  });
  socket.heartbeatTimeout = 10000; // reconnect if not received heartbeat for 17 seconds
  socket.on("connect", () => {
    if (getState().rider.appState.socketDisconnected) {
      dispatch(syncDataAsync(getState().rider.appState.jwtAccessToken));
    }
    dispatch(socketDisconnected(false));
  });
  socket.on("disconnect", () => {
    dispatch(socketDisconnected(true));
    socket.connect();
  });
  
  socket.on("unauthorizedToken", () => {
    dispatch(logOutUser());
  });
  socket.on("tripRequestUpdated", tripRequest => {
    dispatch(tripRequestUpdated(tripRequest));
  });
  socket.on("tripUpdated", trip => {
    dispatch(tripUpdated(trip));
  });
  socket.on("updateDriverLocation", gpsLoc => {
    dispatch(driverLocationUpdated(gpsLoc));
  });
  socket.on("socketError", e => {
    alert(e);
  });
  socket.on("nearByDriversList", driverArray => {
    dispatch(nearByDriversList(driverArray));
  });
  socket.on("updateAvailable", user => {
    if (getState().rider.appState.pageStatus === "home") {
      setCurrentMap();
      updateLocation(getState().rider.user);
      changeRegion({
        latitude:
          getState().rider.user.gpsLoc[0] +
          Math.round(Math.random() * 100000000) * 0.000000001,
        longitude:
          getState().rider.user.gpsLoc[1] +
          Math.round(Math.random() * 100000000) * 0.000000001
      });
    }
  });
}
export function requestTrip(payload) {
  socket.emit("requestTrip", payload);
}
export function cancelRideByRider(tripRequest) {
  socket.emit("tripRequestUpdate", tripRequest);
}
export function updateLocation(user) {
  socket.emit("updateLocation", user);
}
export function tripUpdate(trip) {
  socket.emit("tripUpdate", trip);
}
export function updatePickupRegion(user, region) {
  const userRegion = { user, region };
  socket.emit("updatePickupRegion", userRegion);
}
