import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import ApplicationStyles from '../Themes/ApplicationStyles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PinkButton from '../Components/PinkButton';
import Colors from '../Themes/Colors';

export default function ChooseLoginScreen({navigation}) {
  return (
    <View style={ApplicationStyles.applicationView}>
      <View style={styles.mainView}>
        <Image
          source={require('../Images/Delivery/xxxhdpi/top_logo.png')}
          style={styles.imageLogo}
        />
        <PinkButton
          onPress={() => navigation.navigate('MerchantNavigation')}
          style={styles.mbuttonStyle}
          name={'Merchant'}
        />
        <PinkButton
          onPress={() => navigation.navigate('DeliveryNavigation')}
          style={styles.dbuttonStyle}
          name={'Delivery'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: hp(5),
    backgroundColor: Colors.backgroundScreen,
  },
  imageLogo: {
    height: hp(8),
    resizeMode: 'contain',
  },
  mbuttonStyle: {
    marginTop: hp(10),
  },
  dbuttonStyle: {
    marginTop: hp(5),
  },
});
