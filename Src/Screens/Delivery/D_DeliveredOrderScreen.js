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
import { useDispatch, useSelector } from "react-redux";
import { orderStatusData } from "../../Constant/Constant";
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import { useNavigation } from "@react-navigation/native";
import { getActiveOrders, getDrivers } from "../../Services/DeliveryApi";
import OrderDetailModal from "../../Components/OrderDetailModal";
import { getDeliveredOrders } from "../../Services/DeliveryApi";
import PinkButton from "../../Components/PinkButton";
import { exportToCsvOrder } from "../../Services/CommonFunctions";

export default function D_DeliveredOrderScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const DELIVERED_ORDERS = useSelector((e) => e.delivery.deliveredOrders);
  const PRELOADER = useSelector((e) => e.delivery.preLoader);
  const PAGINATIONDATA = useSelector((e) => e.delivery.orderPaging);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getDeliveredOrders(1));
    });
  }, []);

  const fetchMoreData = () => {
    if (Number(PAGINATIONDATA.currentPage) + 1 <= PAGINATIONDATA.totalPages) {
      dispatch(getDeliveredOrders(Number(PAGINATIONDATA.currentPage) + 1));
    }
  };
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      {!PRELOADER && (
        <FlatList
          data={DELIVERED_ORDERS}
          ListEmptyComponent={
            <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
          }
          ListHeaderComponent={
            <View style={{ marginBottom: hp(2), marginHorizontal: hp(2) }}>
              <PinkButton
                name={"Export to CSV"}
                onPress={() => {
                  exportToCsvOrder(
                    DELIVERED_ORDERS,
                    "active",
                    dispatch,
                    "delivered_orders_"
                  );
                }}
                text={"small"}
              />
            </View>
          }
          style={{ flex: 1 }}
          renderItem={({ item, index }) => {
            let status = orderStatusData.filter(
              (obj) => obj.type == item.status
            );

            return (
              <TouchableOpacity
                onPress={() => {
                  setcategoryDetail(true), setselectedOrder(item);
                }}
              >
                <D_OrderItems
                  item={item}
                  navigation={navigation}
                  status={status[0]}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      )}
      <OrderDetailModal
        visible={categoryDetail}
        onClose={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
        selectedOrder={selectedOrder}
        type={"delivery"}
      />
    </View>
  );
}
const styles = StyleSheet.create({});
