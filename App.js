import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

import {connect} from 'react-redux';
import {checkLogin, logout} from './src/redux/actions/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackScreen from './screens/RootStackScreen';
class App extends Component {
  componentDidMount = async () => {
    console.log('isLoading' + this.props.loading);
    let data = await AsyncStorage.getItem('userToken');
    console.log('network ' + this.props.network);
    if (data !== null) {
      console.log('login did');
      this.props.checkLogin(data);
      // dispatch(checkLogin(data));
    } else {
      this.props.logout();
    }
  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  // storeData = async () => {
  //   await AsyncStorage.setItem('userToken', 'phat');
  // };

  getData = async () => {
    const data = await AsyncStorage.getItem('userToken');
    return data;
  };

  render() {
    // console.log('isLogin ' + this.props.loading);
    //console.log(' login adtion ' + JSON.stringify(this.props.authReducer));
    // console.log(' user name ' + this.props.loading);
    if (this.props.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <NavigationContainer>
          <RootStackScreen />
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({});

//export default App;
const mapStateToProps = (state) => {
  console.log('alo ' + state.network.isConnected);
  // console.log(AsyncStorage.getItem('userToken'));
  return {
    currentUser: state.authReducer.currentUser,
    isLogin: state.authReducer.isLogin,
    loading: state.authReducer.loading,
    authReducer: state.authReducer,
    network: state.network.isConnected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (data) => dispatch(checkLogin(data)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
