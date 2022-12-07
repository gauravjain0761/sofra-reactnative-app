export function getFontType(fontWeight) {
  if (fontWeight == 300) {
    return "Tofino-Light";
  } else if (fontWeight == 400) {
    return "Tofino-Regular";
  } else if (fontWeight == 500) {
    return "Tofino-Medium";
  } else if (fontWeight == 600) {
    return "Tofino-Semibold";
  } else if (fontWeight == 700) {
    return "Tofino-Bold";
  } else if (fontWeight == "M_300") {
    return "Montserrat-Light";
  } else if (fontWeight == "M_400") {
    return "Montserrat-Regular";
  } else if (fontWeight == "M_500") {
    return "Montserrat-Medium";
  } else if (fontWeight == "M_600") {
    return "Montserrat-Semibold";
  } else if (fontWeight == "M_700") {
    return "Montserrat-Bold";
  } else if (fontWeight == "extraBold") {
    return "Montserrat-Black";
  } else {
    return "Montserrat-Regular";
  }
}

export function commonFontStyle(fontWeight, fontSize, color) {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: actuatedNormalize(fontSize - 2),
    color: color,
    includeFontPadding: false,
  };
}

import { Dimensions, Platform, PixelRatio } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
