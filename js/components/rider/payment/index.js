import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, View, TouchableOpacity, Platform} from 'react-native';
import {
  Container,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Body,
} from 'native-base';
import {Actions, ActionConst} from 'react-native-router-flux';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const paytmLogo = require('../../../../assets/images/paytm2.png');

class Payment extends Component {
  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{fontSize: 28, color: commonColor.brandPrimary}}
              />
            </Button>
          </Left><Body>
            <Title
              style={
                Platform.OS === 'ios'
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Payment
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => Actions.cardPayment({type: ActionConst.REPLACE})}
            >
              <Icon name="ios-card" style={{color: commonColor.brandPrimary}} />
            </Button>
          </Right>
        </Header>
        <View>
          <View style={styles.payModeType}>
            <Text style={styles.payModeText}>YOUR PAYMENT METHOD</Text>
          </View>
          <TouchableOpacity style={styles.payMethod1}>
            <Icon name="ios-cash" style={{fontSize: 20}} />
            <Text style={{ marginLeft: 20 }}>CASH</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.payMethod2}>
            <View
              style={{borderWidth: 1, borderColor: commonColor.lightThemeColor}}
            >
              <Image source={paytmLogo} style={styles.paytmIcon} />
            </View>
            <Text style={{marginLeft: 20}}>
              PAYTM WALLET
              <Text style={{fontSize: 12, color: 'green', textAlign: 'center'}}>
                {' '}$0
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default connect()(Payment);
