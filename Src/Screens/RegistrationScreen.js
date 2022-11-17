import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Themes/Colors';
import {commonFontStyle, SCREEN_WIDTH} from '../Themes/Fonts';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ApplicationStyles from '../Themes/ApplicationStyles';
import RegistrationTextInput from '../Components/RegistrationTextInput';
import RegistrationDropdown from '../Components/RegistrationDropdown';
import PinkButton from '../Components/PinkButton';
const citydata = [
  {
    id: 1,
    strategicName: 'SUPERTREND',
  },
  {id: 2, strategicName: 'VWAP'},
  {id: 3, strategicName: 'RSIMA'},
  {id: 6, strategicName: 'TESTING'},
  {id: 10, strategicName: 'DEMATADE'},
];
export default function RegistrationScreen() {
  const [BName, setBName] = useState('');
  const [BAddress, setBAddress] = useState('');
  const [city, setCity] = useState('');
  const [licenceNumber, setLicenceNUmber] = useState('');
  const [currentlyDeliver, setCurrentlyDeliver] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [category, setCategory] = useState('');
  const [Cuisine, setCuisine] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Become a Sofra partner</Text>
        <RegistrationTextInput
          placeholder={'Business Name*'}
          value={BName}
          onChangeText={text => setBName(text)}
        />
        <RegistrationTextInput
          placeholder={'Business Address*'}
          value={BAddress}
          onChangeText={text => setBAddress(text)}
        />
        <RegistrationDropdown
          data={citydata}
          value={city}
          setData={text => {
            setCity(text);
          }}
          placeholder={'City or Town*'}
          valueField={'strategicName'}
        />
        <RegistrationTextInput
          placeholder={'Trade Licence number'}
          value={licenceNumber}
          onChangeText={text => setLicenceNUmber(text)}
        />
        <RegistrationDropdown
          data={citydata}
          value={currentlyDeliver}
          setData={text => {
            setCurrentlyDeliver(text);
          }}
          placeholder={'Do you currently deliver?*'}
          valueField={'strategicName'}
        />
        <RegistrationTextInput
          placeholder={'Website, Instagram, Facebook account'}
          value={socialLink}
          onChangeText={text => setSocialLink(text)}
        />
        <View style={styles.row}>
          <View style={{width: (SCREEN_WIDTH - hp(6)) / 2}}>
            <RegistrationDropdown
              data={citydata}
              value={restaurant}
              setData={text => {
                setRestaurant(text);
              }}
              placeholder={'Restaurant'}
              valueField={'strategicName'}
              style={styles.dropdownRow}
            />
          </View>
          <View style={{width: (SCREEN_WIDTH - hp(6)) / 2}}>
            <RegistrationDropdown
              data={citydata}
              value={category}
              setData={text => {
                setCategory(text);
              }}
              placeholder={'Category'}
              valueField={'strategicName'}
              style={styles.dropdownRow}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: (SCREEN_WIDTH - hp(6)) / 2}}>
            <RegistrationTextInput
              placeholder={'First name*'}
              value={Firstname}
              onChangeText={text => setFirstname(text)}
            />
          </View>
          <View style={{width: (SCREEN_WIDTH - hp(6)) / 2}}>
            <RegistrationTextInput
              placeholder={'Last name*'}
              value={Lastname}
              onChangeText={text => setLastname(text)}
            />
          </View>
        </View>
        <RegistrationTextInput
          placeholder={'Email'}
          value={Email}
          onChangeText={text => setEmail(text)}
        />
        <RegistrationTextInput
          placeholder={'Mobile number (+971...)*'}
          value={MobileNo}
          onChangeText={text => setMobileNo(text)}
        />

        <PinkButton style={styles.dbuttonStyle} name={'Submit'} />

        <Text style={styles.forgot2}>
          By clicking 'Submit', I hereby acknowledge & agree that I have readt &
          understood Sofra{' '}
          <Text
            style={{...commonFontStyle(700, 14, Colors.pink)}}
            onPress={() => navigation.navigate('RegistrationScreen')}>
            Terms and Conditions
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(700, 16, Colors.black),
    marginVertical: hp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },

  dbuttonStyle: {
    marginTop: hp(5),
  },
  forgot2: {
    ...commonFontStyle(400, 14, Colors.black),
    marginVertical: hp(3),
    lineHeight: 20,
  },
});
