/**
 * Example
 * Created by Leo on 23/05/2018.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Autocomplete from 'react-native-autocomplete';
import PositionData from './PositionData';

export default class App extends Component {
  state = {
    data: PositionData.list,
    searchInput: ''
  };
  Autocomplete = null;

  _renderItem(data) {
    console.log(data)
    const styles = {
      height: 40,
      justifyContent: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#F0F1F2',
    };
    // const textColor = this.state.tags.some(n => data.name == n.name) ? '#F9CB00' : '#333';
    const textColor = '#F9CB00';
    return (
      <TouchableOpacity
        style={styles}
        onPress={() => {
          this.Autocomplete.cancel();
        }}
      >
        <Text style={{ color: textColor, fontSize: 16, }}>{data.name}</Text>
      </TouchableOpacity>
    );
  }

  _renderEmptyResult() {
    return (
      <Text>no data</Text>
    );
  }

  render() {
    const { searchInput } = this.state
    let data = [];
    if (searchInput.trim() != '') {
      const regex = new RegExp(`^${searchInput.trim()}`, 'i');
      data = this.state.data.filter((n) => {
        if (n.name.search(regex) >= 0) {
          return true;
        } else if (n.PY.findIndex(n => n.search(regex) >= 0) >= 0) {
          return true;
        } else if (n.firstPY.findIndex(n => n.search(regex) >= 0) >= 0) {
          return true;
        }
        return false;
      });
    }
    return (
      <View style={styles.container}>
        <Autocomplete
          ref={ref => (this.Autocomplete = ref)}
          data={data}
          textInputProps={{
            maxLength: 100,
            placeholder: '输入中文/拼音/首字母',
            onChangeText: text => this.setState({ searchInput: text })
          }}
          resultListProps={{
            style: styles.list,
            renderItem: ({ item }) => this._renderItem(item),
            ListEmptyComponent: () => this._renderEmptyResult(),
          }}
          showCancelButton
          cancelText="取消"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  list: {
    padding: 10,
    height: Dimensions.get('window').height - 100,
  },
});
