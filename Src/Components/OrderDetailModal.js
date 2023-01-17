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
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../Themes/ApplicationStyles";
import OrderItems from "../Components/OrderItems";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, getOrders } from "../Services/MerchantApi";
import { orderStatusData } from "../Constant/Constant";
import moment from "moment";

export default function OrderDetailModal({
  visible,
  onClose,
  selectedOrder,
  type,
}) {
  const [tab, seTtab] = useState(0);
  const [orderDetail, setOrderDetail] = useState(selectedOrder);
  let tabs = [
    "Details",
    "Order Items",
    "User Details",
    type == "merchant" ? "Order Tracking History" : "Merchant Details",
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedOrder.id) {
      dispatch(
        getOrderDetail(selectedOrder.id, (data) => setOrderDetail(data))
      );
    }
  }, [selectedOrder]);

  const RenderRow = ({ title, value }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.leftText}>{title}</Text>
        <Text style={styles.rightText}>{value}</Text>
      </View>
    );
  };
  const RenderTab0 = () => {
    return (
      <View>
        <RenderRow title={"Order Id:"} value={orderDetail.bookingCode} />
        <RenderRow title={"Total Amount:"} value={orderDetail.totalPrice} />
        <RenderRow
          title={"Items Amount:"}
          value={"AED " + orderDetail.itemsPrice}
        />
        <RenderRow title={"VAT (TAX):"} value={"AED " + orderDetail.vat} />
        <RenderRow
          title={"Promo Code:"}
          value={orderDetail.promoCode == "" ? "N/A" : orderDetail.promoCode}
        />
        <RenderRow
          title={"Discount Amount:"}
          value={
            "AED " + orderDetail.discount == null ? 0 : orderDetail.discount
          }
        />
        <RenderRow
          title={"Delivery Charges:"}
          value={"AED " + orderDetail.serviceCharges}
        />
        <RenderRow
          title={"Order Date:"}
          value={moment(orderDetail.bookingDate).format("MMM DD YYYY")}
        />
        <RenderRow
          title={"Delivery Date:"}
          value={moment(orderDetail.bookingDate).format("MMM DD YYYY")}
        />
        <RenderRow title={"Recipient:"} value={orderDetail.user.name} />
        <RenderRow
          title={"Cooking Instruction:"}
          value={
            orderDetail.cookingInstructions !== ""
              ? orderDetail.cookingInstructions
              : "N/A"
          }
        />
        <RenderRow title={"Payment Method:"} value={orderDetail.paymentType} />
        <RenderRow
          title={"Payment Status:"}
          value={orderDetail.paymentStatus}
        />
        <RenderRow
          title={"Created At:"}
          value={moment(orderDetail.created).format("YYYY MM DD, hh:mm A")}
        />
      </View>
    );
  };

  const RenderTab1 = () => {
    return <View></View>;
  };
  const RenderTab2 = () => {
    return (
      <View>
        <RenderRow title={"Name:"} value={orderDetail.user.name} />
        <RenderRow title={"Gender:"} value={orderDetail.user.gender} />
        <RenderRow title={"Phone:"} value={orderDetail.user.phone} />
        <RenderRow title={"City:"} value={orderDetail.user.cityName} />
      </View>
    );
  };
  const RenderTab3 = () => {
    return <View></View>;
  };
  const RenderTab4 = () => {
    return <View></View>;
  };
  if (Object.keys(orderDetail).length !== 0) {
    return (
      <Modal
        isVisible={visible}
        // deviceWidth={SCREEN_WIDTH}
        style={ApplicationStyles.modalStyle}
        onBackButtonPress={() => onClose()}
        onBackdropPress={() => onClose()}
      >
        <View style={ApplicationStyles.modalViewStyle}>
          <View style={styles.titleView}>
            <Text style={styles.detailText}>Order Details</Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.closeButton}
            >
              <Image
                style={styles.menuIconButton}
                source={require("../Images/Merchant/xxxhdpi/close.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView
              style={{ marginBottom: hp(1.4) }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {tabs.map((element, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: hp(7),
                      marginLeft: hp(2),
                      marginRight: index == 3 ? hp(2) : 0,
                      borderBottomWidth: 5,
                      borderRadius: 5,
                      borderColor: tab == index ? Colors.pink : "transparent",
                    }}
                    onPress={() => seTtab(index)}
                  >
                    <Text
                      style={{
                        paddingVertical: 20,
                        ...commonFontStyle(
                          500,
                          18,
                          tab == index ? Colors.pink : Colors.black
                        ),
                      }}
                    >
                      {element}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView style={{ height: "100%", flex: 1 }}>
            {tab == 0 && <RenderTab0 />}
            {tab == 1 && <RenderTab1 />}
            {tab == 2 && <RenderTab2 />}
            {tab == 3 && type == "merchant" && <RenderTab3 />}
            {tab == 3 && type == "delivery" && <RenderTab4 />}
          </ScrollView>
        </View>
      </Modal>
    );
  } else return <View></View>;
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
