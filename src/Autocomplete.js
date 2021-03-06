
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
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

//Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes;

export default class Autocomplete extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    containerStyle: viewPropTypes.style,
    inputContainerStyle: viewPropTypes.style,
    onShowResults: PropTypes.func,
    renderTextInput: PropTypes.func,
    renderResultList: PropTypes.func,
    renderCancelButton: PropTypes.func,
    textInputProps: PropTypes.shape({
      ...TextInput.propTypes,
    }),
    resultListProps: PropTypes.shape({
      ...FlatList.propTypes,
    }),
    showCancelButton: PropTypes.bool,
    cancelText: PropTypes.string,
    lookup: PropTypes.func,
  }; 

  static defaultProps = {
    data: [],
    renderTextInput: props => (<TextInput {...props} />),
    renderResultList: props => (<FlatList {...props} />),
    lookup: (data, keyword, response) => { response(data.filter((n) => n == keyword))},
    textInputProps: {},
    resultListProps: {},
    showCancelButton: false,
    cancelText: 'cancel'
  };

  constructor(props) {
    super(props);
    this.textInput = null;
    this.resultList = null;
    this.state = {
      data: props.data.slice(),
      showResults: false,
    };
  }

  getTextInput = () => {
    return this.textInput;
  };

  getResultList = () => {
    return this.resultList;
  };

  blur = () => {
    const { textInput } = this;
    textInput && textInput.blur();
  };

  focus = () => {
    const { textInput } = this;
    textInput && textInput.focus();
  };

  cancel = () => {
    this.setState({
      showResults: false
    });
    this.textInput && this.textInput.clear();
    this.blur();
  };

  _keyExtractor = (item, index) => index.toString();

  _setData = (data = []) => {
    this.setState({ data });
  };

  _onChangeText = (e, onChangeText) => {
    const { data, lookup } = this.props;
    onChangeText && onChangeText(e);

    if (!this.state.showResults) {
      this.setState({ showResults: true });
    }
    lookup(data, e, this._setData);
  };

  renderTextInput = () => {
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
  };

  renderItem = ({ item }) => (<Text>{item}</Text>);

  renderResultList = () => {
    const { data } = this.state;
    const { resultListProps, renderResultList, } = this.props;
    const { style, ...rest } = resultListProps;
    const props = {
      ref: ref => (this.resultList = ref),
      data,
      style: [styles.list, style],
      initialNumToRender: 10,
      keyExtractor: this._keyExtractor,
      renderItem: this.renderItem,
      ...rest
    };

    return renderResultList(props);
  };

  renderCancelButton = (showResults) => {
    const { showCancelButton, cancelText, renderCancelButton, } = this.props;

    if (showCancelButton && showResults) {
      return renderCancelButton ? renderCancelButton() : (
        <TouchableOpacity onPress={this.cancel}>
          <Text style={styles.cancel}>{cancelText}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { showResults } = this.state;
    const { containerStyle, inputContainerStyle, onShowResults } = this.props;

    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
          {this.renderCancelButton(showResults)}
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
