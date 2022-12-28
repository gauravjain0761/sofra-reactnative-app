import React, { useEffect } from "react";
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Colors from "../Themes/Colors";
import M_DashboardScreen from "../Screens/Merchant/M_DashboardScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import M_OrderScreen from "../Screens/Merchant/M_OrderScreen";
import M_MenuScreen from "../Screens/Merchant/M_MenuScreen";
import M_NotificationScreen from "../Screens/Merchant/M_NotificationScreen";
import M_ProfileScreen from "../Screens/Merchant/M_ProfileScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import M_MenuItemScreen from "../Screens/Merchant/M_MenuItemScreen";
import { commonFontStyle } from "../Themes/Fonts";
import M_OfferScreen from "../Screens/Merchant/M_OfferScreen";
import M_DocumentScreen from "../Screens/Merchant/M_DocumentScreen";
import M_StatisticsScreen from "../Screens/Merchant/M_StatisticsScreen";
import M_PromocodeScreen from "../Screens/Merchant/M_PromocodeScreen";
import M_ReportScreen from "../Screens/Merchant/M_ReportScreen";
import M_UpdateAvailability from "../Screens/Merchant/M_UpdateAvailability";
import M_AppSetting from "../Screens/Merchant/M_AppSetting";
import M_SlotScreen from "../Screens/Merchant/M_SlotScreen";
import M_UpdatePassword from "../Screens/Merchant/M_UpdatePassword";
import M_EditCategoryScreen from "../Screens/Merchant/M_EditCategoryScreen";
import M_EditMenuItemScreen from "../Screens/Merchant/M_EditMenuItemScreen";
import { clearAsyncStorage } from "../Services/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../Services/AuthApi";
import M_CreateOfferScreen from "../Screens/Merchant/M_CreateOfferScreen";
import HeaderLeftIcon from "../Components/NavigationComponent";
import M_EditPromocodeScreen from "../Screens/Merchant/M_EditPromocodeScreen";
import { getRestaurnatDetails } from "../Services/MerchantApi";
import { media_url } from "../Config/AppConfig";
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
    screen: "M_DashboardScreen",
  },
  {
    label: "Menu Categories",
    image: require("../Images/Merchant/xxxhdpi/ic_side_menu.png"),
    screen: "M_MenuStack1",
  },
  {
    label: "Menu Items",
    image: require("../Images/Merchant/xxxhdpi/ic_menu_items.png"),
    screen: "M_MenuItemScreen",
  },
  {
    label: "Orders",
    image: require("../Images/Merchant/xxxhdpi/ic_orders.png"),
    screen: "M_OrderScreen",
  },
  {
    label: "Profile",
    image: require("../Images/Merchant/xxxhdpi/ic_profile.png"),
    screen: "M_ProfileScreen",
  },
  {
    label: "Promo Codes",
    image: require("../Images/Merchant/xxxhdpi/ic_promo.png"),
    screen: "M_PromocodeScreen",
  },
  {
    label: "Offers",
    image: require("../Images/Merchant/xxxhdpi/ic_offer.png"),
    screen: "M_OfferScreen",
  },

  {
    label: "Documents",
    image: require("../Images/Merchant/xxxhdpi/ic_document.png"),
    screen: "M_DocumentScreen",
  },
  {
    label: "Updated Availabilities",
    image: require("../Images/Merchant/xxxhdpi/ic_update.png"),
    screen: "M_UpdateAvailability",
  },
  {
    label: "Vendor Slot",
    image: require("../Images/Merchant/xxxhdpi/ic_slot.png"),
    screen: "M_SlotScreen",
  },
  {
    label: "App Settings",
    image: require("../Images/Merchant/xxxhdpi/ic_seting.png"),
    screen: "M_AppSetting",
  },
  {
    label: "Update Password",
    image: require("../Images/Merchant/xxxhdpi/ic_pass.png"),
    screen: "M_UpdatePassword",
  },
  {
    label: "Statistics",
    image: require("../Images/Merchant/xxxhdpi/ic_statistic.png"),
    screen: "M_StatisticsScreen",
  },
  {
    label: "Reports",
    image: require("../Images/Merchant/xxxhdpi/ic_reports.png"),
    screen: "M_ReportScreen",
  },
];

const Menu = createNativeStackNavigator();
function M_MenuStack() {
  return (
    <Menu.Navigator initialRouteName="M_MenuScreen">
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_MenuScreen}
        name={"M_MenuScreen"}
      />
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_EditCategoryScreen}
        name={"M_EditCategoryScreen"}
      />
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_MenuItemScreen}
        name={"M_MenuItemScreen"}
      />
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_EditMenuItemScreen}
        name={"M_EditMenuItemScreen"}
      />
    </Menu.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function M_MyBottomTabs() {
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
        name="M_DashboardScreen"
        component={M_DashboardScreen}
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
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../Images/Delivery/xxxhdpi/ic_menu.png")}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: "contain",
                  marginLeft: hp(2),
                  paddingVertical: hp(2),
                }}
              />
            </TouchableOpacity>
          ),
          // ...data,
        })}
        name="M_OrderScreen"
        component={M_OrderScreen}
      />
      <BottomTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require("../Images/Merchant/xxxhdpi/ic_menu_ft_selected.png")
                  : require("../Images/Merchant/xxxhdpi/ic_menu_ft.png")
              }
            />
          ),
          tabBarLabel: "Menu",
          ...transparentHeader,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
        })}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "M_MenuScreen" }],
              })
            );
          },
        })}
        name="M_MenuStack1"
        component={M_MenuStack}
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
        name="M_NotificationScreen"
        component={M_NotificationScreen}
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
          ...transparentHeader,
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
        })}
        name="M_ProfileScreen"
        component={M_ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

const ImageContainer = ({ image }) => {
  return <Image style={[styles.drawerItemIcon]} source={image} />;
};

function CustomDrawerContent(props) {
  const _TOAST = useSelector((e) => e.merchant.toast);
  const dispatch = useDispatch();
  const RESTAURANT = useSelector((e) => e.merchant.restaurant);

  useEffect(() => {
    if (_TOAST.message == "Auth Token is invalid") {
      onLogout();
    }
  }, [_TOAST]);
  const onLogout = async () => {
    dispatch(
      getLogout(() => {
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

  useEffect(() => {
    dispatch(getRestaurnatDetails());
  }, []);

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
            RESTAURANT?.image
              ? { uri: media_url + RESTAURANT.image }
              : require("../Images/Delivery/xxxhdpi/profile_placeholder.png")
          }
        />
        <Text style={styles.name}>{RESTAURANT.name}</Text>
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

export function MerchantDrawer({ navigation }) {
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
        name={"MDashboard"}
        component={M_MyBottomTabs}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name={"M_MenuStack"}
        component={M_MenuStack}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          headerTitle: () => (
            <Text style={styles.headerTitle}>Offers Listing</Text>
          ),
          ...transparentHeader,
        })}
        name="M_OfferScreen"
        component={M_OfferScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_MenuItemScreen"
        component={M_MenuItemScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_EditMenuItemScreen"
        component={M_EditMenuItemScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_CreateOfferScreen"
        component={M_CreateOfferScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_DocumentScreen"
        component={M_DocumentScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_StatisticsScreen"
        component={M_StatisticsScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_PromocodeScreen"
        component={M_PromocodeScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_EditPromocodeScreen"
        component={M_EditPromocodeScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_ReportScreen"
        component={M_ReportScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_UpdateAvailability"
        component={M_UpdateAvailability}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          headerTitle: () => (
            <Text style={styles.headerPinkTitle}>Update App Settings</Text>
          ),
          ...transparentHeader,
        })}
        name="M_AppSetting"
        component={M_AppSetting}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...data,
          ...transparentHeader,
        })}
        name="M_SlotScreen"
        component={M_SlotScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeftIcon navigation={navigation} />,
          ...transparentHeader,
          headerTitle: () => (
            <Text style={styles.headerTitle}>Update Password</Text>
          ),
        })}
        name="M_UpdatePassword"
        component={M_UpdatePassword}
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
    borderWidth: 1,
    borderRadius: hp(15) / 2,
    borderColor: Colors.placeholderColor,
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
  headerPinkTitle: {
    ...commonFontStyle("M_500", 18, Colors.pink),
  },
});
