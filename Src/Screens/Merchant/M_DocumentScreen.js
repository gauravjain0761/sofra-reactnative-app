import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RegistrationDropdown from "../../Components/RegistrationDropdown";
import { Dropdown } from "react-native-element-dropdown";
import PinkButton from "../../Components/PinkButton";
import CheckBox from "@react-native-community/checkbox";

export default function M_DocumentScreen() {
  const [document, setdocument] = useState("");

  const openPicker = () => {};

  return (
    <View style={ApplicationStyles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Documents</Text>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => openPicker()}
              style={styles.imageView}
            >
              {document == "" ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.uploadText}>Upload Files Here</Text>
                  <Image
                    source={require("../../Images/Merchant/xxxhdpi/ic_doc.png")}
                    style={styles.imageVector}
                  />
                  <Text style={styles.attachText}>Choose File Here..</Text>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </View>
          {[0, 1, 2, 3, 45, 6, 7, 8, 9].map((item, index) => {
            return (
              <View style={styles.row}>
                <View style={styles.innerRow}>
                  <Image
                    source={require("../../Images/Merchant/xxxhdpi/ic_doc_color.png")}
                    style={styles.docImage}
                  />
                  <Text numberOfLines={1} style={styles.docNmae}>
                    35435454645_76
                  </Text>
                </View>
                <View style={styles.innerRow2}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../Images/Merchant/xxxhdpi/ic_download.png")}
                      style={[styles.docImage, { marginRight: hp(1) }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../../Images/Merchant/xxxhdpi/ic_remove.png")}
                      style={styles.docImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <PinkButton
        onPress={() => {}}
        style={styles.dbuttonStyle}
        text={"small"}
        name={"Upload"}
      />
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
  imageView: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(20),
    borderColor: Colors.placeholderColor,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: hp(2),
    overflow: "hidden",
  },
  imageVector: {
    width: hp(8),
    height: hp(8),
    resizeMode: "contain",
  },
  docImage: {
    width: hp(4),
    height: hp(4),
    resizeMode: "contain",
  },
  attachText: {
    ...commonFontStyle(400, 12, Colors.darkGrey),
    marginTop: hp(1.5),
  },
  uploadText: {
    ...commonFontStyle(700, 14, Colors.darkGrey),
    marginBottom: hp(1.5),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    marginBottom: hp(1.5),
    borderRadius: 8,
    padding: hp(1.5),
    alignItems: "center",
  },
  innerRow: {
    alignItems: "center",
    flexDirection: "row",
    width: "73%",
  },
  innerRow2: {
    alignItems: "center",
    flexDirection: "row",
  },
  docNmae: {
    ...commonFontStyle(500, 14, Colors.black),
    width: "70%",
    marginLeft: hp(1.5),
  },
  dbuttonStyle: {
    marginBottom: hp(3),
  },
});
