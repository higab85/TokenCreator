// import { Actions } from 'react-native-router-flux';
import React from 'react';
import {
  View,
  Image,
  Keyboard,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
} from 'react-native-ui-kitten';
import styles from '../styles/Styles'
import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux'
import { fetchAuth } from '../actions/apiActions'

const mapDispatchToProps = dispatch => ({
  onLoginButtonPressed: (values, isLoggedIn) => {
    dispatch(fetchAuth(values)).then( () => {
      if(isLoggedIn)
        this.props.navigation.navigate("App")
    })
  }
 })

 const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    state: state
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          <Image style={styles.image} source={ require('../../assets/images/logo.png') } />  
          <RkText rkType='light h1'>Fin4</RkText>
          <RkText rkType='logo h0'>FuturICT2</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput 
              onChangeText={(text) => this.setState({email: text})}
              rkType='rounded' 
              placeholder='Email' />
            <RkTextInput
              onChangeText={(text) => this.setState({password: text})}
              rkType='rounded' 
              placeholder='Password' 
              secureTextEntry />
          </View>
          <View style={styles.textRow}>
            <RkButton
              style={styles.save}
              rkType='large'
              onPress={  () => this.props.onLoginButtonPressed(this.state, this.props.isLoggedIn)}
            >Login</RkButton>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear' onPress={ () => this.props.navigation.navigate('Signup')}>
                <RkText rkType='header6'>Sign up now</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
