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
import { strings } from "../../Config/I18n";

const citydata = [
  {
    id: 1,
    strategicName: strings('cityData.Supertrend'),
  },
  { id: 2, strategicName:strings('cityData.VWAP') },
  { id: 3, strategicName: strings('cityData.RSIMA') },
  { id: 6, strategicName: strings('cityData.TESTING')},
  { id: 10, strategicName: strings('cityData.DEMATADE')},
];
export default function M_EditPromocodeScreen() {
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
        <Text style={ApplicationStyles.welcomeText}>{strings('promo_code.lateralEntry.edit_promo_code')}</Text>

        <View>
          <Text style={styles.title2}>{strings('promo_code.promo_code_details_here')}</Text>
          <View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings('promo_code.title')}
                  value={title}
                  onChangeText={(text) => settitle(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings('promo_code.title_in_arabic')}
                  value={arabicTitle}
                  onChangeText={(text) => setarabicTitle(text)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings('promo_code.discount_code')}
                  value={discountCode}
                  onChangeText={(text) => setdiscountCode(text)}
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
                <RegistrationTextInput
                  placeholder={strings('promo_code.business_in_arabic')}
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
                placeholder={strings('promo_code.description')}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
              <TextInput
                value={Arabicdes}
                onChangeText={(text) => setArabicdes(text)}
                multiline={true}
                style={styles.textInput}
                placeholder={strings('promo_code.descripition_in_arabic')}
                placeholderTextColor={Colors.placeholderColor}
                textAlignVertical={"top"}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title22}>{strings('promo_coe.discount_type')}</Text>
          <View>
            <RegistrationDropdown
              data={citydata}
              value={price}
              setData={(text) => {
                setprice(text);
              }}
              placeholder={strings('promo_code.price')}
              valueField={"strategicName"}
              placeholderTextColor={Colors.black}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings('promo_code.discount_value')}
              value={discountValue}
              onChangeText={(text) => setdiscountValue(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings('promo_code.maximum_discount_amount')}
              value={maxDiscount}
              onChangeText={(text) => setmaxDiscount(text)}
            />
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings('promo_code.maximum_discount_value')}
              value={minOrderValue}
              onChangeText={(text) => setminOrderValue(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title22}>{`${strings('promo_code.validity_type')}*`}</Text>
          <RegistrationDropdown
            data={citydata}
            value={validityType}
            setData={(text) => {
              setvalidityType(text);
            }}
            placeholder={strings('promo_code.tyep')}
            valueField={"strategicName"}
            placeholderTextColor={Colors.black}
          />
        </View>
        <View>
          <Text style={styles.title22}>{`${strings('promo_code.expiry_type')}*`}</Text>
          <RegistrationDropdown
            data={citydata}
            value={expiryType}
            setData={(text) => {
              setexpiryType(text);
            }}
            placeholder={strings('promo_code.type')}
            valueField={"strategicName"}
            placeholderTextColor={Colors.black}
          />
        </View>
        <View>
          <Text style={styles.title22}>{strings('promo_code.image')}</Text>
          <RegistrationTextInput
            placeholder={strings('promo_code.image')}
            value={image}
            onChangeText={(text) => setimage(text)}
            placeholderTextColor={Colors.black}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <PinkButton onPress={() => {}} text={"small"} name={strings('promo_code.save')} />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <GrayButton
                onPress={() => {}}
                style={styles.dbuttonStyle}
                text={"small"}
                name={strings('promo_code.cancel')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
