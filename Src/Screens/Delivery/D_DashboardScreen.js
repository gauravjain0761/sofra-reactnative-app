import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardSearchDelivery,
  getDeliveryDashboardReports,
} from "../../Services/DeliveryApi";
import Chart from "../../Components/Chart";
import { orderStatusData } from "../../Constant/Constant";
import D_OrderItems from "../../Components/DeliveryComponent/D_OrderItems";
import OrderDetailModal from "../../Components/OrderDetailModal";
import SubscriptionToast from "../../Components/SubscriptionToast";
export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const DASHBOARD_DATA = useSelector((e) => e.delivery.dashboardData);
  const dashboardSearchData = useSelector((e) => e.delivery.dashboardSearch);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});
  const COMPANY = useSelector((e) => e.delivery.companyProfile);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
    dispatch({ type: "PRE_LOADER", payload: false });
    dispatch(getDeliveryDashboardReports());
    navigation.addListener("focus", () => {
      setSearch("");
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA_DELIVERY", payload: {} });
    });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text !== "") {
      dispatch(dashboardSearchDelivery(text));
    } else {
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA_DELIVERY", payload: {} });
    }
  };

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Delivery Portal</Text>
        <View style={styles.searchBar}>
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for specific"
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => handleSearch(text)}
            placeholderTextColor={Colors.placeholderColor}
          />
        </View>

        {dashboardSearchData.orders !== undefined &&
          dashboardSearchData.orders.length !== 0 && (
            <View>
              <FlatList
                data={dashboardSearchData.orders}
                ListEmptyComponent={
                  <Text style={ApplicationStyles.nodataStyle}>
                    No Data Found
                  </Text>
                }
                // style={{ flex: 1 }}
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
              />
            </View>
          )}

        <View style={styles.cardView}>
          <Text style={styles.cardTitle}>Add New Driver</Text>
          <Image
            style={styles.menuImage}
            source={require("../../Images/Delivery/xxxhdpi/ic_delivery.png")}
          />
          <TouchableOpacity
            style={styles.addMenuButton}
            onPress={() => {
              navigation.navigate("D_DriverStack1");
            }}
          >
            <Text style={styles.addButton}>Add Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA ? DASHBOARD_DATA.totalEarnings : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Delivery/xxxhdpi/ic_earning.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Earning</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA.totalConvienceFee
                ? DASHBOARD_DATA.totalConvienceFee
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Delivery/xxxhdpi/ic_fee.png")}
              />
              <Text style={styles.rightText}>Convenience{"\n"}Fee Charged</Text>
            </View>
          </View>
        </View>

        <View style={styles.paddingView}>
          {DASHBOARD_DATA?.bookingsCompleted !== undefined && (
            <Chart
              name={"Orders Delivered"}
              x={DASHBOARD_DATA.grossAmountDates}
              value={DASHBOARD_DATA.totalOrdersArr}
              totalData={DASHBOARD_DATA.bookingsCompleted}
            />
          )}
          {DASHBOARD_DATA?.totalEarnings !== undefined && (
            <Chart
              name={"Total Earnings"}
              x={DASHBOARD_DATA.grossAmountDates}
              value={DASHBOARD_DATA.totalOrdersArr}
              totalData={DASHBOARD_DATA.totalEarnings}
            />
          )}
        </View>
      </ScrollView>
      <OrderDetailModal
        visible={categoryDetail}
        onClose={() => {
          setcategoryDetail(!categoryDetail), setselectedOrder({});
        }}
        selectedOrder={selectedOrder}
        type={"delivery"}
      />
      <SubscriptionToast data={COMPANY} />
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: hp(2),
    borderRadius: 8,
    marginBottom: hp(3),
    marginHorizontal: hp(2),
  },
  paddingView: {
    marginHorizontal: hp(2),
  },
  searchIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: "contain",
  },
  searchInput: {
    height: hp(6),
    ...commonFontStyle(400, 16, Colors.black),
    paddingLeft: hp(2),
    width: "100%",
  },
  cardView: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    padding: hp(3),
    alignItems: "center",
    marginHorizontal: hp(2),
    marginBottom: hp(2),
  },
  cardTitle: {
    ...commonFontStyle("extraBold", 24, Colors.black),
    paddingHorizontal: hp(3),
  },
  addText: {
    ...commonFontStyle(400, 13, Colors.black),
  },
  addButton: {
    ...commonFontStyle("M_700", 14, Colors.white),
  },
  addMenuButton: {
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.pink,
    marginTop: hp(2),
    borderRadius: 5,
  },
  menuImage: {
    marginVertical: hp(1),
    height: hp(18),
    width: hp(30),
    resizeMode: "contain",
  },
  rowView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginHorizontal: hp(2),
  },
  halfView: {
    backgroundColor: Colors.white,
    padding: hp(1.5),
    width: "48%",
    alignItems: "center",
    borderRadius: 8,
  },
  halfViewTitle: {
    ...commonFontStyle("M_600", 22, Colors.black),
    marginBottom: hp(1),
  },
  bottomcardRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  rightText: {
    ...commonFontStyle("M_600", 13, Colors.black),
    marginLeft: hp(1.5),
  },
  bottomcardRowImage: {
    height: hp(4.5),
    width: hp(4.5),
    resizeMode: "contain",
  },
});

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.white,
//     paddingHorizontal: hp(2),
//     borderRadius: 8,
//     marginBottom: hp(3),
//     marginHorizontal: hp(2),
//   },
//   paddingView: {
//     marginHorizontal: hp(2),
//   },
//   searchIcon: {
//     height: hp(2),
//     width: hp(2),
//     resizeMode: "contain",
//   },
//   searchInput: {
//     height: hp(6),
//     ...commonFontStyle(400, 16, Colors.black),
//     paddingLeft: hp(2),
//     width: "100%",
//   },
//   cardView: {
//     borderRadius: 8,
//     backgroundColor: Colors.white,
//     padding: hp(3),
//     alignItems: "center",
//     marginRight: hp(2),
//     marginBottom: hp(2),
//   },
//   cardTitle: {
//     ...commonFontStyle("extraBold", 24, Colors.black),
//     paddingHorizontal: hp(3),
//   },
//   addText: {
//     ...commonFontStyle(400, 13, Colors.black),
//   },
//   addButton: {
//     ...commonFontStyle("M_700", 14, Colors.white),
//   },
//   addMenuButton: {
//     paddingHorizontal: hp(3),
//     paddingVertical: hp(1.5),
//     backgroundColor: Colors.pink,
//     marginTop: hp(2),
//     borderRadius: 5,
//   },
//   menuImage: {
//     marginVertical: hp(1),
//     height: hp(18),
//     width: hp(30),
//     resizeMode: "contain",
//   },
//   rowView: {
//     flex: 2,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: hp(2),
//     marginHorizontal: hp(2),
//   },
//   halfView: {
//     backgroundColor: Colors.white,
//     padding: hp(1.5),
//     width: "48%",
//     alignItems: "center",
//     borderRadius: 8,
//   },
//   halfViewTitle: {
//     ...commonFontStyle("M_600", 22, Colors.black),
//     marginBottom: hp(1),
//   },
//   bottomcardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//   },
//   rightText: {
//     ...commonFontStyle("M_600", 13, Colors.black),
//     marginLeft: hp(1.5),
//   },
//   bottomcardRowImage: {
//     height: hp(4.5),
//     width: hp(4.5),
//     resizeMode: "contain",
//   },
// });
