import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { orderStatusData } from "../../Constant/Constant";
import OrderSuccessStatusModal from "../OrderSuccessStatusModal";
import OrderStatusModal from "../OrderStatusModal";
import {
  assignDriver,
  changeOrderStatus,
  getActiveOrders,
} from "../../Services/DeliveryApi";
import AssignToDriverModal from "./AssignToDriverModal";
import { media_url } from "../../Config/AppConfig";

export default function D_OrderItems({ item, navigation, status, screen }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextStatus, setnextStatus] = useState({});
  const dispatch = useDispatch();
  const [message, setmessage] = useState("");
  const modalVisibleSuccess = useSelector((e) => e.delivery.successModal);
  const successModalMessage = useSelector(
    (e) => e.delivery.successModalMessage
  );
  const [orderImage, setOrderImage] = useState("");

  const [modalAccessDriver, setModalAccessDriver] = useState(false);
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

  useEffect(() => {
    if (status.type == "READY_FOR_PICKUP") {
      setnextStatus(orderStatusData[2]);
    }
    if (screen && screen == "active_order") {
      if (item.status == "READY_FOR_PICKUP") {
        setnextStatus(orderStatusData[5]);
      } else if (item.status == "PICKED_UP") {
        setnextStatus(orderStatusData[6]);
      }
    }
  }, [status]);
  const onStatusUpdate = () => {
    let data = { orderId: item.id, status: nextStatus.type, language: "en" };
    dispatch(
      changeOrderStatus(data, (message) => {
        setmessage(message);
        dispatch({
          type: "SUCCESS_MODAL",
          payload: { modal: true, message: message },
        });

        setTimeout(() => {
          if (screen && screen == "active_order") {
            dispatch({
              type: "UPDATE_ORDER_ACTIVE",
              payload: data,
            });
          } else {
            dispatch({
              type: "UPDATE_ORDER_STATUS_PICKUP",
              payload: data,
            });
          }
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
  const onDriverChange = (driver) => {
    let data = { driverId: driver, orderId: item.id };
    dispatch(
      assignDriver(data, (message) => {
        setmessage(message);
        dispatch({
          type: "SUCCESS_MODAL",
          payload: { modal: true, message: message },
        });
        dispatch(getActiveOrders(1));
      })
    );
    setModalAccessDriver(false);
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
                source={require("../../Images/Delivery/xxxhdpi/user.png")}
                resizeMode={"contain"}
              />
            </View>
          )}
        </View>
        <View style={styles.RightView}>
          <View>
            <Text style={styles.name} numberOfLines={1}>
              {item.restaurant.name}
            </Text>
            <Text style={styles.type}>
              {item.bookingCode + "\n"}
              {"Date " + moment(item.bookingDate).format("YYYY-MM-DD")}
            </Text>
            <Text style={styles.name}>AED {item.totalPrice}</Text>

            <Image
              style={styles.truckLogo}
              source={require("../../Images/Merchant/xxxhdpi/ic_car.png")}
            />
          </View>
          {screen !== "active_order" && (
            <View>
              {status.type == "READY_FOR_PICKUP" ? (
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
          )}
        </View>
      </View>
      {screen && screen == "active_order" && (
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={{
              borderRadius: 3,
              overflow: "hidden",
              zIndex: 1111,
            }}
            onPress={() => setModalAccessDriver(true)}
          >
            <Text style={[styles.tagText, { backgroundColor: Colors.yellow }]}>
              {item.driver !== null ? "Change Driver" : "Assign to Driver"}
            </Text>
          </TouchableOpacity>
          {item.status == "READY_FOR_PICKUP" || item.status == "PICKED_UP" ? (
            <TouchableOpacity
              style={{
                borderRadius: 3,
                overflow: "hidden",
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
                zIndex: 1111,
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
      )}

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

      {screen && screen == "active_order" && (
        <AssignToDriverModal
          modalVisible={modalAccessDriver}
          onClose={() => setModalAccessDriver(false)}
          onDriverChange={(driver) => onDriverChange(driver)}
          driverAlready={item.driver}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainCardView: {
    flexDirection: "row",
  },
  leftView: {
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
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1.5),
    marginHorizontal: hp(5),
  },
});
