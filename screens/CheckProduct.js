import React, {Component} from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as actionTypes from '../src/redux/actions/types';
const localhost = actionTypes.LOCALHOST;
console.log(localhost);
//const localhost = '192.168.0.153';
class CheckProduct1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkInfor: '',
      showData: false,
      count: 1,
      resdata: 'not',
      nameOfCooperative: null,
      farmOwner: null,
      sold: false,
      detailView: false,
      isScan: false,
      arrayBusiness: null,
    };
  }

  componentDidMount = () => {
    this.setState({
      nameOfCooperative: null,
      farmOwner: null,
    });
    fetch(`http://${localhost}:3456/search`)
      .then((response) => response.json())
      .then((json) => {
        console.log('a b c :' + json);
        this.setState({resdata: 'ok'});
      })
      .catch((error) => console.error(error));
  };

  changeShowData = () => {
    this.setState({showData: true});
  };

  changeCountLink = (data) => {
    if (this.state.linkInfor === data) {
      return this.setState({count: this.state.count + 1});
    } else {
      return this.setState({count: 1});
    }
  };

  ifScaned = (e) => {
    this.changeShowData();
    this.changeCountLink(e.data);
    this.setState({linkInfor: e.data});
    fetch(`http://${localhost}:3456/search/${e.data}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].business);
        this.setState({
          nameOfCooperative: data[0].nameOfCooperative,
          addressOfCooperative: data[0].address,
          //  phoneOfCooperative: data[0].phoneOwner,
          farmOwner: data[1].farmOwner,
          farmOwnerAddress: data[1].address,
          typeOfFarm: data[1].typeOfTree,
          arrayBusiness: data[0].business,
          sold: data[2],
          isScan: true,
        });
      });
  };
  onPressLink = async (data) => {
    // console.log(data);
    // Linking.openURL(`http://${localhost}:4345/search/${data}`).catch((err) =>
    //   Alert.alert('QR convert', data),
    // );
    console.log(this.state.arrayBusiness);
    this.setState({
      // nameOfCooperative: null,
      // farmOwner: null,
      detailView: true,
    });
  };
  onPressGoBack = () => {
    this.setState({
      detailView: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.detailView === false ? (
          <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
              <QRCodeScanner
                containerStyle={{
                  backgroundColor: '#FFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onRead={this.ifScaned}
                reactivate={true} // first time true
                permissionDialogMessage="need premission to Access Camera"
                reactivateTimeout={2000}
                showMarker={true}
                markerStyle={{borderColor: '#FFF', borderRadius: 10}}
              />
            </View>
            <View style={styles.footer}>
              <View>
                {this.state.isScan ? (
                  <View>
                    <Text style={styles.title}>
                      Kết quả tìm được
                      <Text
                        style={{
                          fontSize: 15,
                          color: this.state.count === 1 ? '#05375a' : 'red',
                        }}>
                        ({this.state.count})
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      {'Hợp tác xã: ' + this.state.nameOfCooperative}
                    </Text>
                    <Text style={styles.text}>
                      {'Địa chỉ hợp tác xã: ' + this.state.addressOfCooperative}
                    </Text>
                    <Text style={styles.subtitle}>Thông tin nông dân</Text>
                    <Text style={styles.text}>
                      {'Nông dân: ' + this.state.farmOwner}
                    </Text>
                    <Text style={styles.text}>
                      {'Giống cây nông dân trồng: ' + this.state.typeOfFarm}
                    </Text>
                    <Text style={styles.subtitles}>
                      Trạng thái sản phẩm:
                      {this.state.sold ? ' Đã thanh toán' : ' Chưa thanh toán'}
                    </Text>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => {
                          this.onPressLink(this.state.linkInfor);
                        }}>
                        <LinearGradient
                          colors={['#08d4c4', '#01ab9d']}
                          style={styles.signIn}>
                          <Text style={styles.textSign}>Xem Thêm</Text>
                          <MaterialIcons
                            name="navigate-next"
                            color="#fff"
                            size={20}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.title}>
                    Kết nối internet...{this.state.resdata}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.container]}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <Animatable.View style={styles.footer} animation="fadeInLeft">
              {/* <Text style={styles.title}>
                Kết quả tìm được
                <Text
                  style={{
                    fontSize: 15,
                    color: this.state.count === 1 ? '#05375a' : 'red',
                  }}>
                  ({this.state.count})
                </Text>
              </Text> */}
              <Text style={styles.subtitle}>Thông tin hợp tác xã</Text>
              <Text style={styles.text}>
                {'Hợp tác xã: ' + this.state.nameOfCooperative}
              </Text>
              <Text style={styles.text}>
                {'Địa chỉ hợp tác xã: ' + this.state.addressOfCooperative}
              </Text>
              <Text style={styles.subtitle}>Thông tin nông dân</Text>
              <Text style={styles.text}>
                {'Nông dân: ' + this.state.farmOwner}
              </Text>
              <Text style={styles.text}>
                {'Địa chỉ nông dân: ' + this.state.farmOwnerAddress}
              </Text>
              <Text style={styles.text}>
                {'Giống cây nông dân trồng: ' + this.state.typeOfFarm}
              </Text>
              <Text style={styles.subtitle}>Thông tin nhà phân phối</Text>
              {this.state.arrayBusiness.map((e, index) => {
                console.log(e);
                return (
                  <View key={index}>
                    <Text style={styles.text}>
                      {'Tên Công ty: ' + e.nameCompany}
                    </Text>
                    <Text style={styles.text}>{'Địa chỉ: ' + e.address}</Text>
                  </View>
                );
              })}
              <Text style={styles.subtitles}>
                Trạng thái sản phẩm:
                {this.state.sold ? ' Đã thanh toán' : ' Chưa thanh toán'}
              </Text>

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressGoBack();
                  }}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Ok</Text>
                    {/* <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                    /> */}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        )}
      </View>
    );
  }
}

export default CheckProduct1;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  containers: {
    flex: 3,
    backgroundColor: '#009387',
  },
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitles: {
    color: '#05375a',
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 18,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
