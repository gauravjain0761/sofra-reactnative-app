import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import MerchantLoginScreen from "../Screens/Merchant/MerchantLoginScreen";
import { I18nManager, Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Colors from "../Themes/Colors";
import DeliveryLoginScreen from "../Screens/Delivery/DeliveryLoginScreen";
import { MerchantDrawer } from "./MerchantNavigation";
import { DeliveryDrawer } from "./DeliveryNavigation";
import M_RegistrationScreen from "../Screens/Merchant/M_RegistrationScreen";
import D_RegistrationScreen from "../Screens/Delivery/D_RegistrationScreen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import ChoosePackageScreen from "../Screens/ChoosePackageScreen";
import D_ChoosePackageScreen from "../Screens/D_ChoosePackageScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import TermsScreen from "../Screens/TermsScreen";

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
  const setNotification = async () => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          registerAppWithFCM();
        } else {
          requestPermission();
        }
      })
      .catch((error) => {
        requestPermission();
        let err = `check permission error${error}`;
        console.log(err);
      });
  };

  const registerAppWithFCM = () => {
    if (Platform.OS === "ios") {
      messaging()
        .registerDeviceForRemoteMessages()
        .then((register) => {
          getToken();
        });
    } else {
      getToken();
    }
  };
  const requestPermission = () => {
    messaging()
      .requestPermission()
      .then(() => {
        registerAppWithFCM();
      })
      .catch((error) => { });
  };

  const getToken = async () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log("fcm--", fcmToken);
        } else {
          console.log("[FCMService] User does not have a device token");
          // console.log("[FCMService] User does not have a device token")
        }
      })
      .catch((error) => {
        let err = `FCm token get error${error}`;
        console.log(err);
      });
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    setNotification();
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  async function onDisplayNotification(message) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        // largeIcon:
        //   message.data.icon == ""
        //     ? require("../Images/logo.png")
        //     : message.data.icon,
        channelId,
        // smallIcon: "ic_launcher_notification",
      },
    });
  }

  const onChangeLanguage = async () => {
    await AsyncStorage.setItem("Language", I18nManager.isRTL ? 'en' : 'ar');
    AsyncStorage.getItem("Language").then((res) => {
      if (res === "ar") {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      RNRestart.Restart();
    });
  }

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
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => onChangeLanguage()}>
                <Image source={I18nManager.isRTL ? require("../Images/Merchant/xxxhdpi/ic_en.png") : require("../Images/Merchant/xxxhdpi/ic_ar.png")} style={{
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                }} />
              </TouchableOpacity>
            ),
            // ...data,
            headerTitle: "",
            ...transparentHeader,
          })}
          name="MerchantLoginScreen"
          component={MerchantLoginScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
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
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            // ...data,
            headerTitle: "",
            ...transparentHeader,
          })}
          name="DeliveryLoginScreen"
          component={DeliveryLoginScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
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
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="ChoosePackageScreen"
          component={ChoosePackageScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="D_ChoosePackageScreen"
          component={D_ChoosePackageScreen}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerRightView1}
              >
                <Image
                  source={require("../Images/Delivery/xxxhdpi/ic_drop_down.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            ...data,
            ...transparentHeader,
          })}
          name="TermsScreen"
          component={TermsScreen}
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
