import React from 'react'
import {AsyncStorage} from 'react-native'
import { Router, Scene, Tabs } from 'react-native-router-flux'

import { Creator } from './Creator'
import { Wallet } from './Wallet'
import { Settings } from './Settings'
import { Placeholder } from './Placeholder'
import Reactotron from 'reactotron-react-native'

console.tron = Reactotron

export class Navigator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tokens: [] 
    };
    this.addNewToken = this.addNewToken;
  }
  
  async componentDidMount() {
    const allKeys = await AsyncStorage.getAllKeys();
    const tokenKeys = allKeys.filter((key) => key.includes("@TokenCreator:token-"));
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    let uniq = a => [...new Set(a)];
    
    const tokenIdentifiers = uniq(tokenKeys.map((key) => key.substring(0,28)));
    const tokenKeyCodes = tokenKeys.map((key) => key.substring(29));
    var tokens = [];
    
    tokenIdentifiers.forEach( (tokenIdentifier) => {
      var token = {};
      tokenKeyCodes.forEach(async (key) => {
        const wholeKey = tokenIdentifier+":"+key;
        const value = await AsyncStorage.getItem(wholeKey);
        token[key] = value;
        });
      console.tron.display({
        name: 'token in Nav did mount',
        value: token,
        important: true,
      })
      tokens = [ ...tokens, token]  
    })
    console.tron.display({
      name: 'tokens in Navigator did mount',
      value: tokens,
      important: true,
    })

    this.setState({
      tokens: tokens
    })
  }
  
  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log("value is: " + value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log("NO SUCH TOKEN");
      console.error(error);
    }
  }


  addNewToken = (newToken) => {
    const {tokens} = this.state
    var randomString = require('random-string');
    var tokenIdentifier = "token-" + randomString();
    try {
      Object.entries(newToken).forEach( async token => {
          await AsyncStorage.setItem('@TokenCreator:'+tokenIdentifier + ":" + token[0], token[1]);
      });
    } catch (error) {
        Alert.alert("Error saving data");
    }
    this.setState({
      tokens: [ ...tokens, newToken]
    })

  }

  render(){
    return (
      <Router>
        <Tabs key="root">
          <Scene 
            key="Creator" 
            component={Creator} 
            title="Creator" 
            newToken={this.addNewToken}/>
          <Scene 
            key="Wallet" 
            component={Wallet} 
            title="Wallet"
            tokens={this.state.tokens}/>
          <Scene key="Obtainer" component={Placeholder} title="Obtainer"/>
          <Scene key="Market" component={Placeholder} title="Market"/>
          <Scene key="Settings" component={Settings} title="Settings" initial="true"/>

        </Tabs>
      </Router>
    )
  }
}
