import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseLoginScreen from '../Screens/ChooseLoginScreen';
import MerchantLoginScreen from '../Screens/Merchant/MerchantLoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../Themes/Colors';
import MDashboardScreen from '../Screens/Merchant/MDashboardScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import M_OrderScreen from '../Screens/Merchant/M_OrderScreen';
import M_MenuScreen from '../Screens/Merchant/M_MenuScreen';
import M_NotificationScreen from '../Screens/Merchant/M_NotificationScreen';
import M_ProfileScreen from '../Screens/Merchant/M_ProfileScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import M_MenuItemScreen from '../Screens/Merchant/M_MenuItemScreen';
import {commonFontStyle} from '../Themes/Fonts';
import M_OfferScreen from '../Screens/Merchant/M_OfferScreen';
import M_DocumentScreen from '../Screens/Merchant/M_DocumentScreen';
import M_StatisticsScreen from '../Screens/Merchant/M_StatisticsScreen';
import M_PromocodeScreen from '../Screens/Merchant/M_PromocodeScreen';
import M_ReportScreen from '../Screens/Merchant/M_ReportScreen';
import M_UpdateAvailability from '../Screens/Merchant/M_UpdateAvailability';
import M_AppSetting from '../Screens/Merchant/M_AppSetting';
import M_SlotScreen from '../Screens/Merchant/M_SlotScreen';
import M_UpdatePassword from '../Screens/Merchant/M_UpdatePassword';
const data = {
  headerBackVisible: false,
  headerTitle: () => (
    <Image
      source={require('../Images/Delivery/xxxhdpi/top_logo.png')}
      style={styles.logo}
    />
  ),
};

let DrawerItemArray = [
  {
    label: 'Dashboard',
    image: require('../Images/Merchant/xxxhdpi/ic_home.png'),
    screen: 'MDashboardScreen',
  },
  {
    label: 'Menu Categories',
    image: require('../Images/Merchant/xxxhdpi/ic_side_menu.png'),
    screen: 'M_MenuStack1',
  },
  {
    label: 'Menu Items',
    image: require('../Images/Merchant/xxxhdpi/ic_menu_items.png'),
    screen: 'M_MenuItemScreen',
  },
  {
    label: 'Orders',
    image: require('../Images/Merchant/xxxhdpi/ic_orders.png'),
    screen: 'M_OrderScreen',
  },
  {
    label: 'Profile',
    image: require('../Images/Merchant/xxxhdpi/ic_profile.png'),
    screen: 'M_ProfileScreen',
  },
  {
    label: 'Promo Codes',
    image: require('../Images/Merchant/xxxhdpi/ic_promo.png'),
    screen: 'M_PromocodeScreen',
  },
  {
    label: 'Offers',
    image: require('../Images/Merchant/xxxhdpi/ic_offer.png'),
    screen: 'M_OfferScreen',
  },

  {
    label: 'Documents',
    image: require('../Images/Merchant/xxxhdpi/ic_document.png'),
    screen: 'M_DocumentScreen',
  },
  {
    label: 'Updated Availabilities',
    image: require('../Images/Merchant/xxxhdpi/ic_update.png'),
    screen: 'M_UpdateAvailability',
  },
  {
    label: 'Vendor Slot',
    image: require('../Images/Merchant/xxxhdpi/ic_slot.png'),
    screen: 'M_SlotScreen',
  },
  {
    label: 'App Settings',
    image: require('../Images/Merchant/xxxhdpi/ic_seting.png'),
    screen: 'M_AppSetting',
  },
  {
    label: 'Update Password',
    image: require('../Images/Merchant/xxxhdpi/ic_pass.png'),
    screen: 'M_UpdatePassword',
  },
  {
    label: 'Statistics',
    image: require('../Images/Merchant/xxxhdpi/ic_statistic.png'),
    screen: 'M_StatisticsScreen',
  },
  {
    label: 'Reports',
    image: require('../Images/Merchant/xxxhdpi/ic_reports.png'),
    screen: 'M_ReportScreen',
  },
];

const Menu = createNativeStackNavigator();
function M_MenuStack() {
  return (
    <Menu.Navigator>
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_MenuScreen}
        name={'M_MenuScreen'}
      />
      <Menu.Screen
        options={{
          headerShown: false,
        }}
        component={M_MenuItemScreen}
        name={'M_MenuItemScreen'}
      />
    </Menu.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function M_MyBottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarStyle: {
          borderTopWidth: 0,
          shadowRadius: 0,
          elevation: 0,
          paddingTop: 10,
          backgroundColor: Colors.backgroundScreen,
        },
        tabBarActiveTintColor: Colors.pink,
        tabBarInactiveTintColor: Colors.tabIconColor,
      }}>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require('../Images/Merchant/xxxhdpi/ic_hone_ft_slected.png')
                  : require('../Images/Merchant/xxxhdpi/ic_home_ft.png')
              }
            />
          ),
          tabBarLabel: 'Home',
          headerShown: false,
        }}
        name="MDashboardScreen"
        component={MDashboardScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require('../Images/Merchant/xxxhdpi/ic_orders_ft_selected.png')
                  : require('../Images/Merchant/xxxhdpi/ic_orders_ft.png')
              }
            />
          ),
          tabBarLabel: 'Orders',
          headerShown: false,
        }}
        name="M_OrderScreen"
        component={M_OrderScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require('../Images/Merchant/xxxhdpi/ic_menu_ft_selected.png')
                  : require('../Images/Merchant/xxxhdpi/ic_menu_ft.png')
              }
            />
          ),
          tabBarLabel: 'Menu',
          headerShown: false,
        }}
        name="M_MenuStack1"
        component={M_MenuStack}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require('../Images/Merchant/xxxhdpi/ic_noti_ft_selected.png')
                  : require('../Images/Merchant/xxxhdpi/ic_noti_ft.png')
              }
            />
          ),
          tabBarLabel: 'Notifications',
          headerShown: false,
        }}
        name="M_NotificationScreen"
        component={M_NotificationScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={styles.tabIcon}
              source={
                color == Colors.pink
                  ? require('../Images/Merchant/xxxhdpi/ic_profile_ft_selected.png')
                  : require('../Images/Merchant/xxxhdpi/ic_profile_ft.png')
              }
            />
          ),
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
        name="M_ProfileScreen"
        component={M_ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeStackNav({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        }}
        name="M_MyBottomTabs"
        component={M_MyBottomTabs}
      />
    </Stack.Navigator>
  );
}

const ImageContainer = ({image}) => {
  return <Image style={[styles.drawerItemIcon]} source={image} />;
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerMain}>
        <Image
          style={styles.drawerImage}
          source={require('../Images/Merchant/xxxhdpi/bg_profile.png')}
        />
        <Text style={styles.name}>Jasica Birnilvis</Text>
        {DrawerItemArray.map((item, index) => {
          return (
            <DrawerItem
              key={index}
              label={item.label}
              labelStyle={styles.labelStyle}
              icon={({focused, color, size}) => (
                <ImageContainer image={item.image} />
              )}
              onPress={() => {
                props.navigation.navigate(item.screen);
              }}
            />
          );
        })}
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export function MerchantDrawer({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        drawerItemStyle: {
          borderRadius: 0,
          width: '100%',
          marginLeft: 0,
        },
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name={'MDashboard'}
        component={HomeStackNav}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name={'M_MenuStack'}
        component={M_MenuStack}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_OfferScreen"
        component={M_OfferScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_DocumentScreen"
        component={M_DocumentScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_StatisticsScreen"
        component={M_StatisticsScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_PromocodeScreen"
        component={M_PromocodeScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_ReportScreen"
        component={M_ReportScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_UpdateAvailability"
        component={M_UpdateAvailability}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_AppSetting"
        component={M_AppSetting}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_SlotScreen"
        component={M_SlotScreen}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerRightView}>
              <Image
                source={require('../Images/Delivery/xxxhdpi/ic_menu.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          ...data,
          headerStyle: {
            backgroundColor: Colors.registrationBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          // headerShown: false,
        })}
        name="M_UpdatePassword"
        component={M_UpdatePassword}
      />
    </Drawer.Navigator>
  );
}
const Stack = createNativeStackNavigator();
export function MerchantNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
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
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: hp(4),
    width: 120,
  },
  headerRightView: {
    paddingLeft: hp(2),
  },
  tabIcon: {
    resizeMode: 'contain',
    height: hp(2.8),
    width: hp(2.8),
    marginBottom: 5,
  },
  drawerImage: {
    resizeMode: 'cover',
    height: hp(15),
    width: hp(15),
  },
  drawerMain: {
    paddingHorizontal: hp(2),
    width: '100%',
  },
  name: {
    ...commonFontStyle(600, 20, Colors.black),
    marginVertical: hp(2),
  },
  labelStyle: {...commonFontStyle(400, 16, Colors.black)},
  drawerItemIcon: {
    resizeMode: 'contain',
    height: hp(3),
    width: hp(3),
  },
  logoutButton: {
    backgroundColor: Colors.pink,
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
    ...commonFontStyle(600, 16, Colors.white),
    alignSelf: 'center',
    marginBottom: hp(3),
    borderRadius: 5,
  },
});
