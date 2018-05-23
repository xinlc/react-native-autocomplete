/**
 * Autocomplete
 * Created by Leo on 23/05/2018.
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

type Props = {
  containerStyle?: View.propTypes.style,
  onChangeText?: (text: string) => void,
};

type State = {
};

export default class Autocomplete extends PureComponent<Props, State> {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _onChangeText = (text) => {
    const { onChangeText, } = this.props;

    if (onChangeText) onChangeText(text);
  }

  render() {
    const { containerStyle, ...rest } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput {...rest} onChangeText={this._onChangeText} />
        <Text>123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc'
  }
});
