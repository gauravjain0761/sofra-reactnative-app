import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import MerchantLoginScreen from "../Screens/Merchant/MerchantLoginScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Colors from "../Themes/Colors";
import DeliveryLoginScreen from "../Screens/Delivery/DeliveryLoginScreen";
import { MerchantDrawer } from "./MerchantNavigation";
import { DeliveryDrawer } from "./DeliveryNavigation";
import M_RegistrationScreen from "../Screens/Merchant/M_RegistrationScreen";
import D_RegistrationScreen from "../Screens/Delivery/D_RegistrationScreen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import D_AddNewDriver from "../Screens/Delivery/D_AddNewDriver";
import D_DeliveredOrderScreen from "../Screens/Delivery/D_DeliveredOrderScreen";
import D_CancelledOrderScreen from "../Screens/Delivery/D_CancelledOrderScreen";
import D_PickUpOrderScreen from "../Screens/Delivery/D_PickUpOrderScreen";
const data = {
  headerBackVisible: false,
  headerTitle: () => (
    <Image
      source={require("../Images/Delivery/xxxhdpi/top_logo.png")}
      style={styles.logo}
    />
  ),
};
const transparentHeader = {
  headerStyle: {
    backgroundColor: Colors.registrationBackground,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleAlign: "center",
  headerShadowVisible: false,
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
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_menu.png")}
                  style={{ height: 18, width: 18, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="M_RegistrationScreen"
          component={M_RegistrationScreen}
        />
        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="MerchantDrawerHome"
          component={MerchantDrawer}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeliveryLoginScreen"
          component={DeliveryLoginScreen}
        />

        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_menu.png")}
                  style={{ height: 18, width: 18, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="D_RegistrationScreen"
          component={D_RegistrationScreen}
        />
        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="DeliveryDrawerHome"
          component={DeliveryDrawer}
        />

        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="D_AddNewDriver"
          component={D_AddNewDriver}
        />

        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="D_DeliveredOrderScreen"
          component={D_DeliveredOrderScreen}
        />

        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="D_CancelledOrderScreen"
          component={D_CancelledOrderScreen}
        />

        <Stack.Screen
          options={{
            ...transparentHeader,
            headerShown: false,
          }}
          name="D_PickUpOrderScreen"
          component={D_PickUpOrderScreen}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: heightPercentageToDP(4),
    width: 120,
  },
});
