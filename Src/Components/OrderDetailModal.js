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
import { getOrderDetailDelivery } from "../Services/DeliveryApi";
import { merchant_url, media_url } from "../Config/AppConfig";
import { strings } from "../Config/I18n";
export default function OrderDetailModal({
  visible,
  onClose,
  selectedOrder,
  type,
}) {
  const [tab, seTtab] = useState(0);
  const [orderDetail, setOrderDetail] = useState(selectedOrder);
  let tabs =
    type == "merchant"
      ? [
          strings("order_detail.details"),
          strings("order_detail.order_items"),
          strings("order_detail.user_detail"),
          strings("order_detail.order_tracking_history"),
        ]
      : [
          "Details",
          "Order Items",
          "User Details",
          type == "merchant" ? "Order Tracking History" : "Merchant Details",
        ];

  const dispatch = useDispatch();
  useEffect(() => {
    seTtab(0);
    if (selectedOrder.id) {
      dispatch(
        type == "merchant"
          ? getOrderDetail(selectedOrder.id, (data) => setOrderDetail(data))
          : getOrderDetailDelivery(selectedOrder.id, (data) =>
              setOrderDetail(data)
            )
      );
    }
  }, [selectedOrder]);

  const RenderRow = ({ title, value, style }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.leftText}>{title}</Text>
        <Text style={[styles.rightText, style]}>{value}</Text>
      </View>
    );
  };
  const RenderTab0 = () => {
    return (
      <View>
        <RenderRow
          title={strings("order_detail.order_id")}
          value={orderDetail.bookingCode}
        />
        <RenderRow
          title={strings("order_detail.total_amount")}
          value={orderDetail.totalPrice}
        />
        <RenderRow
          title={strings("order_detail.items_amount")}
          value={strings("order_detail.AED") + " " + orderDetail.itemsPrice}
        />
        <RenderRow
          title={strings("order_detail.vat")}
          value={strings("order_detail.AED") + " " + orderDetail.vat}
        />
        <RenderRow
          title={strings("order_detail.promo_code")}
          value={
            orderDetail.promoCode == ""
              ? strings("order_detail.na")
              : orderDetail.promoCode
          }
        />
        <RenderRow
          title={strings("order_detail.discount_amount")}
          value={
            strings("order_detail.AED") + " " + orderDetail.discount == null
              ? 0
              : orderDetail.discount
          }
        />
        <RenderRow
          title={strings("order_detail.delivery_charges")}
          value={strings("order_detail.AED") + " " + orderDetail.serviceCharges}
        />
        <RenderRow
          title={strings("order_detail.order_date")}
          value={moment(orderDetail.bookingDate).format("MMM DD YYYY")}
        />
        <RenderRow
          title={strings("order_detail.delivery_date")}
          value={moment(orderDetail.bookingDate).format("MMM DD YYYY")}
        />
        <RenderRow
          title={strings("order_detail.recipient")}
          value={orderDetail.user.name}
        />
        <RenderRow
          title={strings("order_detail.cooking_instruction")}
          value={
            orderDetail.cookingInstructions !== ""
              ? orderDetail.cookingInstructions
              : strings("order_detail.na")
          }
        />
        <RenderRow
          title={strings("order_detail.payment_method")}
          value={orderDetail.paymentType}
        />
        <RenderRow
          title={strings("order_detail.payment_status")}
          value={orderDetail.paymentStatus}
        />
        <RenderRow
          title={strings("order_detail.created_at")}
          value={moment(orderDetail.created).format("YYYY MM DD, hh:mm A")}
        />

        <Text
          style={{
            ...commonFontStyle(600, 18, Colors.black),
            marginTop: hp(3),

            marginLeft: hp(1.5),
          }}
        >
          {strings("order_detail.delivery_address")}
        </Text>
        <RenderRow
          title={strings("order_detail.title")}
          value={JSON.parse(orderDetail.deliveryAddress).title}
        />
        <RenderRow
          title={strings("order_detail.area")}
          value={JSON.parse(orderDetail.deliveryAddress).area}
        />
        <RenderRow
          title={strings("order_detail.building")}
          value={JSON.parse(orderDetail.deliveryAddress).buildingName}
        />
        <RenderRow
          title={strings("order_detail.appartment")}
          value={JSON.parse(orderDetail.deliveryAddress).apartment}
        />
        <RenderRow
          style={{ width: "75%", textAlign: "right" }}
          title={strings("order_detail.address")}
          value={JSON.parse(orderDetail.deliveryAddress).address}
        />
      </View>
    );
  };
  const RenderTab1 = () => {
    return (
      <View>
        {orderDetail.cartItems &&
          orderDetail.cartItems.length !== 0 &&
          orderDetail.cartItems.map((element, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(2),
                  marginHorizontal: hp(2),
                }}
              >
                <View>
                  <Image
                    source={
                      element.image ? { uri: media_url + element.image } : null
                    }
                    style={{
                      height: hp(10),
                      width: hp(10),
                      backgroundColor: Colors.backgroundScreen,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ marginLeft: hp(1), flex: 1 }}>
                  <Text style={styles.rightText}>
                    {element.itemName} ({strings("order_detail.AED")}{" "}
                    {element.price})
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      ...commonFontStyle(500, 13, Colors.darkGrey),
                    }}
                  >
                    {strings("order_detail.quantity") + element.qty}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      ...commonFontStyle(500, 13, Colors.darkGrey),
                    }}
                  >
                    {strings("order_detail.total_price") + element.totalPrice}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    );
  };
  const RenderTab2 = () => {
    return (
      <View>
        <RenderRow
          title={strings("order_detail.Name")}
          value={orderDetail.user.name}
        />
        <RenderRow
          title={strings("order_detail.Gender")}
          value={orderDetail.user.gender}
        />
        <RenderRow
          title={strings("order_detail.Phone")}
          value={orderDetail.user.phone}
        />
        <RenderRow
          title={strings("order_detail.City")}
          value={orderDetail.user.cityName}
        />
      </View>
    );
  };
  const RenderTab3 = () => {
    return (
      <View>
        {orderDetail.statusTrack.length !== 0 &&
          orderDetail.statusTrack.map((item, index) => {
            return (
              <View style={{ flexDirection: "row", marginHorizontal: hp(2) }}>
                <View>
                  <Image
                    source={require("../Images/Merchant/xxxhdpi/check1.png")}
                    style={{
                      tintColor: Colors.pink,
                      height: hp(3),
                      width: hp(3),
                    }}
                  />
                  <View
                    style={{
                      backgroundColor:
                        index == orderDetail.statusTrack.length - 1
                          ? "transparent"
                          : Colors.pink,
                      width: 2,
                      height: "100%",
                      flex: 1,
                      alignSelf: "center",
                    }}
                  ></View>
                </View>
                <View
                  style={{ flex: 1, marginLeft: hp(1), paddingBottom: hp(4) }}
                >
                  <Text style={styles.rightText}>{item.msg}</Text>
                  <Text style={styles.leftText}>
                    {moment(item.created).format("MMM DD YYYY hh:mm A")}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    );
  };
  const RenderTab4 = () => {
    return (
      <View>
        <RenderRow
          title={"Owner Name:"}
          value={
            orderDetail.restaurant.first_name +
            " " +
            orderDetail.restaurant.last_name
          }
        />
        <RenderRow
          title={"Business Name:"}
          value={orderDetail.restaurant.name}
        />
        <RenderRow
          style={{ width: "75%", textAlign: "right" }}
          title={"Details:"}
          value={
            orderDetail.restaurant.description +
            " (" +
            orderDetail.restaurant.description_ar +
            ")"
          }
        />
        <RenderRow title={"Phone:"} value={orderDetail.restaurant.phone} />
      </View>
    );
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
        <View style={ApplicationStyles.modalViewStyle1}>
          <View style={styles.titleView}>
            <Text style={styles.detailText}>
              {strings("order_detail.order_detail")}
            </Text>
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
              contentContainerStyle={{ height: hp(7) }}
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
                        paddingTop: 20,
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
