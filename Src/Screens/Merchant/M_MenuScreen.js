import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  I18nManager,
} from "react-native";
import React, { useState, useEffect } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import RegistrationTextInput from "../../Components/RegistrationTextInput";
import PinkButton from "../../Components/PinkButton";
import MenuScreenItems from "../../Components/MenuScreenItems";
import {
  dispatchErrorAction,
  hasArabicCharacters,
} from "../../Services/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  AddMenuCategory,
  DeleteMenuCategory,
  getMenuCategories,
} from "../../Services/MerchantApi";
import DeleteModal from "../../Components/DeleteModal";
import { strings } from "../../Config/I18n";
export default function M_MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [name, setname] = useState("");
  const [nameArabic, setnameArabic] = useState("");
  const [deleteModalVisible, setdeleteModalVisible] = useState(false);
  const ALL_CATEGORIES = useSelector((e) => e.merchant.menuCategories);
  const PRELOADER = useSelector((e) => e.merchant.preLoader);

  useEffect(() => {
    dispatch({ type: "PRE_LOADER", payload: true });
    navigation.addListener("focus", () => {
      dispatch(getMenuCategories());
    });
  }, []);

  const onAddCategory = () => {
    if (name.trim() !== "") {
      if (nameArabic.trim() !== "") {
        let data = {
          name: name,
          name_ar: nameArabic,
        };
        dispatch(
          AddMenuCategory(data, () => {
            setname(""), setnameArabic("");
          })
        );
      } else {
        dispatchErrorAction(
          dispatch,
          strings("validationString.please_enter_name_in_arabic")
        );
      }
    } else {
      dispatchErrorAction(
        dispatch,
        strings("validationString.please_enter_category_name")
      );
    }
  };
  const onDeleteCategory = (id) => {
    dispatch({
      type: "DELETE_MODAL",
      payload: {
        isVisible: true,
        onDelete: () => {
          let data = { categoryId: id };
          dispatch(DeleteMenuCategory(data));
        },
      },
    });
  };
  const renderItem = ({ item, index }) => (
    <View key={index}>
      <MenuScreenItems
        onEdit={() => navigation.navigate("M_EditCategoryScreen", item)}
        onDelete={() => {
          onDeleteCategory(item.id);
        }}
        item={item}
        activeVisible={false}
        screen={"category"}
      />
    </View>
  );
  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={ApplicationStyles.welcomeText}>
          {strings("menu_screen.menu_categories")}
        </Text>
        <FlatList
          style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}
          horizontal={true}
          data={ALL_CATEGORIES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.rowView}>
          <Text style={styles.title}>
            {strings("menu_screen.add_menu_categories")}
          </Text>
          <Text style={styles.title2}>
            {strings("menu_screen.menu_categories_details")}
          </Text>
          <View>
            <Text style={styles.titleInput}>{strings("menu_screen.name")}</Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name")}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View>
            <Text style={styles.titleInput}>
              {strings("menu_screen.name_in_arabic")}
            </Text>
            <RegistrationTextInput
              placeholder={strings("menu_screen.enter_name_in_arabic")}
              value={nameArabic}
              onChangeText={(text) => setnameArabic(text)}
            />
          </View>

          <PinkButton
            text={"small"}
            onPress={() => onAddCategory()}
            style={styles.dbuttonStyle}
            name={strings("menu_screen.add_categories")}
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
    ...commonFontStyle(500, 14, Colors.black),
    marginBottom: 10,
  },
  dbuttonStyle: {
    marginVertical: hp(3),
  },
});
