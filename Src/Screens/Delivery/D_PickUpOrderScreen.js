import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
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
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import { orderStatusData } from "../../Constant/Constant";
import { useNavigation } from "@react-navigation/native";
import { getPickupOrders } from "../../Services/DeliveryApi";
import OrderDetailModal from "../../Components/OrderDetailModal";
import { exportToCsvOrder } from "../../Services/CommonFunctions";
import PinkButton from "../../Components/PinkButton";

export default function D_PickUpOrderScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const PICKUP_ORDERS = useSelector((e) => e.delivery.pickupOrders);
  const PRELOADER = useSelector((e) => e.delivery.preLoader);
  const PAGINATIONDATA = useSelector((e) => e.delivery.orderPaging);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getPickupOrders(1));
    });
  }, []);
  const fetchMoreData = () => {
    if (Number(PAGINATIONDATA.currentPage) + 1 <= PAGINATIONDATA.totalPages) {
      dispatch(getPickupOrders(Number(PAGINATIONDATA.currentPage) + 1));
    }
  };

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      {!PRELOADER && (
        <FlatList
          data={PICKUP_ORDERS}
          ListHeaderComponent={
            <View style={{ marginBottom: hp(2), marginHorizontal: hp(2) }}>
              <PinkButton
                name={"Export to CSV"}
                onPress={() => {
                  exportToCsvOrder(
                    PICKUP_ORDERS,
                    "pickup",
                    dispatch,
                    "orders_pickup_"
                  );
                }}
                text={"small"}
              />
            </View>
          }
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
    backgroundColor: Colors.purple,
  },
});
