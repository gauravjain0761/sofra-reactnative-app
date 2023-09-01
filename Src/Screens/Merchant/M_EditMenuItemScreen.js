import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  I18nManager,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle, SCREEN_WIDTH } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchErrorAction,
  getFromDataJson,
  hasArabicCharacters,
} from "../../Services/CommonFunctions";
import { media_url } from "../../Config/AppConfig";
import { ItemTypeData } from "../../Config/StaticDropdownData";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { EditMenuItem } from "../../Services/MerchantApi";
import moment from "moment";
import { strict } from "yargs";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";

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
export default function M_EditMenuItemScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [ArabicName, setArabicName] = useState("");
  const [MenuCategory, setMenuCategory] = useState("");
  const [ItemType, setItemType] = useState("");
  const [Price, setPrice] = useState("");
  const [Discount, setDiscount] = useState("");
  const [MaxLimit, setMaxLimit] = useState("");
  const [MenuIdEdit, setMenuIdEdit] = useState("");
  const [ImageItem, setImageItem] = useState("");
  const [Description, setDescription] = useState("");
  const [ArabicDes, setArabicDes] = useState("");
  const [MenuDes, setMenuDes] = useState("");
  const ALL_CATEGORIES = useSelector((e) => e.merchant.menuCategories);
  const DESCRIPTOR = useSelector((e) => e.merchant.descriptor);
  const isFocused = useIsFocused();
  const [Language, setLanguage] = useState("en");
  useEffect(async () => {
    let lang = await getLanguage();
    setLanguage(lang);
  }, []);
  const getArray = (mainArray, filed) => {
    let temp = [];
    mainArray.length !== 0 &&
      mainArray.map((element) => temp.push(element[filed]));
    return temp;
  };

  useEffect(() => {
    let menuItem = props?.route?.params;
    console.log(menuItem);
    if (menuItem) {
      setName(menuItem.name);
      setArabicName(menuItem.name_ar);
      setItemType(menuItem.item_type);
      setPrice(String(menuItem.price ? menuItem.price : ""));
      setMenuCategory(
        Language == "en"
          ? [menuItem.menuCategory.name]
          : [menuItem.menuCategory.name_ar]
      );
      setDiscount(String(menuItem.discount ? menuItem.discount : ""));
      setMaxLimit(String(menuItem.maxLimit ? menuItem.maxLimit : ""));
      setImageItem(menuItem.image ? menuItem.image : "");
      setDescription(menuItem.description);
      setArabicDes(menuItem.description_ar);
      setMenuDes(
        menuItem.menuDescriptors
          ? getArray(
            menuItem.menuDescriptors,
            Language == "en" ? "name" : "name_ar"
          )
          : ""
      );
      setMenuIdEdit(menuItem.id);
    }
  }, [props, isFocused, Language]);

  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
    }).then((photo) => {
      if (Platform.OS == "android") {
        photo.sourceURL = photo.path;
      }
      setImageItem(photo);
    });
  };
  const onEditMenuItem = async () => {
    let menuCatJson;
    let menuDescriptorJson;

    if (Language == "en") {
      menuCatJson = getFromDataJson(
        ALL_CATEGORIES,
        MenuCategory,
        "menuCategoryIds"
      );
      menuDescriptorJson = getFromDataJson(
        DESCRIPTOR,
        MenuDes,
        "menuDescriptorsIds"
      );
    } else {
      menuCatJson = getFromDataJson(
        ALL_CATEGORIES,
        MenuCategory,
        "menuCategoryIds",
        Language
      );
      menuDescriptorJson = getFromDataJson(
        DESCRIPTOR,
        MenuDes,
        "menuDescriptorsIds",
        Language
      );
    }
    let data = {};
    if (ImageItem.sourceURL) {
      data = {
        menuId: MenuIdEdit,
        name: Name,
        name_ar: ArabicName,
        language: Language,
        description: Description,
        description_ar: ArabicDes,
        item_type: ItemType,
        ...menuCatJson,
        ...menuDescriptorJson,
        price: Number(Price),
        discount: Discount == '' ? undefined : Number(Discount),
        maxLimit: MaxLimit == '' ? undefined : Number(MaxLimit),
        image: ImageItem.sourceURL
          ? {
            uri: ImageItem.sourceURL,
            type: ImageItem.mime, // or photo.type image/jpg
            name:
              "image_" +
              moment().unix() +
              "_" +
              ImageItem.sourceURL.split("/").pop(),
          }
          : ImageItem,
      };
    } else {
      data = {
        menuId: MenuIdEdit,
        name: Name,
        name_ar: ArabicName,
        language: Language,
        description: Description,
        description_ar: ArabicDes,
        item_type: ItemType,
        ...menuCatJson,
        ...menuDescriptorJson,
        price: Number(Price),
        discount: Number(Discount),
        maxLimit: Number(MaxLimit),
      };
    }
    dispatch(EditMenuItem(data, navigation));
  };
  const validation = () => {
    if (Name.trim() !== "") {
      if (ArabicName.trim() !== "") {
        if (MenuCategory.length !== 0) {
          if (ItemType.trim() !== "") {
            if (Price.trim() !== "") {

              if (ImageItem !== "") {
                if (Description.trim() !== "") {
                  if (ArabicDes.trim() !== "") {
                    if (MenuDes.length !== 0) {
                      onEditMenuItem();
                    } else {
                      dispatchErrorAction(
                        dispatch,
                        strings(
                          "validationString.please_select_menu_descriptors"
                        )
                      );
                    }
                  } else {
                    dispatchErrorAction(
                      dispatch,
                      strings(
                        "validationString.please_enter_description_in_arabic"
                      )
                    );
                  }
                } else {
                  dispatchErrorAction(
                    dispatch,
                    strings("validationString.please enter_description")
                  );
                }
              } else {
                dispatchErrorAction(
                  dispatch,
                  strings("validationString.please_select_item_image")
                );
              }
            } else {
              dispatchErrorAction(
                dispatch,
                strings("validationString.please_enter_price")
              );
            }
          } else {
            dispatchErrorAction(
              dispatch,
              strings("validationString.please_select_item_type")
            );
          }
        } else {
          dispatchErrorAction(
            dispatch,
            strings("validationString.please_select_menu_categories")
          );
        }
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_name_in_arabic")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_name")
      );
    }
  };

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("menu_screen.edit_menu_items")}
        </Text>

        <View style={styles.rowView}>
          <View>
            <Text style={styles.titleInput}>{strings("menu_screen.name")}</Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name")}
              value={Name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.name_in_arabic")}
            </Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name_in_arabic")}
              value={ArabicName}
              onChangeText={(text) => setArabicName(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>
                {strings("menu_screen.menu_categories")}
              </Text>
              <RegistrationDropdown
                data={ALL_CATEGORIES}
                value={MenuCategory[0]}
                setData={(text) => {
                  setMenuCategory([text]);
                }}
                // multiSelect={true}
                placeholder={strings("menu_screen.categories")}
                valueField={Language == "en" ? "name" : "name_ar"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>
                {strings("menu_screen.item_type")}
              </Text>
              <RegistrationDropdown
                data={ItemTypeData}
                value={ItemType}
                setData={(text) => {
                  setItemType(text);
                }}
                placeholder={strings("menu_screen.type")}
                name
                valueField={"name"}
                labelField={Language == "en" ? "label" : "name_ar"}
                style={styles.dropdownRow}
                placeholderTextColor={Colors.black}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>
                {strings("menu_screen.price_in_AED")}
              </Text>
              <RegistrationTextInput
                keyboardType={"numeric"}
                placeholder={strings("menu_screen.enter_price")}
                value={Price}
                onChangeText={(text) => setPrice(text)}
                placeholderTextColor={Colors.black}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
              <Text style={styles.titleInput}>
                {strings("menu_screen.discount")}
              </Text>
              <RegistrationTextInput
                keyboardType={"numeric"}
                placeholder={strings("menu_screen.discount")}
                value={Discount}
                onChangeText={(text) => setDiscount(text)}
                placeholderTextColor={Colors.black}
              />
            </View>
          </View>
          <View style={{ width: (SCREEN_WIDTH - hp(6)) / 2 }}>
            <Text style={styles.titleInput}>
              {strings("menu_screen.max_Limit")}
            </Text>
            <RegistrationTextInput
              keyboardType={"numeric"}
              placeholder={strings("menu_screen.enter_price")}
              value={MaxLimit}
              onChangeText={(text) => setMaxLimit(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.image")}
            </Text>
            <TouchableOpacity
              onPress={() => openPicker()}
              style={styles.imageView}
            >
              {ImageItem == "" ? (
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../Images/Merchant/xxxhdpi/ic_attach.png")}
                    style={styles.imageVector}
                  />
                  <Text style={styles.attachText}>
                    {strings("menu_screen.lateralEntry.attach_image")}
                  </Text>
                </View>
              ) : (
                <View>
                  <Image
                    source={{
                      uri: ImageItem?.data
                        ? `data:image/jpeg;base64,${ImageItem.data}`
                        : media_url + ImageItem,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.description")}
            </Text>
            <TextInput
              value={Description}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              style={styles.textInput}
              placeholder={strings("menu_screen.description")}
              placeholderTextColor={Colors.black}
              textAlignVertical={"top"}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.descripition_in_arabic")}
            </Text>
            <TextInput
              value={ArabicDes}
              onChangeText={(text) => setArabicDes(text)}
              multiline={true}
              style={styles.textInput}
              placeholder={strings("menu_screen.descripition_in_arabic")}
              placeholderTextColor={Colors.black}
              textAlignVertical={"top"}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.menu_description")}
            </Text>
            <RegistrationDropdown
              data={DESCRIPTOR}
              value={MenuDes}
              setData={(text) => {
                setMenuDes(text);
              }}
              placeholder={strings("menu_screen.menu_description")}
              valueField={Language == "en" ? "name" : "name_ar"}
              style={styles.dropdownRow}
              multiSelect={true}
              placeholderTextColor={Colors.black}
            />
          </View>

          <PinkButton
            text={"small"}
            onPress={() => validation()}
            style={styles.dbuttonStyle}
            name={strings("menu_screen.update_menu_item")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 18, Colors.black),
    textAlign: "left",
    marginBottom: hp(1.5),
  },
  title2: {
    ...commonFontStyle(500, 16, Colors.pink),
    textAlign: "left",
    marginBottom: hp(3),
  },
  titleInput: {
    ...commonFontStyle(500, 14, Colors.pink),
    marginBottom: 10,
    marginTop: 5,
    textAlign: "left",
  },
  dbuttonStyle: {
    marginVertical: hp(3),
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
    // height: hp(6),
    height: hp(12),
    padding: hp(2),
    borderRadius: 5,
    textAlign: I18nManager.isRTL ? "right" : "left",
    // marginVertical: hp(2),
  },
  imageView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(17),
    borderColor: Colors.placeholderColor,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: hp(2),
    overflow: "hidden",
  },
  imageVector: {
    width: hp(6),
    // height: hp(6),
    height: hp(6),
    resizeMode: "contain",
  },
  image: {
    height: hp(17),
    resizeMode: "cover",
    width: SCREEN_WIDTH - hp(4),
  },
  attachText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: hp(1),
  },
});
