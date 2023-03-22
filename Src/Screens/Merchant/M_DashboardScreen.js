import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
  I18nManager,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/min/locales";
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
import { strings } from "../../Config/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLanguage } from "../../Services/asyncStorage";

export default function M_DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const DASHBOARD_DATA = useSelector((e) => e.merchant.dashBoardData);
  const dashboardSearchData = useSelector((e) => e.merchant.dashboardSearch);
  const [categoryDetail, setcategoryDetail] = useState(false);
  const [selectedOrder, setselectedOrder] = useState({});

  useEffect(() => {
    async function setLang() {
      let lang = await getLanguage();
      moment.locale(lang);
    }
    setLang();
  }, []);
  useEffect(() => {
    dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
    dispatch({ type: "PRE_LOADER", payload: false });
    dispatch(getDashboardReports());
    navigation.addListener("focus", () => {
      setSearch("");
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA", payload: {} });
    });
  }, []);

  useEffect(() => {
    if (search == "") {
      setTimeout(() => {
        dispatch({ type: "SET_DASHBOARD_SEARCH_DATA", payload: {} });
      }, 1000);
    }
  }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() !== "") {
      dispatch(dashboardSearch(text));
    } else {
      dispatch({ type: "SET_DASHBOARD_SEARCH_DATA", payload: {} });
    }
  };
  const onDeleteMenuItems = async (id) => {
    let lang = await getLanguage();
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = { menuId: id, language: lang };
          dispatch(DeleteMenuItem(data));
        },
      },
    });
  };
  const onChangeStatus = async (id, status) => {
    let lang = await getLanguage();
    let data = { menuId: id, status: status == 1 ? 0 : 1, language: lang };
    dispatch(enableDisableMenues(data));
  };

  const CommonCard = ({ onClick, title, des, buttonText, image }) => {
    return (
      <TouchableOpacity onPress={() => onClick()} style={styles.cardView}>
        {/* <Text style={styles.cardTitle}>
              {strings("dashboard.how_it_works")}
            </Text> */}
        <View
          style={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          {title == strings("pop_up.instruction") && I18nManager.isRTL ? (
            <Image
              style={[styles.menuImage, { transform: [{ rotateY: "180deg" }] }]}
              source={image}
            />
          ) : (
            <Image style={[styles.menuImage]} source={image} />
          )}

          <Text style={styles.addText}>{title}</Text>
        </View>
        <Text style={styles.addText2}>{des}</Text>
        <TouchableOpacity
          onPress={() => onClick()}
          style={styles.addMenuButton}
        >
          <Text style={styles.addButton}>{buttonText}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("dashboard.business_portal")}
        </Text>
        <View
          style={[
            styles.searchBar,
            {
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            },
          ]}
        >
          <Image
            source={require("../../Images/Merchant/xxxhdpi/ic_search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder={strings("dashboard.search_for_specific")}
            // placeholder={'fff'}
            style={[
              styles.searchInput,
              { marginRight: I18nManager.isRTL ? hp(2) : 0 },
            ]}
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
                  showsHorizontalScrollIndicator={false}
                  style={{
                    // backgroundColor: "yellow",
                    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                    // flexDirection:'row'
                  }}
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
          style={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
          }}
        >
          <CommonCard
            onClick={() => navigation.navigate("M_MenuItemScreen")}
            title={strings("pop_up.menu")}
            des={strings("dashboard.add_your_restaurant_menu")}
            buttonText={strings("dashboard.add_menu")}
            image={require("../../Images/Merchant/xxxhdpi/menu_vector.png")}
          />
          <CommonCard
            onClick={() => navigation.navigate("M_MenuStack1")}
            title={strings("pop_up.category")}
            des={strings("dashboard.add_your_category")}
            buttonText={strings("dashboard.add_categories")}
            image={require("../../Images/Merchant/xxxhdpi/img_category.png")}
          />
          <CommonCard
            onClick={() => navigation.navigate("M_InstructionScreen")}
            title={strings("pop_up.instruction")}
            des={strings("dashboard.see_Instruction")}
            buttonText={strings("dashboard.inctruction")}
            image={require("../../Images/Merchant/xxxhdpi/ic_instructions.png")}
          />
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
              <Text style={styles.rightText}>
                {strings("dashboard.total")}
                {"\n"}
                {strings("dashboard.earning")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("M_OrderScreen")}
            style={styles.halfView}
          >
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
              <Text style={styles.rightText}>
                {strings("dashboard.completed")}
                {"\n"}
                {strings("dashboard.orders")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("M_MenuItemScreen")}
            style={styles.halfView}
          >
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
              <Text style={styles.rightText}>
                {strings("dashboard.total")}
                {"\n"}
                {strings("dashboard.lateralEntry.menu_items")}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("M_OrderScreen")}
            style={styles.halfView}
          >
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
              <Text style={styles.rightText}>
                {strings("dashboard.lateralEntry.active")}
                {"\n"}
                {strings("dashboard.orders")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paddingView}>
          {DASHBOARD_DATA?.grossVolume && (
            <Chart
              name={strings("dashboard.lateralEntry.gross_volume")}
              x={DASHBOARD_DATA.grossVolume.dates}
              value={DASHBOARD_DATA.grossVolume.grossAmount}
              totalData={DASHBOARD_DATA.grossVolume.totalGrossAmount}
            />
          )}

          {DASHBOARD_DATA?.grossVolume && (
            <Chart
              name={strings("dashboard.lateralEntry.net_earnings")}
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
        type="merchant"
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
    paddingVertical: hp(3),
    alignItems: "center",
    marginRight: hp(2),
    marginBottom: hp(2),
    // display: "flex",
    // flex: 1,
    justifyContent: "center",
    width: widthPercentageToDP(72),
  },
  cardTitle: {
    ...commonFontStyle("extraBold", 24, Colors.black),
    paddingHorizontal: hp(3),
  },
  addText: {
    ...commonFontStyle(400, 26, Colors.pink),
  },
  addText2: { ...commonFontStyle(400, 13, Colors.black) },
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
    height: hp(7),
    width: hp(9),
    resizeMode: "contain",
    // backgroundColor: "red",
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
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    width: "100%",
  },
  rightText: {
    ...commonFontStyle("M_600", 13, Colors.black),
    marginLeft: hp(1.5),
    marginRight: hp(1.5),
  },
  bottomcardRowImage: {
    height: hp(4.5),
    width: hp(4.5),
    resizeMode: "contain",
  },
});
