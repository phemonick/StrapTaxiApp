// import * as Expo from "expo";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions, Alert, Platform } from "react-native";
import PropTypes from "prop-types";

import Spinner from "../../loaders/Spinner";
import {
  fetchUserCurrentLocationAsync,
  mapDeviceIdToUser
} from "../../../actions/rider/home";
import { socketRiderInit, updateLocation } from "../../../services/ridersocket";
import RootView from "../rootView";
import * as appStateSelector from "../../../reducers/rider/appState";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    user: state.rider.user,
    isInitialLocationFetched: appStateSelector.isInitialLocationFetched(state),
    jwtAccessToken: state.rider.appState.jwtAccessToken
  };
}

class RiderStartupServices extends Component {
  static propTypes = {
    fetchUserCurrentLocationAsync: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isInitialLocationFetched: PropTypes.bool,
    region: PropTypes.object
  };
  state = {
    notification: {}
  };

  componentDidMount() {
    socketRiderInit();
    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
    // this.getGpsStatus();
  }

  async componentWillMount() {
    // const { mapDeviceIdToUser, jwtAccessToken } = this.props;
    // const { existingStatus } = await Expo.Permissions.getAsync(
    //   Expo.Permissions.NOTIFICATIONS
    // );
    // let finalStatus = existingStatus;
    // if (existingStatus !== "granted") {
    //   const { status } = await Expo.Permissions.askAsync(
    //     Expo.Permissions.NOTIFICATIONS
    //   );
    //   finalStatus = status;
    // }
    // if (finalStatus !== "granted") {
    //   return;
    // }
    // let token = await Expo.Notifications.getExpoPushTokenAsync();
    // const deviceId = await Expo.Constants.deviceId;
    // mapDeviceIdToUser(jwtAccessToken, deviceId, token);
    // this._notificationSubscription = Expo.Notifications.addListener(
    //   this._handleNotification
    // );

    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
    this.getGpsStatus();
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  async getGpsStatus() {
    let gpsStatus = await Expo.Location.getProviderStatusAsync();
    if (Platform.OS === "android") {
      if (!gpsStatus.gpsAvailable) {
        Alert.alert(
          "GPS Settings",
          "Turn On your GPS & Wifi",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () =>
                Expo.IntentLauncherAndroid.startActivityAsync(
                  Expo.IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                )
            }
          ],
          { cancelable: false }
        );
      }
      if (!gpsStatus.networkAvailable) {
        Alert.alert(
          "Network Settings",
          "Turn On your Network Connection",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () =>
                Expo.IntentLauncherAndroid.startActivityAsync(
                  Expo.IntentLauncherAndroid.ACTION_NETWORK_OPERATOR_SETTINGS
                )
            }
          ],
          { cancelable: false }
        );
      }
      if (!gpsStatus.locationServicesEnabled) {
        Alert.alert(
          "GPS Settings",
          "Turn On your GPS & Wifi",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () =>
                Expo.IntentLauncherAndroid.startActivityAsync(
                  Expo.IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                )
            }
          ],
          { cancelable: false }
        );
      }
    }
  }

  render() {
    // eslint-disable-line class-methods-use-this
    if (this.props.isInitialLocationFetched && this.props.region.latitude) {
      return <RootView initialRegion={this.props.region} />;
    }
    return <Spinner />;
  }
}

function bindActions(dispatch) {
  return {
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) =>
      dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken))
  };
}
export default connect(mapStateToProps, bindActions)(RiderStartupServices);
