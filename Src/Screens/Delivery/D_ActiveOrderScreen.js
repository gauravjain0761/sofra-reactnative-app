import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch } from "react-redux";
import { orderStatusData } from "../../Constant/Constant";
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import { useNavigation } from "@react-navigation/native";
import { getActiveOrders } from "../../Services/DeliveryApi";

const tagArray = [
  { title: "Delivered", color: Colors.pink, type: "ACCEPTED" },
  { title: "Cancelled", color: Colors.purple },
  { title: "Active", color: Colors.green },
  { title: "Ready for pick up", color: Colors.yellow },
];

let ORDERS = [
  {
    restaurant: {
      name: "Taj Hotel",
    },
    totalPrice: 30,
    status: "PENDING",
  },
  {
    restaurant: {
      name: "Taj Hotel",
    },
    totalPrice: 30,
    status: "PENDING",
  },
  {
    restaurant: {
      name: "Taj Hotel",
    },
    totalPrice: 30,
    status: "PENDING",
  },
  {
    restaurant: {
      name: "Taj Hotel",
    },
    totalPrice: 30,
    status: "PENDING",
  },
];

export default function D_ActiveOrderScreen({}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
    navigation.addListener("focus", () => {
      dispatch(getActiveOrders(1));
    });
  }, []);

  const renderActiveOrders = ({ item, index }) => {
    return (
      <View style={styles.mainListView}>
        <View style={styles.secondView}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: "https://c4.wallpaperflare.com/wallpaper/367/822/458/chicken-wings-fried-food-food-cuisine-wallpaper-preview.jpg",
            }}
          />
        </View>
        <View style={styles.desStyle}>
          <View>
            <Text style={styles.titleStyle}>Indian Thali</Text>
            <Text style={styles.cousineStyle}>Breakfast, Lunch, Dinner</Text>
            <Text style={styles.priceStyle}>AED 75.00</Text>
            <Image
              style={styles.truckLogo}
              source={require("../../Images/Merchant/xxxhdpi/ic_car.png")}
            />
          </View>
          <Text style={styles.statusTextStyle}>Cancel</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <View style={styles.tagView}>
        {orderStatusData.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                borderRadius: 3,
                marginRight: hp(1),
                overflow: "hidden",
                marginBottom: hp(1.5),
              }}
            >
              <Text style={[styles.tagText, { backgroundColor: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView>
        {ORDERS.map((item, index) => {
          let status = orderStatusData.filter((obj) => obj.type == item.status);
          return (
            <TouchableOpacity
              onPress={() => {
                // setcategoryDetail(true), setselectedOrder(item);
              }}
            >
              <D_OrderItems
                item={item}
                navigation={navigation}
                status={status[0]}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainListView: {
    flexDirection: "row",
    padding: 5,
    marginVertical: 4,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: "#dddddd",
  },
  secondView: { flex: 1 },
  imageStyle: { height: hp(17), borderRadius: 8 },
  desStyle: { flex: 1, justifyContent: "space-between", paddingHorizontal: 7 },
  titleStyle: { fontWeight: "bold", color: "black" },
  cousineStyle: { fontSize: 12, color: "gray" },
  priceStyle: { fontSize: 12, color: "black", fontWeight: "bold" },
  statusTextStyle: {
    width: wp(25),
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: "flex-end",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.white,
    backgroundColor: "red",
  },

  tagView: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: hp(1.5),
    paddingHorizontal: hp(2),
  },
  tagText: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    ...commonFontStyle("M_600", 12, Colors.white),
  },
  truckLogo: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
    marginVertical: 5,
  },
});
