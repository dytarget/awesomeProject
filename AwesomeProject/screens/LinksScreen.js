import React from 'react';
import { ScrollView, StyleSheet,AsyncStorage ,Text,View,FlatList,Image} from 'react-native';
import axios from 'axios';
import { List } from 'react-native-paper';
import { Icon } from 'react-native-elements';



export default class LinksScreen extends React.Component{
  state={
    list:[]
  }
  componentWillMount(){
    this.getData();
  }
  getData=async ()=>{
    const value = await AsyncStorage.getItem('token');
    axios
    .get("http://10.10.0.28:8890/customer_payment", {
      headers: {
        Authorization: "Bearer " + value
      }
    })
    .then(res => {
      this.setState({list:res.data});
      
    })
    .catch(res => {
      console.log(res);
    });
  }
  render(){
    
  return (
    
    <ScrollView style={styles2.container}>
      <View>
        <Text style={{paddingLeft:15,paddingTop:7,paddingBottom:7,fontSize:17,fontWeight:'bold'}}>Выписки:</Text>
        <FlatList
          data={this.state.list}
          renderItem={({item,index})=>{
              return(
                  <FlatListItem item={item} index={index}>

                  </FlatListItem>);
          }}
          >
          </FlatList>
      </View>

    </ScrollView>
  );
  }
}

LinksScreen.navigationOptions = {
  title: 'История',
};

const styles2 = StyleSheet.create({
    itemArtist:{
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 23,
        borderBottomWidth: 4,
        borderBottomColor: '#ccc',
        marginTop: 10,
        padding: 10,
        color: 'blue',
    },
    itemTitle:{
        fontSize: 23,
    },
    list:{
        flex:1,
    },
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#f7f7f7',
    } ,
    listelem:{
      margin:10,
      padding:10,
      borderRadius:5,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }
});


class FlatListItem extends React.Component {
  render() {
    return (
      <View key={this.props.index} style={styles2.list}>
        <View style={styles2.listelem}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{textAlign:'left'}}>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>Зачисление кэшбека</Text>
                  <Text style={{fontSize:14, fontWeight:'bold',color:'#5cb85c'}}>Выполнено</Text>
                  <View style={{display:'flex',flexDirection:'row',padding:3,alignItems:'center'}}>
                    <Icon style={{padding:1}} name="credit-card" type='evilicon' color="#078ee8"/>
                    <Text style={{fontSize:14, fontWeight:'bold',color:'#5cb85c'}}>  <Text style={{color:'black'}}>от суммы</Text> <Text style={{color:'black',fontSize:17,fontWeight:'bold'}}>{this.props.item.amount} ₸</Text></Text>
                  </View>
              </View>
              <View style={{textAlign:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>+ {this.props.item.cash}.00 ₸</Text>
              </View> 
            </View>
        </View>
      </View> 
    );
  }
}
