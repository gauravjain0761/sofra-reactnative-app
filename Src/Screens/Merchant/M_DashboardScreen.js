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
  dashboardSearch,
  DeleteMenuItem,
  enableDisableMenues,
  getDashboardReports,
} from "../../Services/MerchantApi";
import Chart from "../../Components/Chart";
import MenuScreenItems from "../../Components/MenuScreenItems";
import OrderItems from "../../Components/OrderItems";
import { orderStatusData } from "../../Constant/Constant";
import OrderDetailModal from "../../Components/OrderDetailModal";

export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const DASHBOARD_DATA = useSelector((e) => e.merchant.dashBoardData);
  const dashboardSearchData = useSelector((e) => e.merchant.dashboardSearch);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: false });
    dispatch(getDashboardReports());
    navigation.addListener("focus", () => {
      setSearch("");
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA", payload: {} });
    });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text !== "") {
      dispatch(dashboardSearch(text));
    } else {
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA", payload: {} });
    }
  };
  const onDeleteMenuItems = (id) => {
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = { menuId: id, language: "en" };
          dispatch(DeleteMenuItem(data));
        },
      },
    });
  };
  const onChangeStatus = (id, status) => {
    let data = { menuId: id, status: status == 1 ? 0 : 1, language: "en" };
    dispatch(enableDisableMenues(data));
  };
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Business Portal</Text>
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
        {Object.keys(dashboardSearchData).length !== 0 && (
          <View>
            {dashboardSearchData.menuItems.length !== 0 && (
              <View style={styles.paddingView}>
                <FlatList
                  horizontal={true}
                  data={dashboardSearchData.menuItems}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index}>
                        <MenuScreenItems
                          onEdit={() => {
                            navigation.navigate("M_EditMenuItemScreen", item);
                          }}
                          onDelete={() => onDeleteMenuItems(item.id)}
                          item={item}
                          screen={"item"}
                          activeVisible={true}
                          status={item.status}
                          index={index}
                          onChangeStatus={() =>
                            onChangeStatus(item.id, item.status)
                          }
                        />
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
            {dashboardSearchData.orders.length !== 0 && (
              <View>
                <FlatList
                  data={dashboardSearchData.orders}
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
                          selectedStatus={"ALL"}
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
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.paddingView}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>How it Works</Text>
            <Image
              style={styles.menuImage}
              source={require("../../Images/Merchant/xxxhdpi/menu_vector.png")}
            />
            <Text style={styles.addText}>Add your restaurant menu</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("M_MenuItemScreen")}
              style={styles.addMenuButton}
            >
              <Text style={styles.addButton}>Add Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>How it Works</Text>
            <Image
              style={styles.menuImage}
              source={require("../../Images/Merchant/xxxhdpi/img_category.png")}
            />
            <Text style={styles.addText}>Add your category</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("M_MenuStack1")}
              style={styles.addMenuButton}
            >
              <Text style={styles.addButton}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.totalEarnings
                ? parseFloat(DASHBOARD_DATA?.totalEarnings).toFixed(2)
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_eraning.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Earning</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.bookingsCompleted
                ? DASHBOARD_DATA?.bookingsCompleted
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_complete_orders.png")}
              />
              <Text style={styles.rightText}>Completed{"\n"}Orders</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowView}>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.totalMenuItems
                ? DASHBOARD_DATA?.totalMenuItems
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_menu_dashboard.png")}
              />
              <Text style={styles.rightText}>Total{"\n"}Menu Items</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.halfViewTitle}>
              {DASHBOARD_DATA?.bookingsActive
                ? DASHBOARD_DATA?.bookingsActive
                : 0}
            </Text>
            <View style={styles.bottomcardRow}>
              <Image
                style={styles.bottomcardRowImage}
                source={require("../../Images/Merchant/xxxhdpi/ic_active_order.png")}
              />
              <Text style={styles.rightText}>Active{"\n"}Orders</Text>
            </View>
          </View>
        </View>
        <View style={styles.paddingView}>
          {DASHBOARD_DATA?.grossVolume && (
            <Chart
              name={"Gross Volume"}
              x={DASHBOARD_DATA.grossVolume.dates}
              value={DASHBOARD_DATA.grossVolume.grossAmount}
              totalData={DASHBOARD_DATA.grossVolume.totalGrossAmount}
            />
          )}

          {DASHBOARD_DATA?.grossVolume && (
            <Chart
              name={"Net Earnings"}
              x={DASHBOARD_DATA.netEarnings.dates}
              value={DASHBOARD_DATA.netEarnings.netEarningArr}
              totalData={DASHBOARD_DATA.netEarnings.totalNetEarnings}
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
      />
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
    marginRight: hp(2),
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
    marginVertical: hp(3),
    height: hp(12),
    width: hp(20),
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
