import React, {useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../helpers/normalize";
import {RootStackScreenProps} from "../../types";
import Colors from "../constants/Colors";
import {Feather, Ionicons, Octicons} from "@expo/vector-icons";
import {MyButton} from "../components/MyButton";
import {Fonts} from "../constants/Fonts";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {decrementQuantity, incrementQuantity} from "../app/slices/dataSlice";

const ViewItem = ({route, navigation}: RootStackScreenProps<'ViewItem'>) => {
    const dispatch = useAppDispatch()
    const {item} = route.params

    const [sizeId, setSizeId] = useState('');
    const goBack = () => {
        navigation.goBack()
    }

    const dataSlice = useAppSelector(state => state.appdata)
    const {cart} =dataSlice

const increase = () => {
  dispatch(incrementQuantity(item.idMeal))
}
const decrease = () => {
  dispatch(decrementQuantity(item.idMeal))
}
    const select = (id: string) => {
        setSizeId(id)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                        showsVerticalScrollIndicator={false}


            >
                <View style={styles.header}>
                    <View style={styles.nav}>
                        <TouchableOpacity onPress={goBack} activeOpacity={0.8} style={styles.backBtn}>
                            <Octicons name="chevron-left" size={24} color="#fff"/>
                        </TouchableOpacity>

                        <Ionicons name="md-heart-outline" size={24} color="#fff"/>
                    </View>
                </View>

                <View style={styles.bodyDetails}>
                    <View style={styles.BigImage}>
                        <Image
                            style={[styles.itemImage, {}]}
                            source={{uri: item.strMealThumb, cache: 'only-if-cached'}}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.title}>
                            {item.strMeal}
                        </Text>
                        <View style={styles.category}>
                            <View style={styles.pizza}>

                            </View>
                            <Text style={styles.categoryText}>
                                Pizza italiano
                            </Text>
                        </View>

                        <View style={styles.otherDetails}>
                            <View style={styles.otherDetailsTime}>

                                <Ionicons name="ios-time-outline" size={18} color="black"/>
                                <Text style={[styles.text, {}]}>
                                    15 Min
                                </Text>

                            </View>
                            <Octicons name="dot-fill" size={9} color={Colors.greyText}/>
                            <View style={styles.otherDetailsReviews}>

                                <Octicons name="star-fill" size={16} color={"#E8B53E"}/>
                                <Text style={[styles.text, {}]}>
                                    4.8
                                </Text>
                                <Text style={[styles.text, {
                                    color: Colors.greyText,
                                    // marginHorizontal:pixelSizeHorizontal(10),
                                }]}>
                                    (2.2k reviews)
                                </Text>
                                <Octicons name="chevron-right" size={14} color={Colors.greyText}/>
                            </View>
                        </View>


                        <View style={styles.sizeRadio}>


                            <TouchableOpacity onPress={() => select("1")} activeOpacity={0.9} style={[styles.radioBox, {
                                borderColor: sizeId === '1' ? Colors.secondary : Colors.borderColor,
                            }]}>
                                {sizeId === '1' ?
                                    <Ionicons name="ios-radio-button-on-sharp" size={18} color={Colors.secondary}/>
                                    :
                                    <Ionicons name="md-radio-button-off" size={18} color={Colors.greyText}/>

                                }

                                <Text style={styles.tinyText}>
                                    Small 8"
                                </Text>
                                <Text style={[styles.text, {
                                    fontFamily: Fonts.faktumSemiBold,
                                    fontSize: fontPixel(14)
                                }]}>
                                    $ 99.9
                                </Text>

                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => select("2")} activeOpacity={0.9} style={[styles.radioBox, {
                                borderColor: sizeId === '2' ? Colors.secondary : Colors.borderColor,
                            }]}>
                                {sizeId === '2' ?
                                    <Ionicons name="ios-radio-button-on-sharp" size={18} color={Colors.secondary}/>
                                    :
                                    <Ionicons name="md-radio-button-off" size={18} color={Colors.greyText}/>

                                }

                                <Text style={styles.tinyText}>
                                    Medium 12"
                                </Text>
                                <Text style={[styles.text, {
                                    fontFamily: Fonts.faktumSemiBold,
                                    fontSize: fontPixel(14)
                                }]}>
                                    $ 12.99
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => select("3")} activeOpacity={0.9} style={[styles.radioBox, {
                                borderColor: sizeId === '3' ? Colors.secondary : Colors.borderColor,
                            }]}>
                                {sizeId === '3' ?
                                    <Ionicons name="ios-radio-button-on-sharp" size={18} color={Colors.secondary}/>
                                    :
                                    <Ionicons name="md-radio-button-off" size={18} color={Colors.greyText}/>

                                }
                                <Text style={styles.tinyText}>
                                    Large 18"
                                </Text>
                                <Text style={[styles.text, {
                                    fontFamily: Fonts.faktumSemiBold,
                                    fontSize: fontPixel(14)
                                }]}>
                                    $ 16.99
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.description}>
                            <Text style={styles.descriptionTxt}>
                                Melting cheese pizza making with extra virgin olive oil, cornmeal, beef/chicken, Tomato
                                sauce (smooth or pureed), Firm mozza, 100 gm onion 70 gm chopped capsicum
                            </Text>
                        </View>

                        <View style={styles.bottomPrice}>
                            <Text style={styles.totalText}>
                                Total: <Text style={{color: Colors.secondary}}>$</Text>12.99
                            </Text>

                            <View style={styles.quantityBtnWrap}>
                                <TouchableOpacity onPress={decrease} activeOpacity={0.9} style={styles.quantityBtn}>
                                    <Feather name="minus" size={20} color={Colors.tintText}/>
                                </TouchableOpacity>
                                <Text style={styles.totalText}>
                                    {cart.filter(c => c.id === item.idMeal)[0].quantity}
                                </Text>
                                <TouchableOpacity onPress={increase} activeOpacity={0.9} style={styles.quantityBtn}>
                                    <Ionicons name="add" size={20} color={Colors.tintText}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <MyButton style={styles.nextBtn}>
                <Text style={styles.nextBtnText}>
                    Next
                </Text>
            </MyButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',

    },
    scrollView: {
        backgroundColor: "white",
        width: '100%',

    },
    header: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',
        height: heightPixel(200),
        backgroundColor: Colors.secondary,
        alignItems: 'center'
    },
    nav: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: heightPixel(80),
        justifyContent: 'space-between',
    },
    backBtn: {
        height: heightPixel(35),
        width: widthPixel(35),
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyDetails: {
        position: 'relative',
        top: -40,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',

        minHeight: heightPixel(700),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    BigImage: {
        top: -70,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 7.22,
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#EBD0BE",
        position: 'absolute',
        width: widthPixel(180),
        height: heightPixel(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300
    },
    itemImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 300,
    },
    nextBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: '90%',
        height: heightPixel(56),
        backgroundColor: Colors.secondary,
        bottom: 20,
    },
    nextBtnText: {
        color: "#fff",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    details: {
        alignItems: 'center',
        width: '100%',
        top: 10,
        justifyContent: 'space-evenly',

        height: heightPixel(450),
        position: 'relative',

    },
    title: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark
    },
    category: {
        width: "80%",
        height: heightPixel(60),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    pizza: {
        width: 25,
        height: 25,
        backgroundColor: "#FEF6E3",
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    categoryText: {
        marginLeft: 5,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.greyText
    },
    otherDetails: {
        width: widthPixel(310),
        height: heightPixel(50),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row"
    },
    otherDetailsTime: {
        width: '25%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",

    },
    otherDetailsReviews: {
        width: '60%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",

    },
    text: {
        marginLeft: 5,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: Colors.textDark
    },
    sizeRadio: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: heightPixel(130),

    },
    radioBox: {
        width: 100,
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,

        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: heightPixel(120),
    },
    tinyText: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    description: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: 10,
        height: 100,

    },
    descriptionTxt: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText,
        textAlign: 'center',
        lineHeight: heightPixel(20)
    },
    bottomPrice: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 60
    },
    totalText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.textDark
    },
    quantityBtnWrap: {
        width: widthPixel(130),
        height: '80%',
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-evenly',

    },
    quantityBtn: {
        width: 30,
        height: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ViewItem;
