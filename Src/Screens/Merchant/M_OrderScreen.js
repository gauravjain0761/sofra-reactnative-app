import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
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

const tagArray = [
  { title: "Accepted", color: Colors.pink, type: "ACCEPTED" },
  { title: "Ready to pick up", color: Colors.purple },
  { title: "Delivered", color: Colors.green },
  { title: "New Orders", color: Colors.yellow },
  { title: "Prepare", color: Colors.blueTag },
];
export default function M_OrderScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  const dispatch = useDispatch();
  const ORDERS = useSelector((e) => e.merchant.orders);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getOrders());
    });
  }, []);

  navigation.setOptions({
    headerTitle: () => (
      <View style={{ flex: 1, width: "100%" }}>
        <View style={styles.searchBar}>
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for specific"
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={Colors.placeholderColor}
          />
        </View>
      </View>
    ),
  });
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView>
        <View style={styles.tagView}>
          {orderStatusData.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  marginRight: hp(2),
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

        {ORDERS.length !== 0 &&
          ORDERS.map((item, index) => {
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
                  item={item}
                  navigation={navigation}
                  status={status[0]}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <Modal
        isVisible={categoryDetail}
        // deviceWidth={SCREEN_WIDTH}
        style={{
          margin: 0,
          justifyContent: "flex-end",
          borderTopStartRadius: 50,
          borderTopEndRadius: 50,
        }}
        onBackButtonPress={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
        onBackdropPress={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
      >
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            // paddingBottom: hp(3),
            maxHeight: hp(85),
          }}
        >
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
              <Text style={styles.rightText}>{selectedOrder.id}</Text>
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
              <Text style={styles.rightText}>Nov 02 2022</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Delivery Date:</Text>
              <Text style={styles.rightText}>AED 0</Text>
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
              <Text style={styles.leftText}>Payment Methiod:</Text>
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
              <Text style={styles.rightText}>N/A</Text>
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
