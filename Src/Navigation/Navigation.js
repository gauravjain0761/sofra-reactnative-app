import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import MerchantLoginScreen from "../Screens/Merchant/MerchantLoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Colors from "../Themes/Colors";
import DeliveryLoginScreen from "../Screens/Delivery/DeliveryLoginScreen";
import { MerchantDrawer, MerchantNavigation } from "./MerchantNavigation";
import { DeliveryNavigation } from "./DeliveryNavigation";
const data = {
  headerBackVisible: false,

  headerLeft: () => (
    <TouchableOpacity style={styles.headerRightView}>
      <Image
        source={require("../Images/Delivery/xxxhdpi/ic_menu.png")}
        style={{ height: 18, width: 18, resizeMode: "contain" }}
      />
    </TouchableOpacity>
  ),
  headerTitle: () => (
    <Image
      source={require("../Images/Delivery/xxxhdpi/top_logo.png")}
      style={styles.logo}
    />
  ),
};
const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ChooseLoginScreen"
          component={ChooseLoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MerchantLoginScreen"
          component={MerchantLoginScreen}
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
            headerShown: false,
          }}
          name="MerchantDrawerHome"
          component={MerchantDrawer}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeliveryNavigation"
          component={DeliveryNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: heightPercentageToDP(4),
    // backgroundColor: 'red',
    width: 120,
  },
  headerRightView: {
    paddingRight: heightPercentageToDP(2),
  },
});
