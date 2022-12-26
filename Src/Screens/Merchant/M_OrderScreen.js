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
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      setPage(1);
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
    }
  };

  const onChangeSearch = (text) => {
    setSearch(text);
    const filtered = filterOrders.filter(
      (val) =>
        val.bookingCode.toLowerCase().includes(text.toLowerCase()) ||
        val.user.name.toLowerCase().includes(text.toLowerCase())
    );
    setfilterOrders(filtered);
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
            placeholder="Search for specific"
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
    if (selectedStatus !== type) {
      setPage(1);
    }
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
      {/* <ScrollView> */}
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
          data={filterOrders}
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
      {/* </ScrollView> */}
      <Modal
        isVisible={categoryDetail}
        // deviceWidth={SCREEN_WIDTH}
        style={ApplicationStyles.modalStyle}
        onBackButtonPress={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
        onBackdropPress={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
      >
        <View style={ApplicationStyles.modalViewStyle}>
          <View style={styles.titleView}>
            <Text style={styles.detailText}>Order Details</Text>
            <TouchableOpacity
              onPress={() => {
                setcategoryDetail(!categoryDetail), setselectedOrder({});
              }}
              style={styles.closeButton}
            >
              <Image
                style={styles.menuIconButton}
                source={require("../../Images/Merchant/xxxhdpi/close.png")}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.row}>
              <Text style={styles.leftText}>Order Id:</Text>
              <Text style={styles.rightText}>{selectedOrder.bookingCode}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Total Amount:</Text>
              <Text style={styles.rightText}>
                AED {selectedOrder.totalPrice}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Items Amount:</Text>
              <Text style={styles.rightText}>
                AED {selectedOrder.itemsPrice}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>VAT (TAX):</Text>
              <Text style={styles.rightText}>AED {selectedOrder.vat}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Promo Code:</Text>
              <Text style={styles.rightText}>
                {selectedOrder.promoCode == ""
                  ? "N/A"
                  : selectedOrder.promoCode}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Discount Amount:</Text>
              <Text style={styles.rightText}>
                AED{" "}
                {selectedOrder.discount == null ? 0 : selectedOrder.discount}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Delivery Charges:</Text>
              <Text style={styles.rightText}>
                AED {selectedOrder.serviceCharges}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Order Date:</Text>
              <Text style={styles.rightText}>
                {moment(selectedOrder.bookingDate).format("MMM DD YYYY")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Delivery Date:</Text>
              <Text style={styles.rightText}>
                {moment(selectedOrder.bookingDate).format("MMM DD YYYY")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Recipient:</Text>
              <Text style={styles.rightText}>AED 0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Cooking Instruction:</Text>
              <Text style={styles.rightText}>
                {selectedOrder.cookingInstructions !== ""
                  ? selectedOrder.cookingInstructions
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Payment Method:</Text>
              <Text style={styles.rightText}>{selectedOrder.paymentType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Payment Status:</Text>
              <Text style={styles.rightText}>
                {selectedOrder.paymentStatus}
              </Text>
            </View>
            <View style={[styles.row, { marginBottom: hp(3) }]}>
              <Text style={styles.leftText}>Created At:</Text>
              <Text style={styles.rightText}>
                {moment(selectedOrder.created).format("YYYY MM DD, hh:mm A")}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
