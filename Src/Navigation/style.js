import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { commonFontStyle } from "../Themes/Fonts";
import Colors from "../Themes/Colors";

export const styles = StyleSheet.create({
  headerLeftView: {
    paddingLeft: hp(2),
  },
  headerLeftImage: {
    height: 40,
    width: 40,
    borderRadius: 12,
  },
  headetTitle: {
    ...commonFontStyle(900, 24, Colors.white),
    textAlign: "center",
    marginBottom: -5,
  },
  headetTitle2: {
    ...commonFontStyle("", 9, Colors.white),
    textAlign: "center",
    marginTop: -8,
  },
  headerRightText: {
    ...commonFontStyle("", 12, Colors.white),
    textAlign: "center",
  },
  grayShortText: { ...commonFontStyle("", 10, "#b3b3b3") },
  headerRightView: {
    paddingRight: hp(2),
  },
  logo: {
    height: 40,
    width: 120,
    justifyContent: "space-between",
    resizeMode: "contain",
    marginTop: -8,
  },
  middle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
