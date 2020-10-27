import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Dimensions } from "react-native";
import PropTypes from "prop-types";
import {
  Content,
  View,
  Text,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Item,
  List,
  ListItem,
  Left
} from "native-base";
import _ from "lodash";
import { Actions, ActionConst } from "react-native-router-flux";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { closeDrawer } from "../../../actions/drawer";
import { logOutUser } from "../../../actions/common/signin";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const deviceHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return {
    fname: state.rider.user.fname,
    lname: state.rider.user.lname,
    email: state.rider.user.email,
    profileUrl: state.rider.user.profileUrl
  };
}
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  static propTypes = {
    fname: PropTypes.string,
    closeDrawer: PropTypes.func,
    logOutUser: PropTypes.func
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.fname === undefined) {
      Actions.login({ type: ActionConst.RESET });
    }
  }

  handleLogOut() {
    this.props.logOutUser();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: commonColor.brandPrimary }}>
        <Content
          bounces={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={
            Platform.OS === "android"
              ? styles.adrawerContent
              : styles.drawerContent
          }
        >
          <Card
            style={{
              borderColor: "#0A3A55",
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              flexWrap: "nowrap",
              backgroundColor: "#0A3A55",
              flex: 1
            }}
          >
            <CardItem
              style={{
                borderColor: "transparent",
                flexDirection: "column",
                backgroundColor: "#0A3A55",
                alignItems: "center",
                justifyContent: "center",
                height: deviceHeight / 3 - 26
              }}
            >
              <Item
                style={{
                  borderBottomWidth: 0,
                  borderBottomColor: "transparent"
                }}
              >
                <Thumbnail
                  source={{ uri: this.props.profileUrl }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    borderWidth: 0,
                    borderColor: "transparent"
                  }}
                />
              </Item>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingVertical: 5
                }}
              >
                {_.get(this.props, "fname", "")}{" "}
                {_.get(this.props, "lname", "")}
              </Text>
              <Text
                note
                style={{ color: "#ddd", paddingVertical: 5, fontWeight: "400" }}
              >
                {_.get(this.props, "email", "")}
              </Text>
            </CardItem>
          </Card>
          <List foregroundColor={"white"} style={styles.Bg}>
            <ListItem
              button
              onPress={() => {
                Actions.cardPayment();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Icon
                  name="ios-card"
                  style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIcons
                      : styles.aSidebarIcons
                  }
                />
                <Text style={styles.linkText}>Payment</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                Actions.history();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Icon
                  name="ios-keypad-outline"
                  style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIcons
                      : styles.aSidebarIcons
                  }
                />
                <Text style={styles.linkText}>History</Text>
              </Left>
            </ListItem>
            {/*
            <ListItem
              button
              onPress={() => {
                Actions.notifications();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === 'android' ? styles.alinks : styles.links}
            >
              <Left>
                <Icon
                  name="ios-notifications"
                  style={
                    Platform.OS === 'ios'
                      ? styles.iosSidebarIcons
                      : styles.aSidebarIcons
                  }
                />
                <Text style={styles.linkText}>Notifications</Text>
              </Left>
            </ListItem>
          */}
            <ListItem
              button
              onPress={() => {
                Actions.settings();
                this.props.closeDrawer();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Icon
                  name="ios-settings"
                  style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIcons
                      : styles.aSidebarIcons
                  }
                />
                <Text style={styles.linkText}>Settings</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                Actions.login({ type: ActionConst.RESET });
                this.props.closeDrawer();
                this.handleLogOut();
              }}
              iconLeft
              style={Platform.OS === "android" ? styles.alinks : styles.links}
            >
              <Left>
                <Icon
                  name="ios-power"
                  style={
                    Platform.OS === "ios"
                      ? styles.iosSidebarIcons
                      : styles.aSidebarIcons
                  }
                />
                <Text style={{ ...styles.linkText, fontWeight: "700" }}>
                  Sign Out
                </Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    logOutUser: () => dispatch(logOutUser())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SideBar);
