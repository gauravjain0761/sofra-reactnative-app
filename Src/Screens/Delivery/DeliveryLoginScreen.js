import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Colors from '../../Themes/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonFontStyle} from '../../Themes/Fonts';
import LoginTextInput from '../../Components/LoginTextInput';
import PinkButton from '../../Components/PinkButton';

export default function DeliveryLoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={ApplicationStyles.applicationView}>
      <View style={styles.mainView}>
        <Image
          source={require('../../Images/Delivery/xxxhdpi/top_logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.welcomeText}>Welcome Delivery</Text>
        <View>
          <LoginTextInput
            name={'Email'}
            placeholder={'Enter your email address'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <LoginTextInput
            name={'Password'}
            placeholder={'Enter your password'}
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textinputStyle}
          />
          <PinkButton style={styles.dbuttonStyle} name={'Login'} />
          <Text style={styles.forgot}>Forgot password?</Text>
          <Text style={styles.forgot2}>
            Don't have an accout?{' '}
            <Text
              style={{color: Colors.pink}}
              onPress={() => navigation.navigate('RegistrationScreen')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hp(5),
  },
  imageLogo: {
    height: hp(6),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  welcomeText: {
    ...commonFontStyle(400, 20, Colors.pink),
    marginTop: 15,
    marginBottom: hp(5),
    textAlign: 'center',
  },
  textinputStyle: {
    marginTop: hp(4),
  },
  dbuttonStyle: {
    marginTop: hp(10),
  },
  forgot: {
    marginTop: hp(2),
    ...commonFontStyle(500, 14, Colors.black),
    textAlign: 'center',
  },
  forgot2: {
    marginTop: hp(6),
    ...commonFontStyle(400, 14, Colors.darkGrey),
    textAlign: 'center',
  },
});
