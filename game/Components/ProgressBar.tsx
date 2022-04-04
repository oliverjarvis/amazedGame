import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, AnimationCallback } from "react-native-reanimated";


export const ProgressBar = ({ width, height }) => {

    const progress = useSharedValue(250);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
          width: progress.value,
        };
      }, []);
      
    useEffect(()=> {
    console.log(progress.value);
    progress.value = withTiming(0, {duration: 20000}, (isFinished) => {

    });
    }, [])
    
    return (
        <View style={{...style.progressBarOuter, width: width, height: height }}>
            <Animated.View style={[{...style.progressBarFill, height: height }, reanimatedStyle]}>
            </Animated.View>
        </View>
    );
}

let style = StyleSheet.create({
    progressBarOuter: {
        backgroundColor: "#FFE6E8",
        borderRadius: 9999,
        justifyContent: "flex-start",
        overflow: 'hidden'
    },
    progressBarFill: {
        backgroundColor: "#E33D56",
        flexDirection: "row",
        justifyContent: "center",
    }
});