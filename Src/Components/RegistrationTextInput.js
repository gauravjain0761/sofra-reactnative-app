import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonFontStyle} from '../Themes/Fonts';
import Colors from '../Themes/Colors';

export default function RegistrationTextInput({
  name,
  placeholder,
  value,
  onChangeText,
  style,
}) {
  return (
    <View style={style}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        style={[styles.input]}
        placeholderTextColor={Colors.placeholderColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: '100%',
    height: hp(7),
    paddingHorizontal: hp(3),
    borderRadius: 5,
  },
});
