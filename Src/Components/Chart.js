import { View, Text, Dimensions, StyleSheet, I18nManager } from "react-native";
import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  Background,
  VictoryArea,
  VictoryGroup,
  VictoryAxis,
} from "victory-native";
import { useState } from "react";
import { useEffect } from "react";
import Colors from "../Themes/Colors";
import { commonFontStyle, SCREEN_WIDTH } from "../Themes/Fonts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LineChart } from "react-native-chart-kit";

export default function Chart({ name, x, totalData, value }) {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        width: SCREEN_WIDTH - hp(4),
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: hp(2),
      }}
    >
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{name}</Text>
        {name == "Orders Delivered" ? (
          <Text style={styles.totalText}>{totalData}</Text>
        ) : (
          <Text style={styles.totalText}>
            {I18nManager.isRTL? `${totalData} AED` :`AED ${totalData}`}
            </Text>
        )}
      </View>
      <LineChart
        width={Dimensions.get("screen").width + 28}
        data={{
          datasets: [
            {
              data: value,
            },
          ],
        }}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        height={100}
        chartConfig={{
          fillShadowGradientFrom: Colors.pink,
          fillShadowGradientTo: Colors.white,
          fillShadowGradientFromOpacity: 8,
          backgroundColor: Colors.pink,
          backgroundGradientFrom: Colors.white,
          backgroundGradientTo: Colors.white,
          color: (opacity = 1) => Colors.pink,
          labelColor: (opacity = 1) => Colors.pink,
          propsForDots: {
            r: "0",
            strokeWidth: "2",
            stroke: Colors.pink,
          },
        }}
        bezier
        style={{
          paddingRight: 0,
          paddingLeft: 0,
          marginRight: 0,
          marginLeft: 0,
        }}
        fromZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    paddingHorizontal: hp(1.5),
    paddingTop: hp(1),
    // marginBottom: -30,
  },
  titleText: {
    ...commonFontStyle("M_500", 14, Colors.darkGrey),
    paddingBottom: 3,
  },
  totalText: {
    ...commonFontStyle("M_700", 15, Colors.pink),
  },
});
