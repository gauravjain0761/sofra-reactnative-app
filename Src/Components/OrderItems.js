import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import React from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";
import ReactNativeModal from "react-native-modal";
import ApplicationStyles from "../Themes/ApplicationStyles";
import { useState } from "react";
import PinkButton from "./PinkButton";
import { useEffect } from "react";
import { orderStatusData } from "../Constant/Constant";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../Services/MerchantApi";
import OrderSuccessStatusModal from "./OrderSuccessStatusModal";
import OrderStatusModal from "./OrderStatusModal";
import { media_url } from "../Config/AppConfig";

export default function OrderItems({
  item,
  navigation,
  selectedStatus,
  status,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextStatus, setnextStatus] = useState({});
  const dispatch = useDispatch();
  const [message, setmessage] = useState("");
  const [orderImage, setOrderImage] = useState("");
  // const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const modalVisibleSuccess = useSelector((e) => e.merchant.successModal);
  const successModalMessage = useSelector(
    (e) => e.merchant.successModalMessage
  );
  useEffect(() => {
    if (
      status.type == "PENDING" ||
      status.type == "ACCEPTED" ||
      status.type == "PREPARING"
    ) {
      let index = orderStatusData.findIndex((obj) => obj.type == status.type);
      setnextStatus(orderStatusData[index + 1]);
    }
  }, []);

  useEffect(() => {
    if (item.cartItems && item.cartItems.length !== 0) {
      let image = [];
      item.cartItems.forEach((element) => {
        image.push(element.image);
      });
      let temp = image.sort(function (a, b) {
        return (a === null) - (b === null) || -(a > b) || +(a < b);
      });
      setOrderImage(temp[0]);
    }
  }, [item]);

  const onStatusUpdate = () => {
    let data = { orderId: item.id, status: nextStatus.type, language: "en" };
    dispatch(
      changeStatus(data, selectedStatus, (message) => {
        setmessage(message);
        dispatch({
          type: "SUCCESS_MODAL",
          payload: { modal: true, message: message },
        });
        setTimeout(() => {
          dispatch({
            type: "UPDATE_ORDER_STATUS",
            payload: { postObj: data, selectedStatus },
          });
        }, 2000);
      })
    );
    setModalVisible(false);
  };
  const onPressOk = () => {
    dispatch({
      type: "SUCCESS_MODAL",
      payload: { modal: false, message: "" },
    });
  };
  return (
    <View>
      <View style={styles.mainCardView}>
        <View style={styles.leftView}>
          {orderImage && orderImage !== "" ? (
            <Image
              style={styles.resImage}
              source={{ uri: media_url + orderImage }}
            />
          ) : (
            <View
              style={{
                width: hp(20),
                height: hp(16),
                resizeMode: "contain",
                borderRadius: 10,
                backgroundColor: Colors.placeholde,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: hp(8),
                  height: hp(8),
                  resizeMode: "contain",
                  borderRadius: 10,
                  tintColor: Colors.placeholderColor,
                }}
                source={require("../Images/Delivery/xxxhdpi/user.png")}
                resizeMode={"contain"}
              />
            </View>
          )}
        </View>
        <View style={styles.RightView}>
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {item.user.name}
            </Text>
            <Text style={styles.type}>
              {item.bookingCode + "\n"}
              {"Date " + moment(item.bookingDate).format("YYYY-MM-DD")}
            </Text>
            <Text style={styles.name}>AED {item.totalPrice}</Text>
            <Image
              style={styles.truckLogo}
              source={require("../Images/Merchant/xxxhdpi/ic_car.png")}
            />
          </View>
          <View>
            {status.type == "PENDING" ||
            status.type == "ACCEPTED" ||
            status.type == "PREPARING" ? (
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  alignSelf: "flex-end",
                  zIndex: 1111,
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={[styles.tagText, { backgroundColor: status?.color }]}
                >
                  {status?.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={[styles.tagText, { backgroundColor: status?.color }]}
                >
                  {status?.title}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
      <OrderSuccessStatusModal
        modalVisibleSuccess={modalVisibleSuccess}
        onPressOk={() => onPressOk()}
        successModalMessage={successModalMessage}
      />
      <OrderStatusModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        nextStatus={nextStatus}
        onStatusUpdate={() => onStatusUpdate()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainCardView: {
    flexDirection: "row",
    // paddingHorizontal: 0,
  },
  leftView: {
    // width: hp(20),
    paddingHorizontal: hp(2),
  },
  RightView: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - hp(26),
  },
  resImage: {
    width: hp(20),
    height: hp(16),
    resizeMode: "cover",
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.placeholderColor,
    marginVertical: hp(2),
  },
  truckLogo: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
    marginVertical: 5,
  },
  tagText: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    ...commonFontStyle("M_600", 12, Colors.white),
  },
  name: {
    ...commonFontStyle(600, 14, Colors.black),
  },
  type: {
    ...commonFontStyle(500, 12, Colors.tabIconColor),
    paddingVertical: 5,
    lineHeight: 14,
  },

  icon: {
    height: hp(10),
    width: hp(10),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.green,
  },
  title: {
    textAlign: "center",
    ...commonFontStyle("M_600", 20, Colors.black),
    paddingVertical: hp(2),
  },
  titleBottom: {
    textAlign: "center",
    ...commonFontStyle("M_400", 16, Colors.black),
    paddingBottom: hp(2),
  },
  titleBottomBold: {
    ...commonFontStyle("M_600", 16, Colors.black),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  buttonRow2: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
