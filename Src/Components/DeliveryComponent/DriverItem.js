import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from "react-native";
import ApplicationStyles from "../../Themes/ApplicationStyles";
import { commonFontStyle } from "../../Themes/Fonts";
import Colors from "../../Themes/Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function DriverItem({ item, index }) {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 4, paddingVertical: 4, borderBottomWidth: 0.7, borderColor: Colors.darkGrey }} >
            <View style={{ flex: 0.2 }} >
                <Image
                    style={{ height: hp(9), width: wp(16), borderRadius: 30 }}
                    source={{ uri: "https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-red-cloth-holding-box-package-isolated-grey-studio-background-copy-space_1258-1260.jpg?w=2000" }}

                />
            </View>
            <View style={{ flex: 0.8 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View>
                        <Text style={styles.nameText} >Mudasir Mushthqi</Text>
                        <Text style={styles.mailText} >mudasir@gmail.com</Text>
                        <Text style={styles.mailText} >+971 564 455 333</Text>
                    </View>
                    <View>
                        <Text style={styles.statusText} >Available</Text>
                    </View>
                </View>
                <View style={styles.cardBotomBtn}>
                    <TouchableOpacity onPress={() => onEdit()} style={styles.addMenuButton}>
                        <Image
                            style={styles.menuIconButton}
                            source={require("../../Images/Merchant/xxxhdpi/edit.png")}
                        />
                        <Text style={styles.addButton}>Edit</Text>
                    </TouchableOpacity>

                    <View style={{}}>
                        <TouchableOpacity
                            style={[
                                styles.addMenuButton,
                                {
                                    backgroundColor: Colors.green,
                                },
                            ]}
                        >
                            <Image
                                style={styles.menuIconButton}
                                source={require("../../Images/Merchant/xxxhdpi/ic_tick.png")}
                            />
                            <Text style={styles.addButton}>Active</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.addMenuButton,
                            {
                                backgroundColor: Colors.grayButtonBackground,
                            },
                        ]}
                    >
                        <Image
                            style={styles.menuIconButton}
                            source={require("../../Images/Merchant/xxxhdpi/delete.png")}
                        />
                        <Text style={styles.addButton}>Delete</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({


    nameText: {
        ...commonFontStyle(700, 14, Colors.black),
    },
    mailText: {
        ...commonFontStyle(400, 14, Colors.darkGrey),
    },
    statusText: {
        ...commonFontStyle(700, 14, Colors.pink),
    },
    cardBotomBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(2.5),
    },
    addMenuButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: hp(1.3),
        paddingVertical: hp(1.3),
        backgroundColor: Colors.pink,
        marginTop: hp(2),
        marginRight: hp(3),
        borderRadius: 5,
    },
    menuIconButton: {
        height: hp(1.8),
        width: hp(1.8),
        resizeMode: "contain",
        tintColor: Colors.white,
        marginRight: 5,
    },
    addButton: {
        ...commonFontStyle("M_600", 11, Colors.white),
    },

});
