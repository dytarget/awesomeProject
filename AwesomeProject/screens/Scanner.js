import * as React from 'react';
import { Text, View, StyleSheet, Button,AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

import { BarCodeScanner } from 'expo-barcode-scanner';

class BarcodeScannerExample extends React.Component {
  static navigationOptions={
    title:"Сканер"
  };
  state = {
    hasCameraPermission: null,
    scanned: false,
    showCamera:true,
    data:''
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Запрашиваем доступ к камере</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>Вы не дали доступ к камере</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop:20,
        }}>
             {this.state.showCamera ||
                <Text>{this.state.data}</Text>
            }
            {this.state.showCamera &&
            <>
              <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            </>
            }
           

        {scanned && (
          <Button title={'Нажмите чтобы еще раз сканировать'} onPress={() => this.setState({ scanned: false ,showCamera:true})} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const value = await AsyncStorage.getItem('token');
    this.setState({ scanned: true ,showCamera:false,data:data});
    const headersConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        Authorization: "Bearer " + value
      };
      const requestBody = {
       amount:10
      };
  
      axios({
        method: "post",
        url:"http://10.10.0.28:8890/cache_enrollment",
        data: requestBody,
        headers: headersConfig
      })
        .then(res => {
            console.log(res);
        })
        .catch(res => {
            console.log("error");
            console.log(res);
        });
        
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    width:'90%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 4,
  },
  getStartedText: {

    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    width:'100%',
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
    width:'100%',
    height:60
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default BarcodeScannerExample;