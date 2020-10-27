import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, StatusBar, Dimensions } from "react-native";
import { Content, Text, Button, Icon, Spinner, Grid, Col } from "native-base";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";

import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  static propTypes = {
    setActiveLogin: PropTypes.func
  };
  state = {
    activeLogin: null
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeLogin !== null) {
      this.setState({
        activeLogin: nextProps.activeLogin
      });
    } else if (nextProps.activeLogin === null) {
      this.setState({
        activeLogin: null
      });
    }
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }
  render() {
    if (this.state.activeLogin === "signin") {
      return <SignIn />;
    }
    if (this.state.activeLogin === "register") {
      return <Register />;
    }

    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
        </View>
      );
    } else {
      if (Object.keys(this.props.appConfig).length === 0) {
        return (
          <ModalView>
            <Text>No App Configuration Data</Text>
          </ModalView>
        );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Content style={{ backgroundColor: commonColor.brandPrimary }}>
              <View
                style={
                  Platform.OS === "ios"
                    ? styles.iosLogoContainer
                    : styles.aLogoContainer
                }
              >
                <Icon name="ios-car" style={styles.logoIcon} />
                <Text style={styles.logoText}>OneWay</Text>
              </View>
              <View
                style={
                  Platform.OS === "ios"
                    ? { top: deviceHeight / 2, padding: 10 }
                    : { padding: 10 }
                }
              >
                <Button
                  rounded
                  onPress={() => Actions.signIn()}
                  transparent
                  block
                  style={styles.loginBtn}
                >
                  <Text style={{ fontWeight: "600", color: "#fff" }}>
                    Sign In
                  </Text>
                </Button>
                <Button
                  rounded
                  onPress={() => Actions.register()}
                  block
                  style={styles.registerBtn}
                >
                  <Text style={{ fontWeight: "600", color: "#fff" }}>
                    Register
                  </Text>
                </Button>
              </View>
            </Content>
          </View>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config
  };
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page))
  };
}

export default connect(mapStateToProps, bindActions)(Login);
