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
import React, { useState } from "react";
import Colors from "../../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import OrderItems from "../../Components/OrderItems";

const tagArray = [
  { title: "Accept", color: Colors.pink },
  { title: "Ready to pick up", color: Colors.purple },
  { title: "Delivered", color: Colors.green },
  { title: "New Orders", color: Colors.yellow },
  { title: "Prepare", color: Colors.blueTag },
];
export default function M_OrderScreen({ navigation }) {
  const [search, setSearch] = useState("");

  React.useEffect(() => {
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
  }, [navigation]);

  return (
    <View style={ApplicationStyles.mainViewWithoutPadding}>
      <ScrollView>
        <View style={styles.tagView}>
          {tagArray.map((item, index) => {
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

        {tagArray.map((item, index) => {
          return (
            <View>
              <OrderItems item={item} navigation={navigation} />
            </View>
          );
        })}
      </ScrollView>
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
  welcomeText: {
    ...commonFontStyle(400, 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
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
    ...commonFontStyle(500, 13, Colors.white),
  },
  mainCard: {},
});
