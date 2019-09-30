import React, { Component } from 'react';
import {Alert,View,ScrollView,StyleSheet,TouchableOpacity,Text,AsyncStorage} from 'react-native';
import {TextInput,Button,HelperText} from 'react-native-paper';
import axios from 'axios';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      login:'',
      password:'',
      logerr:false,
      passerr:false
  }
  }
    
    onPress=()=>{
        if (!this.state.login || !this.state.password) {
          if (!this.state.login) {
            this.setState({logerr:true});
          }
          if (!this.state.password) {
            this.setState({passerr:true});
          }
        }
        else{
        try {
            const requestBody = {
              username: this.state.login,
              password: this.state.password
            };
  
            axios({
              method: "post",
              url: "http://10.10.0.28:8890/authorization",
              data: requestBody
            }).then(async res => {
              if (res.data.token && res.data.token.length) {
                  console.log(res.data);
                  await AsyncStorage.setItem('token', res.data.token);
                  this.props.isLoggedIn();
              }
              else{
                console.log("Неправильно");
                Alert.alert("Неправильный пароль или логин");
              }
            });
          } catch (err) {
          }
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <View>
                <Text style={styles.header}>Войдите</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                        outlined
                        style={styles.textInput}
                        value={this.state.login}
                        mode="outlined"
                        label="Логин"
                        placeholder="Логин"
                        maxLength={40}
                        onChangeText={(text)=>{this.setState({login:text,logerr:false})}}
                        />
                         <HelperText
                          type="error"
                          visible={this.state.logerr}
                        >
                          Введите Логин!!!
                        </HelperText>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                        mode="outlined"
                        label="Пароль"
                        secureTextEntry={true}  
                        password={true}
                        value={this.state.password}
                        style={styles.textInput}
                        onChangeText={(text)=>{this.setState({password:text,passerr:false})}}
                        placeholder="Пароль"
                        maxLength={40}
                        />
                           <HelperText
                          type="error"
                          visible={this.state.passerr}
                        >
                          Введите Пароль!!!
                        </HelperText>
                    </View>
                    <View style={styles.inputContainer}>
                    <Button
                        mode="outlined"
                        style={styles.saveButton}
                        onPress={this.onPress}
                    >
                      Войти
                    </Button>
                    </View>
                </ScrollView>
            </View>
        
        )
    }
}


const styles=StyleSheet.create({
    inputContainer: {
        paddingTop: 10,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'left'
      },
      textInput: {
        width:'80%',
        marginLeft:10,
        marginRight:10,
        paddingLeft: 10,
        paddingRight: 10
      }
      ,saveButton: {
        width:'80%',
        padding: 15,
        margin: 5
      },
      container: {
        flex: 1,
        justifyContent:'center',
        paddingTop:'30%',
        backgroundColor: '#F5FCFF',
      },
      header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
      }
})

export default Login
