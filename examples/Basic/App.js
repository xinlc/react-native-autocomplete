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
    const textColor = '#333';
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
    return (
      <View style={styles.container}>
        {/* <View style={{ marginTop: 50, backgroundColor: '#fff'}}>
          <Text>1233</Text>
          <Text>1233</Text>
          <Text>1233</Text>
          <Text>1233</Text>
          <Text>1233</Text>
        </View> */}
        <View style={styles.autocomplete}>
          <Autocomplete
            ref={ref => (this.Autocomplete = ref)}
            data={this.state.data}
            lookup={(data, keyword, response) => {
              let _data = [];
              if (keyword.trim() != '') {
                const regex = new RegExp(`^${keyword.trim()}`, 'i');
                _data = data.filter((n) => {
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
              response(_data);
            }}
            textInputProps={{
              maxLength: 100,
              placeholder: '输入中文/拼音/首字母',
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
  autocomplete: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: '#fff'
  }
});
