import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkCard,
} from 'react-native-ui-kitten';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reactotron from 'reactotron-react-native'
import styles from '../styles/Styles'


let Token = ({ onPress, item }) => {
    const { gradient, icon } = {
      gradient: ['#FC354C', '#0ABFEF'],
      icon: "ethereum"
    }
    return (
      <RkCard rkType='credit' style={styles.card} >
        <TouchableOpacity
          delayPressIn={70}
          activeOpacity={0.8}
          onPress={onPress}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0.0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.background}>
            <View rkCardHeader>
              <RkText rkType='header4 inverseColor'>NAME: {item.Name}</RkText>
              <MaterialCommunityIcons name={icon} size={40} color="white" />
            </View>
            <View rkCardContent>
              <View style={styles.cardNoContainer}>
                <RkText style={styles.cardNo} rkType='header2 inverseColor'>Description: {item.Description}</RkText>
              </View>
              <RkText style={styles.date} rkType='header6 inverseColor'>{item.date}</RkText>
            </View>
            <View rkCardFooter>
              <View>
                <RkText rkType='header4 inverseColor'>{item.Symbol.toUpperCase()}</RkText>
                <RkText rkType='header6 inverseColor'>local</RkText>
              </View>
              <RkText
                rkType='header2 inverseColor'>{item.Symbol.toUpperCase()} {item.balance} </RkText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </RkCard>
    );
  };

  
export default Token