import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
} from 'react-native-ui-kitten';
import styles from '../styles/Styles'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/apiActions'


const mapDispatchToProps = dispatch => ({
  onLogoutButtonPressed: (isLoggedIn) => {
    dispatch(fetchLogout()).then( () => {
      if(isLoggedIn == false)
        this.props.navigation.navigate("Login")
    })
  }
 })

 const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    isLoggedIn: state.user.isLoggedIn
  }
}

class Profile extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>PROFILE</RkText>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <RkText rkType='header6'>Email</RkText>
              <RkText>{ this.props.profile.email }</RkText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <RkText rkType='header6'>name</RkText>
              <RkText>{ this.props.profile.name }</RkText>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <RkText rkType='header6'>Ethereum address</RkText>
              <RkText>{ this.props.profile.ethereumAddress }</RkText>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>OPTIONS</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton} onPress={ () => this.props.onLogoutButtonPressed(this.props.isLoggedIn)}>
              <RkText rkType='header6'>Logout</RkText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
