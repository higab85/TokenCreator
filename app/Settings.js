import React from 'react'
import { View, ScrollView, Button } from 'react-native'
import styles from './styles/Styles'
import Reactotron from 'reactotron-react-native'
import {Input} from './components/Input'
import { connect } from 'react-redux'
import { updateSettings } from './actions/settingsActions'


const mapDispatchToProps = dispatch => ({
  onSaveSettingsButtonPressed: (values) => {
    Reactotron.log("nav values", values)
    dispatch(updateSettings(values))
  }
 })

const mapStateToProps = state => {
  return {
    settings: state.settings,
    state: state
  }
}

class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.settings
  }
  
  render() {
    Reactotron.log("state", this.props.state)
    return (
      <View style={styles.root}>
        <ScrollView >
          <Input
            label="Host"
            autoCapitalize="none"
            value={this.state.host}
            onChange={(field, text) => this.setState({...this.state, host: text})}
            name="host"
          />
          <Button
            backgroundColor="Blue"
            style={styles.button}
            onPress={ () => this.props.onSaveSettingsButtonPressed(this.state) }
            title="Save changes"
            />
        </ScrollView>
      </View> 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);