import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "./Fonts";
export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex: 1,
    backgroundColor: Colors.registrationBackground,
    paddingHorizontal: hp(2),
  },
  mainViewWithoutPadding: {
    flex: 1,
    backgroundColor: Colors.registrationBackground,
  },
  headerRightView: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
  },
  welcomeText: {
    ...commonFontStyle("M_500", 18, Colors.pink),
    marginTop: 5,
    marginBottom: hp(3),
    textAlign: "center",
  },
  nodataStyle: {
    ...commonFontStyle("M_500", 18, Colors.placeholderColor),
    textAlign: "center",
    paddingVertical: hp(3),
  },
  modalStyle: {
    margin: 0,
    justifyContent: "flex-end",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  modalViewStyle: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    // paddingBottom: hp(3),
    maxHeight: hp(85),
  },
});
