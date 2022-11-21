import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import GrayButton from "../../Components/GrayButton";

const citydata = [
  {
    id: 1,
    strategicName: "SUPERTREND",
  },
  { id: 2, strategicName: "VWAP" },
  { id: 3, strategicName: "RSIMA" },
  { id: 6, strategicName: "TESTING" },
  { id: 10, strategicName: "DEMATADE" },
];
export default function M_PromocodeScreen() {
  const [title, settitle] = useState("");
  const [arabicTitle, setarabicTitle] = useState("");
  const [discountCode, setdiscountCode] = useState("");
  const [businessArabic, setbusinessArabic] = useState("");
  const [des, setdes] = useState("");
  const [Arabicdes, setArabicdes] = useState("");
  const [price, setprice] = useState("");
  const [discountValue, setdiscountValue] = useState("");
  const [maxDiscount, setmaxDiscount] = useState("");
  const [minOrderValue, setminOrderValue] = useState("");
  const [validityType, setvalidityType] = useState("");
  const [expiryType, setexpiryType] = useState("");
  const [image, setimage] = useState("");

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Promo Codes</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {[0, 1, 2, 3].map((element, index) => {
            return <MenuScreenItems activeVisible={false} />;
          })}
        </ScrollView>
        <View>
          <Text style={styles.title2}>Promo code details here:</Text>
          <View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Title"}
                  value={title}
                  onChangeText={(text) => settitle(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Title in arabic"}
                  value={arabicTitle}
                  onChangeText={(text) => setarabicTitle(text)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Discount code"}
                  value={discountCode}
                  onChangeText={(text) => setdiscountCode(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={"Business in arabic"}
                  value={businessArabic}
                  onChangeText={(text) => setbusinessArabic(text)}
                />
              </View>
            </View>
            <View>
              <TextInput
                value={des}
                onChangeText={(text) => setdes(text)}
                multiline={true}
                style={styles.textInput}
                placeholder={"Description"}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
              <TextInput
                value={Arabicdes}
                onChangeText={(text) => setArabicdes(text)}
                multiline={true}
                style={styles.textInput}
                placeholder={"Description in arabic"}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title22}>Discount Type</Text>
          <View>
            <RegistrationDropdown
              data={citydata}
              value={price}
              setData={(text) => {
                setprice(text);
              }}
              placeholder={"Price"}
              valueField={"strategicName"}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              placeholder={"Discount Value"}
              value={discountValue}
              onChangeText={(text) => setdiscountValue(text)}
            />
            <RegistrationTextInput
              placeholder={"Maximum Discount Amount"}
              value={maxDiscount}
              onChangeText={(text) => setmaxDiscount(text)}
            />
            <RegistrationTextInput
              placeholder={"Minimum Order Value"}
              value={minOrderValue}
              onChangeText={(text) => setminOrderValue(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title22}>Validity Type*</Text>
          <RegistrationDropdown
            data={citydata}
            value={validityType}
            setData={(text) => {
              setvalidityType(text);
            }}
            placeholder={"Type"}
            valueField={"strategicName"}
            placeholderTextColor={Colors.black}
          />
        </View>
        <View>
          <Text style={styles.title22}>Expiry Type*</Text>
          <RegistrationDropdown
            data={citydata}
            value={expiryType}
            setData={(text) => {
              setexpiryType(text);
            }}
            placeholder={"Type"}
            valueField={"strategicName"}
            placeholderTextColor={Colors.black}
          />
        </View>
        <View>
          <Text style={styles.title22}>Image</Text>
          <RegistrationTextInput
            placeholder={"Image"}
            value={image}
            onChangeText={(text) => setimage(text)}
            placeholderTextColor={Colors.black}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <PinkButton onPress={() => {}} text={"small"} name={"Saver"} />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <GrayButton
                onPress={() => {}}
                style={styles.dbuttonStyle}
                text={"small"}
                name={"Cancel"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    ...commonFontStyle(400, 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },
  title2: {
    ...commonFontStyle(500, 16, Colors.pink),
    marginBottom: hp(2),
  },
  title22: {
    ...commonFontStyle(400, 17, Colors.pink),
    marginBottom: hp(3),
    marginTop: hp(1),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    ...commonFontStyle(400, 14, Colors.black),
    backgroundColor: Colors.white,
    marginBottom: hp(2),
    width: "100%",
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
  },
  buttonRow: {
    marginVertical: hp(3),
    marginBottom: hp(5),
  },
});
