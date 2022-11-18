import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ApplicationStyles from '../Themes/ApplicationStyles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonFontStyle} from '../Themes/Fonts';
import Colors from '../Themes/Colors';
import RegistrationTextInput from '../Components/RegistrationTextInput';
import PinkButton from '../Components/PinkButton';

export default function MenuScreenItems({activeVisible}) {
  return (
    <View style={styles.cardView}>
      <Image
        style={styles.menuImage}
        source={require('../Images/Merchant/xxxhdpi/foodDish.jpeg')}
      />
      <Text style={styles.addText}>New Royal Place Restaurant</Text>
      <View style={styles.cardBotomBtn}>
        <TouchableOpacity style={styles.addMenuButton}>
          <Image
            style={styles.menuIconButton}
            source={require('../Images/Merchant/xxxhdpi/ic_check.png')}
          />
          <Text style={styles.addButton}>Edit</Text>
        </TouchableOpacity>
        {activeVisible == true && (
          <TouchableOpacity
            style={[
              styles.addMenuButton,
              {
                marginLeft: hp(2),
                backgroundColor: Colors.green,
                // opacity: 0,
              },
            ]}>
            <Image
              style={styles.menuIconButton}
              source={require('../Images/Merchant/xxxhdpi/ic_check.png')}
            />
            <Text style={styles.addButton}>Active</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.addMenuButton,
            {
              marginLeft: hp(2),
              backgroundColor: Colors.grayButtonBackground,
            },
          ]}>
          <Image
            style={styles.menuIconButton}
            source={require('../Images/Merchant/xxxhdpi/ic_check.png')}
          />
          <Text style={styles.addButton}>Delete</Text>
        </TouchableOpacity>
        {!activeVisible && (
          <View style={{opacity: 0}}>
            <TouchableOpacity
              style={[
                styles.addMenuButton,
                {
                  marginLeft: hp(2),
                  backgroundColor: Colors.green,
                },
              ]}>
              <Image
                style={styles.menuIconButton}
                source={require('../Images/Merchant/xxxhdpi/ic_check.png')}
              />
              <Text style={styles.addButton}>Active</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    marginRight: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6.27,

    elevation: 5,
    marginBottom: hp(3),
  },

  addText: {
    ...commonFontStyle(500, 14, Colors.black),
    marginHorizontal: hp(2),
  },
  addButton: {
    ...commonFontStyle(500, 13, Colors.white),
  },
  addMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.pink,
    marginTop: hp(2),
    borderRadius: 5,
  },
  menuImage: {
    marginBottom: hp(1.5),
    height: hp(22),
    width: '100%',
    resizeMode: 'cover',
  },
  cardBotomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp(2),
    marginBottom: hp(2.5),
  },
  menuIconButton: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
    tintColor: Colors.white,
    marginRight: 5,
  },
});
