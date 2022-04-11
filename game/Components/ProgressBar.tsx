import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { withPause } from "react-native-redash";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, AnimationCallback, runOnJS } from "react-native-reanimated";


export const ProgressBar = ({ duration, width, height, isPaused, callback }: {duration: number, width: string, height: number, isPaused: boolean, callback: any}) => {

    const progress = useSharedValue(100);

    const paused = useSharedValue(false);

    useEffect(()=>{
        paused.value = isPaused;
    }, [isPaused]);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
          width: `${progress.value}%`,
        };
      }, []);
      
    useEffect(()=> {
    progress.value = withPause(withTiming(0, {duration: duration}, (isFinished) => {
        runOnJS(callback)();
    }), paused);

    return () => { progress.value = 0 };
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