// import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import Sentry from "sentry-expo";
import App from "./App";
import configureStore from "./configureStore";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/commonColor";

export const storeObj = {};

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
      isReady: false,
      notification: {}
    };
    storeObj.store = this.state.store;
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      // Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
    // Sentry.enableInExpoDevelopment = true;
    // Sentry.config(
    //   "https://9695d920274f4acb89004f502af305c9@sentry.io/221530"
    // ).install();
  }
  render() {
    if (!this.state.isReady || this.state.isLoading) {
      // return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
