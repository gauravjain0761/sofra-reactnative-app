import { View, Text, Dimensions, StyleSheet } from "react-native";
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
  const [Data, setData] = useState([]);
  const [Xaxis, setXaxis] = useState([]);
  const [DomainValue, setDomainValue] = useState([]);
  useEffect(() => {
    let Data = [];
    let Xaxis = x;
    let DomainValue = [0, 0];

    value.forEach((element, index) => {
      if (DomainValue[1] < Number(element)) {
        DomainValue[1] = Number(element);
      }
      let a = { x: x[index], y: Number(element) };
      Data.push(a);
    });
    DomainValue[1] = DomainValue[1] + (15 / 100) * DomainValue[1];
    console.log(Data, DomainValue);
    setData(Data);
    setXaxis(Xaxis);
    setDomainValue(DomainValue);
  }, []);

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
        <Text style={styles.totalText}>AED {totalData}</Text>
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
{
  /* <VictoryChart
height={SCREEN_WIDTH - hp(18)}
// width={SCREEN_WIDTH - hp(4)}
theme={VictoryTheme.material}
// domain={{ y: DomainValue }}
// domainPadding={{ x: 25, y: 0 }}
>
<VictoryAxis
  style={{
    axis: { stroke: "transparent" },
    ticks: { stroke: "transparent" },
    tickLabels: { fill: "transparent" },
  }}
/>

<VictoryArea
  style={{
    data: {
      fill: Colors.pink,
      fillOpacity: 0.2,
      stroke: Colors.pink,
      strokeWidth: 3,
    },
    labels: {
      fontSize: 15,
      ...commonFontStyle("M_700", 14, Colors.pink),
      fill: ({ datum }) => (datum.x === 3 ? "#000000" : Colors.black),
    },
  }}
  categories={{ x: Xaxis }}
  data={Data}
  labels={({ datum }) => datum.y}
/>
<VictoryLine interpolation="natural" data={Data} />
<VictoryScatter
  data={Data}
  size={5}
  style={{ data: { fill: Colors.pink } }}
/>
</VictoryChart> */
}
