import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { Permissions } from "react-native-unimodules";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import SettingsForm from "./form";
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from "../../../actions/rider/settings";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const image = require("../../../../assets/images/taxi2.jpg");
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    fname: state.rider.user.fname,
    lname: state.rider.user.lname,
    email: state.rider.user.email,
    phoneNo: state.rider.user.phoneNo,
    profileUrl: state.rider.user.profileUrl,
    userDetails: state.rider.user,
    profileUpdating: state.rider.user.profileUpdating
  };
}
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null
    };
  }

  async componentWillMount() {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);
    const permissions1 = Permissions.CAMERA_ROLL;
    const { status1 } = await Permissions.askAsync(permissions1);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let userData = Object.assign(this.props.userDetails, {
        localUrl: result.uri
      });
      this.props.updateUserProfilePicAsync(userData, "profile");
    } else {
      this.setState({ image: this.props.profileUrl });
    }
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#fff" }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Settings
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card
            style={{
              marginTop: 0,
              marginRight: 0,
              paddingTop: 20,
              paddingBottom: 20,
              marginLeft: 0
            }}
          >
            <CardItem style={{ padding: 0 }}>
              <Left>
                <Item
                  style={{ paddingRight: 20, borderBottomWidth: 0 }}
                  onPress={this._pickImage}
                >
                  {this.props.profileUpdating ? (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white"
                      }}
                    >
                      <Spinner />
                    </View>
                  ) : (
                    <Thumbnail
                      source={{ uri: this.props.profileUrl }}
                      style={{ width: 70, height: 70, borderRadius: 35 }}
                    />
                  )}
                </Item>
                <Body>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "400",
                      color: "#0F517F"
                    }}
                  >
                    {this.props.fname} {this.props.lname}
                  </Text>
                  <Text note style={{ color: "#6895B0" }}>
                    {this.props.email}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <SettingsForm
            phoneNo={this.props.phoneNo.substr(3, 12)}
            code={this.props.phoneNo.substr(0, 3)}
          />
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails =>
      dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: (userData, type) =>
      dispatch(updateUserProfilePicAsync(userData, type))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Settings);
