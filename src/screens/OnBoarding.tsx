import React, {useCallback} from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackScreenProps} from "../../types";
import OnboardScreen from "../components/onBoarding";

import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../helpers/normalize";
import {MyButton} from "../components/MyButton";
import Colors from "../constants/Colors";
import {Fonts} from "../constants/Fonts";

import Logo from "../assets/svgs/Logo";


const OnBoardingScreen = ({navigation}: RootStackScreenProps<'OnBoarding'>) => {
    const start = () => {
navigation.navigate("HomeScreen")
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>

                <Logo/>
            </View>

            <OnboardScreen/>

            <View style={styles.bottom}>

                <MyButton onPress={start} style={[styles.buttonSignUp, {

                    backgroundColor: Colors.primary
                }]}>
                    <Text style={styles.btnText}>Login</Text>
                </MyButton>
                <MyButton style={[styles.buttonSignUp, {
                    borderWidth: 1,
                    borderColor: Colors.greyText
                }]}>
                    <Text style={styles.btnText}>Register</Text>
                </MyButton>


            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#000'
    },

    logo: {
        height: heightPixel(35),
        resizeMode: 'contain',
        width: widthPixel(180)
    },
    bottom: {
        height: heightPixel(150),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    btnText: {
        color: "#fff",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    buttonText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
    },
    buttonSignUp: {
        flexDirection: 'row',
        alignItems: 'center',

        width: widthPixel(180),
        justifyContent: 'center',
        height: heightPixel(56),
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        borderTopStartRadius: 8,
    },
    logoContainer: {
        height: heightPixel(100),
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    }
})
export default OnBoardingScreen;
