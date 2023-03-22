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
import {
  getActiveOrders,
  getCancelledOrders,
  getDrivers,
} from "../../Services/DeliveryApi";
import OrderDetailModal from "../../Components/OrderDetailModal";
import { getDeliveredOrders } from "../../Services/DeliveryApi";
import { exportToCsvOrder } from "../../Services/CommonFunctions";
import PinkButton from "../../Components/PinkButton";

export default function D_DeliveredOrderScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const CANCELLED_ORDERS = useSelector((e) => e.delivery.cancelledOrders);
  const PRELOADER = useSelector((e) => e.delivery.preLoader);
  const PAGINATIONDATA = useSelector((e) => e.delivery.orderPaging);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getCancelledOrders(1));
    });
  }, []);

  const fetchMoreData = () => {
    if (Number(PAGINATIONDATA.currentPage) + 1 <= PAGINATIONDATA.totalPages) {
      dispatch(getCancelledOrders(Number(PAGINATIONDATA.currentPage) + 1));
    }
  };
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      {!PRELOADER && (
        <FlatList
          ListHeaderComponent={
            <View style={{ marginBottom: hp(2), marginHorizontal: hp(2) }}>
              <PinkButton
                name={"Export to CSV"}
                onPress={() => {
                  exportToCsvOrder(
                    CANCELLED_ORDERS,
                    "active",
                    dispatch,
                    "cancelled_orders_"
                  );
                }}
                text={"small"}
              />
            </View>
          }
          data={CANCELLED_ORDERS}
          ListEmptyComponent={
            <Text style={ApplicationStyles.nodataStyle}>No Data Found</Text>
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
