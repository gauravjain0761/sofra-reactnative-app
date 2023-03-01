import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
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
import {
  AddMenuItem,
  DeleteMenuItem,
  enableDisableMenues,
  getMenuCategories,
  getMenuDescriptors,
  getMenuItems,
} from "../../Services/MerchantApi";
import { ItemTypeData } from "../../Config/StaticDropdownData";
import moment from "moment";
import { strings } from "../../Config/I18n";
import { getLanguage } from "../../Services/asyncStorage";

export default function M_MenuItemScreen({ navigation }) {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [ArabicName, setArabicName] = useState("");
  const [MenuCategory, setMenuCategory] = useState("");
  const [ItemType, setItemType] = useState("");
  const [Price, setPrice] = useState("");
  const [Discount, setDiscount] = useState("");
  const [MaxLimit, setMaxLimit] = useState("");
  const [ImageItem, setImageItem] = useState("");
  const [Description, setDescription] = useState("");
  const [ArabicDes, setArabicDes] = useState("");
  const [MenuDes, setMenuDes] = useState("");
  const MENU_ITEMS = useSelector((e) => e.merchant.menuItems);
  const ALL_CATEGORIES = useSelector((e) => e.merchant.menuCategories);
  const DESCRIPTOR = useSelector((e) => e.merchant.descriptor);
  useEffect(() => {
    // dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getMenuItems());
      dispatch(getMenuCategories());
      dispatch(getMenuDescriptors());
    });
  }, []);
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
  const onAddMenuItem = async () => {
    let menuCatJson = getFromDataJson(
      ALL_CATEGORIES,
      MenuCategory,
      "menuCategoryIds"
    );
    let menuDescriptorJson = getFromDataJson(
      DESCRIPTOR,
      MenuDes,
      "menuDescriptorsIds"
    );
    let lang = await getLanguage();
    let data = {
      name: Name,
      name_ar: ArabicName,
      language: lang,
      description: Description,
      description_ar: ArabicDes,
      item_type: ItemType,
      ...menuCatJson,
      ...menuDescriptorJson,
      price: Number(Price),
      discount: Number(Discount),
      maxLimit: Number(MaxLimit),
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
        : undefined,
    };
    dispatch(
      AddMenuItem(data, () => {
        setName("");
        setArabicName("");
        setMenuCategory("");
        setItemType("");
        setPrice("");
        setDiscount("");
        setMaxLimit("");
        setImageItem("");
        setDescription("");
        setArabicDes("");
        setMenuDes("");
      })
    );
  };
  const validation = () => {
    if (Name.trim() !== "") {
      if (ArabicName.trim() !== "") {
        if (MenuCategory.length !== 0) {
          if (ItemType.trim() !== "") {
            if (Price.trim() !== "") {
              if (Discount.trim() !== "") {
                if (MaxLimit.trim() !== "") {
                  if (ImageItem !== "") {
                    if (Description.trim() !== "") {
                      if (ArabicDes.trim() !== "") {
                        if (MenuDes.length !== 0) {
                          onAddMenuItem();
                        } else {
                          dispatchErrorAction(
                            dispatch,
                            "Please select menu descriptors"
                          );
                        }
                      } else {
                        dispatchErrorAction(
                          dispatch,
                          "Please enter Description in arabic"
                        );
                      }
                    } else {
                      dispatchErrorAction(dispatch, "Please enter Description");
                    }
                  } else {
                    dispatchErrorAction(dispatch, "Please select item image");
                  }
                } else {
                  dispatchErrorAction(dispatch, "Please enter max limit");
                }
              } else {
                dispatchErrorAction(dispatch, "Please enter Discount");
              }
            } else {
              dispatchErrorAction(dispatch, "Please enter price");
            }
          } else {
            dispatchErrorAction(dispatch, "Please select item type");
          }
        } else {
          dispatchErrorAction(dispatch, "Please select menu categories");
        }
      } else {
        dispatchErrorAction(dispatch, "Please enter name in arabic");
      }
    } else {
      dispatchErrorAction(dispatch, "Please enter name");
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

  const renderItem = ({ item, index }) => (
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
      onChangeStatus={() => onChangeStatus(item.id, item.status)}
    />
  );
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>Menu Items</Text>
        {MENU_ITEMS.length !== 0 && (
          <FlatList
            horizontal={true}
            data={MENU_ITEMS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        <View style={styles.rowView}>
          <Text style={styles.title}>
            {strings("menu_screen.add_menu_items")}
          </Text>
          <Text style={styles.title2}>
            {strings("menu_screen.menu_items_details")}
          </Text>
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
                valueField={"name"}
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
                valueField={"name"}
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
              placeholder={strings("menu_screen.enter_price")}
              value={MaxLimit}
              keyboardType={"numeric"}
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
                      uri: `data:image/jpeg;base64,${ImageItem.data}`,
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
              placeholder={strings("menu_screen.description")}
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
              multiSelect={true}
              placeholder={strings("menu_screen.menu_description")}
              valueField={"name"}
              style={styles.dropdownRow}
              placeholderTextColor={Colors.black}
            />
          </View>
          <PinkButton
            text={"small"}
            onPress={() => validation()}
            style={styles.dbuttonStyle}
            name={strings("menu_screen.Submit")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(600, 18, Colors.black),

    marginBottom: hp(1.5),
  },
  title2: { ...commonFontStyle(500, 16, Colors.pink), marginBottom: hp(3) },
  titleInput: {
    ...commonFontStyle(500, 14, Colors.pink),
    marginBottom: 10,
    marginTop: 5,
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
