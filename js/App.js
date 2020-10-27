import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, View, Root } from 'native-base';
import AppNavigator from './AppNavigator';

class App extends Component {
  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}

export default App;
