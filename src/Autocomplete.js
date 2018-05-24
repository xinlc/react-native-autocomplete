
/**
 * Autocomplete
 * Created by Leo on 23/05/2018.
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Autocomplete extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    containerStyle: View.propTypes.style,
    inputContainerStyle: View.propTypes.style,
    onShowResults: PropTypes.func,
    renderItem: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderTextInput: PropTypes.func,
    textInputProps: PropTypes.shape({
      ...TextInput.propTypes,
    }),
    listStyle: View.propTypes.style,
  }; 

  static defaultProps = {
    data: [],
    renderItem: item => (<Text>{item}</Text>),
    renderTextInput: props => (<TextInput {...props} />),
    renderSeparator: null,
    textInputProps: {},
  };

  constructor(props) {
    super(props);
    this.textInput = null;
    this.state = {
      showResults: false,
    };
  }

  blur = () => {
    const { textInput } = this;
    textInput && textInput.blur();
  };

  focus = () => {
    const { textInput } = this;
    textInput && textInput.focus();
  };

  cancel = () => {
    this._hideResults();
  };

  _keyExtractor = (item, index) => index.toString();

  _onChangeText = (e, onChangeText) => {
    if (!this.state.showResults) {
      this.setState({
        showResults: true
      });
    }
    onChangeText && onChangeText(e);
  };

  _hideResults = () => {
    this.setState({
      showResults: false
    });
    this.textInput && this.textInput.clear();
    this.blur();
  };

  renderTextInput() {
    const { textInputProps, renderTextInput, } = this.props;
    const { onChangeText, style, ...rest } = textInputProps;
    const props = {
      ref: ref => (this.textInput = ref),
      style: [styles.inputStyle, style],
      onChangeText: e => this._onChangeText(e, onChangeText),
      placeholderTextColor: '#B7B8C0',
      clearButtonMode: 'while-editing',
      underlineColorAndroid: 'transparent',
      ...rest
    };

    return renderTextInput(props);
  }

  renderResultList() {
    const { data, listStyle, renderItem, renderSeparator, renderEmptyResult } = this.props;
    return (
      <FlatList
        style={[styles.list, listStyle]}
        data={data}
        initialNumToRender={10}
        keyExtractor={this._keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyResult}
      />
    );
  }

  render() {
    const { showResults } = this.state;
    const { containerStyle, inputContainerStyle, onShowResults } = this.props;

    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
          {
            showResults ? (
              <TouchableOpacity onPress={this._hideResults}>
                <Text style={styles.cancel}>取消</Text>
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View>
          {showResults && this.renderResultList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  inputStyle: {
    flex: 1,
    height: 35,
    padding: 0,
    paddingLeft: 10,
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#EBECEE',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b9b9b9',
    backgroundColor: '#fff',
  },
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 0,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e2e2',
    backgroundColor: '#fff'
  },
  cancel: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 14,
    color: '#333',
  }
});
