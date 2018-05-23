/**
 * Example
 * Created by Leo on 23/05/2018.
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Autocomplete from 'react-native-autocomplete';

type Props = {};
export default class App extends Component<Props> {
  state = {
  }

  render() {
    return (
      <View style={styles.container}>
        <Autocomplete />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
