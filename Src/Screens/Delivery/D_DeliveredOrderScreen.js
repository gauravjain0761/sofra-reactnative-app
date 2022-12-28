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
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import { orderStatusData } from "../../Constant/Constant";
import { useNavigation } from "@react-navigation/native";
import { getDeliveredOrders } from "../../Services/DeliveryApi";

export default function D_DeliveredOrderScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getDeliveredOrders(1));
    });
  }, []);

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView>
        {/* {ORDERS.map((item, index) => {
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
        })} */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
