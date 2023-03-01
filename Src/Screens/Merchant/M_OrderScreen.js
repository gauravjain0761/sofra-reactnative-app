import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import OrderItems from "../../Components/OrderItems";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Services/MerchantApi";
import { orderStatusData } from "../../Constant/Constant";
import moment from "moment";
import OrderDetailModal from "../../Components/OrderDetailModal";
import PinkButton from "../../Components/PinkButton";
import { exportToCsvOrder } from "../../Services/CommonFunctions";
import {strings} from '../../Config/I18n';

export default function M_OrderScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});
  const [selectedStatus, setselectedStatus] = useState("ALL");
  const dispatch = useDispatch();
  const ORDERS = useSelector((e) => e.merchant.filterOrders);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);
  const PAGINATIONDATA = useSelector((e) => e.merchant.orderPaging);
  const [filterOrders, setfilterOrders] = useState(ORDERS);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getOrders());
    });
  }, []);
  useEffect(() => {
    setfilterOrders(ORDERS);
  }, [ORDERS]);

  const onSearch = () => {
    if (search !== "") {
      setSearch("");
      setfilterOrders(ORDERS);
      onPressFilterStatus(selectedStatus);
    }
  };
  const onChangeSearch = (text) => {
    setSearch(text);
    dispatch(getOrders(1, selectedStatus, text));
  };

  navigation.setOptions({
    headerTitle: () => (
      <View style={{ flex: 1, width: "100%" }}>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => onSearch()}>
            <Image
              source={
                search == ""
                  ? require("../../Images/Merchant/xxxhdpi/ic_search.png")
                  : require("../../Images/Merchant/xxxhdpi/close.png")
              }
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder= {strings('dashboard.search_for_specific')}
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => onChangeSearch(text)}
            placeholderTextColor={Colors.placeholderColor}
          />
        </View>
      </View>
    ),
  });

  const onPressFilterStatus = (type) => {
    dispatch({
      type: "SUCCESS_MODAL",
      payload: { modal: false, message: "" },
    });

    setselectedStatus(type);
    setSearch("");
    dispatch(getOrders(1, type));
  };

  const fetchMoreData = () => {
    if (PAGINATIONDATA.currentPage + 1 <= PAGINATIONDATA.totalPages) {
      dispatch(getOrders(PAGINATIONDATA.currentPage + 1, selectedStatus));
    }
  };

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <View style={styles.tagView}>
        {orderStatusData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                borderRadius: 5,
                marginRight: hp(1),
                overflow: "hidden",
                marginBottom: hp(1.2),
                borderWidth: 2,
                borderColor:
                  selectedStatus == item.type
                    ? Colors.black
                    : Colors.registrationBackground,
              }}
              onPress={() => onPressFilterStatus(item.type)}
            >
              <Text style={[styles.tagText, { backgroundColor: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {!PRELOADER && (
        <FlatList
          // contentContainerStyle={{ flex: 1 }}
          ListHeaderComponent={
            <View style={{ marginBottom: hp(2), marginHorizontal: hp(2) }}>
              <PinkButton
                name={strings('orders.lateralEntry.no_data_found')}
                onPress={() => {
                  exportToCsvOrder(
                    filterOrders,
                    "merchant",
                    dispatch,
                    "orders_"
                  );
                }}
                text={"small"}
              />
            </View>
          }
          data={filterOrders}
          ListEmptyComponent={
            <Text style={ApplicationStyles.nodataStyle}>{strings('orders.lateralEntry.no_data_found')}</Text>
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
                <OrderItems
                  selectedStatus={selectedStatus}
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
        type="merchant"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: hp(5),
    ...commonFontStyle(400, 14, Colors.black),
    paddingLeft: hp(2),
    width: SCREEN_WIDTH - 18 - hp(10),
    paddingVertical: 0,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginBottom: hp(3),
    width: SCREEN_WIDTH - 18 - hp(6),
    marginTop: Platform.OS == "android" ? 10 : 0,
  },
  searchIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
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
  mainView: { flex: 1 },
  detailText: {
    ...commonFontStyle(500, 18, Colors.black),
    textAlign: "center",
  },
  titleView: {
    paddingVertical: hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.registrationBackground,
  },
  menuIconButton: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: hp(2.5),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1.5),
  },
  leftText: {
    ...commonFontStyle(500, 15, Colors.darkGrey),
  },
  rightText: {
    ...commonFontStyle(600, 15, Colors.black),
  },
});
