import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import {commonFontStyle} from '../Themes/Fonts';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function PinkButton({style, name, onPress, buttonTextStyle}) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[style, styles.buttonView]}>
      <Text style={[styles.text, buttonTextStyle]}>{name}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.pink,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: 5,
  },
  text: {
    ...commonFontStyle(400, 18, Colors.white),
  },
});
