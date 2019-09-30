import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Platform, StatusBar,ScrollView, StyleSheet, View,AsyncStorage,RefreshControl  } from 'react-native';
import { Avatar,Title,Button,Text } from 'react-native-paper';
import { Divider } from 'react-native-elements';


import axios from 'axios';


export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  state={
    info:'',
    refreshing: false,

  }
  componentDidMount(){
    this.getData();
  }

  _onRefresh = () => {
    this.getData();
  }

  getData=async ()=>{
    this.setState({refreshing: true});
    const value = await AsyncStorage.getItem('token');
    const headersConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      Authorization: "Bearer " + value
    };
    axios({
      method: "get",
      url:"http://10.10.0.28:8890/customer",
      headers: headersConfig
    })
      .then(res => {
        console.log(res.data);
        
          this.setState({info:res.data[0],refreshing:false});
      })
      .catch(res => {
          console.log("error");
          console.log(res);
      });
  }
  render(){
    var {info}=this.state;
    return(
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
      <View style={{flex:1,height:'100%',backgroundColor:'#f7f7f7'}} >
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",padding:15,margin:15,borderRadius:5,backgroundColor:'#fff',
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 3.84,
         elevation: 5,
      }}>
          <Avatar.Text size={128} label={"XC"} />
          <View>
            <Title style={{padding:15}}>{info.name}</Title>
            <Button style={{width:185,padding:2,margin:5}} icon="build" mode="outlined" onPress={() => console.log('Pressed')}>Редактировать</Button>
          </View>
        </View>

        <View style={{padding:20,margin:15,
        borderRadius:5,backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,}}>
            <Text style={styles.text}>БИН: {info.bin}</Text>
            <Text style={styles.text}>Номер телефона: {info.con_phone}</Text>
        </View>

        <View style={{margin:15,padding:20,
        borderRadius:5,backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        }}>
              <Text style={{fontSize:30,textAlign:'center',fontWeight:'bold'}}>Ваш Баланс</Text>
              <Text style={styles.cash}>{info.cash+' ₸'}</Text>
            </View>
      </View>
      </ScrollView>
    )
  } 
}

SettingsScreen.navigationOptions = {
  title: 'Данные',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text:{
    fontSize:17,
    paddingLeft:15,
    fontWeight:'bold'
  },
  cash:{
    fontSize:60,
    textAlign:'center',
    fontWeight:'bold'
  }
});