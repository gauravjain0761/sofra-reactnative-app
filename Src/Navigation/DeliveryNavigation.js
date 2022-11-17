import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseLoginScreen from '../Screens/ChooseLoginScreen';
import MerchantLoginScreen from '../Screens/Merchant/MerchantLoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Colors from '../Themes/Colors';
import DeliveryLoginScreen from '../Screens/Delivery/DeliveryLoginScreen';
const data = {
  headerBackVisible: false,

  headerLeft: () => (
    <TouchableOpacity style={styles.headerRightView}>
      <Image
        source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
        style={{height: 18, width: 18, resizeMode: 'contain'}}
      />
    </TouchableOpacity>
  ),
  headerTitle: () => (
    <Image
      source={require('../Images/Delivery/xxxhdpi/top_logo.png')}
      style={styles.logo}
    />
  ),
};
const Stack = createNativeStackNavigator();
export function DeliveryNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeliveryLoginScreen"
          component={DeliveryLoginScreen}
        />
        <Stack.Screen
          options={{
            ...data,
            headerStyle: {
              backgroundColor: Colors.registrationBackground,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
          }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: heightPercentageToDP(4),
    // backgroundColor: 'red',
    width: 120,
  },
  headerRightView: {
    paddingRight: heightPercentageToDP(2),
  },
});
