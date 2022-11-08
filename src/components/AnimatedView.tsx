import React from 'react';

import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import {MotiView} from "moti";


interface viewProps{
    style: ViewStyle,
    children:JSX.Element
}

const AnimatedView = ({style, children}:viewProps) => {
    return (
        <MotiView  from={{
            opacity: 0,
            translateY: 30,
        }}
                   transition={{

                       type: 'timing',
                       duration: 250,
                       delay: 200,
                   }}
                   animate={{
                       opacity: 1,
                       translateY: 0,

                   }}
                   exit={{
                       opacity: 0,
                       translateY: -30,
                   }} style={style}>
            {children}

        </MotiView>
    );
};
const styles = StyleSheet.create({});

export default AnimatedView;
