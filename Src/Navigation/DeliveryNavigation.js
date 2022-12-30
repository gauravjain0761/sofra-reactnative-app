import React, { useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import D_DriversScreen from "../Screens/Delivery/D_DriversScreen";
import D_OrderPickupScreen from "../Screens/Delivery/D_OrderPickupScreen";
import D_ActiveOrderScreen from "../Screens/Delivery/D_ActiveOrderScreen";
import D_CancelledOrderScreen from "../Screens/Delivery/D_CancelledOrderScreen";
import D_DeliveredOrderScreen from "../Screens/Delivery/D_DeliveredOrderScreen";
import D_ReportScreen from "../Screens/Delivery/D_ReportScreen";
import D_ProfileScreen from "../Screens/Delivery/D_ProfileScreen";
import D_UpdatePassword from "../Screens/Delivery/D_UpdatePassword";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import Colors from "../Themes/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { commonFontStyle } from "../Themes/Fonts";
import { clearAsyncStorage } from "../Services/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryLogout } from "../Services/AuthApi";
import D_DashboardScreen from "../Screens/Delivery/D_DashboardScreen";
import D_NotificationScreen from "../Screens/Delivery/D_NotificationScreen";
import HeaderLeftIcon from "../Components/NavigationComponent";
import D_PickUpOrderScreen from "../Screens/Delivery/D_PickUpOrderScreen";
import { getCompanyProfile } from "../Services/DeliveryApi";
import { media_url } from "../Config/AppConfig";
import D_EditDriverScreen from "../Screens/Delivery/D_EditDriverScreen";

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

let DrawerItemArray = [
  {
    label: "Dashboard",
    image: require("../Images/Merchant/xxxhdpi/ic_home.png"),
    screen: "D_DashboardScreen",
  },
  {
    label: "Drivers",
    image: require("../Images/Delivery/xxxhdpi/ic_drivers.png"),
    screen: "D_DriversScreen",
  },
  {
    label: "Orders For Pickup",
    image: require("../Images/Delivery/xxxhdpi/ic_pickup.png"),
    screen: "D_PickUpOrderScreen",
  },
  {
    label: "My Active Orders",
    image: require("../Images/Delivery/xxxhdpi/ic_orders.png"),
    screen: "D_ActiveOrderScreen",
  },
  {
    label: "My Cancelled Orders",
    image: require("../Images/Delivery/xxxhdpi/ic_cancelled.png"),
    screen: "D_CancelledOrderScreen",
  },
  {
    label: "My Delivered Orders",
    image: require("../Images/Delivery/xxxhdpi/ic_delivered.png"),
    screen: "D_DeliveredOrderScreen",
  },
  {
    label: "Reports",
    image: require("../Images/Delivery/xxxhdpi/ic_reports.png"),
    screen: "D_ReportScreen",
  },
  {
    label: "Profile",
    image: require("../Images/Delivery/xxxhdpi/ic_profile.png"),
    screen: "D_ProfileScreen",
  },
  {
    label: "Update Password",
    image: require("../Images/Delivery/xxxhdpi/ic_pass.png"),
    screen: "D_UpdatePassword",
  },
];

const DriverStack = createNativeStackNavigator();
function D_DriverStack() {
  return (
    <DriverStack.Navigator initialRouteName="D_DriversScreen">
      <DriverStack.Screen
        options={{
          headerShown: false,
        }}
        component={D_DriversScreen}
        name={"D_DriversScreen"}
      />
      <DriverStack.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          // headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        component={D_EditDriverScreen}
        name={"D_EditDriverScreen"}
      />
    </DriverStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function D_MyBottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          borderTopWidth: 0,
          shadowRadius: 0,
          elevation: 0,
          paddingTop: 10,
          backgroundColor: Colors.registrationBackground,
        },
        tabBarActiveTintColor: Colors.pink,
        tabBarInactiveTintColor: Colors.tabIconColor,
      }}
    >
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Merchant/xxxhdpi/ic_hone_ft_slected.png")
                  : require("../Images/Merchant/xxxhdpi/ic_home_ft.png")
              }
            />
          ),
          tabBarLabel: "Home",
          ...transparentHeader,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
        })}
        name="D_DashboardScreen"
        component={D_DashboardScreen}
      />
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Merchant/xxxhdpi/ic_orders_ft_selected.png")
                  : require("../Images/Merchant/xxxhdpi/ic_orders_ft.png")
              }
            />
          ),
          tabBarLabel: "Orders",
          ...transparentHeader,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          headerTitle: () => (
            <Text style={styles.headerTitle}>My Active Orders</Text>
          ),
        })}
        name="D_ActiveOrderScreen"
        component={D_ActiveOrderScreen}
      />
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Delivery/xxxhdpi/ic_driver_selectedTab.png")
                  : require("../Images/Delivery/xxxhdpi/ic_driver.png")
              }
            />
          ),
          tabBarLabel: "Drivers",
          ...transparentHeader,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          headerTitle: "",
          headerTransparent: true,
        })}
        name="D_DriverStack1"
        component={D_DriverStack}
      />
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Merchant/xxxhdpi/ic_noti_ft_selected.png")
                  : require("../Images/Merchant/xxxhdpi/ic_noti_ft.png")
              }
            />
          ),
          tabBarLabel: "Notifications",
          ...transparentHeader,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
        })}
        name="D_NotificationScreen"
        component={D_NotificationScreen}
      />
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Merchant/xxxhdpi/ic_profile_ft_selected.png")
                  : require("../Images/Merchant/xxxhdpi/ic_profile_ft.png")
              }
            />
          ),
          tabBarLabel: "Profile",
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
        })}
        name="D_ProfileScreen"
        component={D_ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}
const ImageContainer = ({ image }) => {
  return <Image style={[styles.drawerItemIcon]} source={image} />;
};
function CustomDrawerContent(props) {
  const _TOAST = useSelector((e) => e.merchant.toast);
  const companyProfile = useSelector((e) => e.delivery.companyProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyProfile());
  }, []);
  useEffect(() => {
    if (_TOAST.message == "Auth Token is invalid") {
      onLogout();
    }
  }, [_TOAST]);

  const onLogout = async () => {
    dispatch(
      getDeliveryLogout(() => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "ChooseLoginScreen" }],
          })
        );
      })
    );
    await clearAsyncStorage();
  };
  return (
    <DrawerContentScrollView
      style={{
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
      }}
      {...props}
    >
      <View style={styles.drawerMain}>
        <Image
          style={styles.drawerImage}
          source={
            companyProfile?.image
              ? { uri: media_url + companyProfile?.image }
              : require("../Images/Merchant/xxxhdpi/profile_placeholder.png")
          }
        />
        <Text style={styles.name}>{companyProfile?.name}</Text>
        {DrawerItemArray.map((item, index) => {
          return (
            <DrawerItem
              key={index}
              label={({ focused, color, size }) => (
                <Text
                  style={[
                    styles.labelStyle,

                    { width: widthPercentageToDP(50) },
                  ]}
                >
                  {item.label}
                </Text>
              )}
              icon={({ focused, color, size }) => (
                <ImageContainer image={item.image} />
              )}
              onPress={() => {
                props.navigation.navigate(item.screen);
              }}
              style={{
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginTop: 0,
                marginBottom: 0,
              }}
            />
          );
        })}
        <View>
          <TouchableOpacity
            onPress={() => {
              onLogout();
            }}
          >
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
export function DeliveryDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerItemStyle: {
          borderRadius: 0,
          marginLeft: 0,
        },
        drawerStyle: { width: widthPercentageToDP(75) },
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name={"D_Dashboard"}
        component={D_MyBottomTabs}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="D_OrderPickupScreen"
        component={D_OrderPickupScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
          headerTitle: () => (
            <Text style={styles.headerTitle}>My Cancelled Orders</Text>
          ),
        })}
        name="D_CancelledOrderScreen"
        component={D_CancelledOrderScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
          headerTitle: () => (
            <Text style={styles.headerTitle}>My Delivered Orders</Text>
          ),
        })}
        name="D_DeliveredOrderScreen"
        component={D_DeliveredOrderScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
          headerTitle: () => (
            <Text style={styles.headerTitle}>Orders For Pickup</Text>
          ),
        })}
        name="D_PickUpOrderScreen"
        component={D_PickUpOrderScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="D_ReportScreen"
        component={D_ReportScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="D_EditDriverScreen"
        component={D_EditDriverScreen}
      />

      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="D_UpdatePassword"
        component={D_UpdatePassword}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: hp(4),
    width: 120,
  },
  headerRightView: {
    paddingLeft: hp(2),
  },
  tabIcon: {
    resizeMode: "contain",
    height: hp(2.8),
    width: hp(2.8),
    marginBottom: 5,
  },
  drawerImage: {
    resizeMode: "cover",
    height: hp(15),
    width: hp(15),
  },
  drawerMain: {
    paddingHorizontal: hp(2),
    width: "100%",
  },
  name: {
    ...commonFontStyle(600, hp(2.5), Colors.black),
    marginVertical: hp(2),
  },
  labelStyle: {
    ...commonFontStyle(400, widthPercentageToDP(4), Colors.black),
  },
  drawerItemIcon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: hp(2.5),
  },
  logoutButton: {
    backgroundColor: Colors.pink,
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
    ...commonFontStyle(600, 16, Colors.white),
    alignSelf: "center",
    marginBottom: hp(3),
    borderRadius: 5,
  },
  headerTitle: {
    ...commonFontStyle("M_700", 16, Colors.black),
  },
});
