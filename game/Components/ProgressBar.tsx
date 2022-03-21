import { StyleSheet, View } from "react-native";

export const ProgressBar = ({ progress, width, height }) => {

    let fillLevel = progress * width;
    return (
        <View style={{...style.progressBarOuter, width: width, height: height }}>
            <View style={{...style.progressBarFill, width: fillLevel, height: height }}>
                <View style={style.progressBarFillHighlight} />
            </View>
        </View>
    );
}

let style = StyleSheet.create({
    progressBarOuter: {
        backgroundColor: "#FFE6E8",
        borderRadius: 9999,
        justifyContent: "flex-start",
    },
    progressBarFill: {
        backgroundColor: "#E33D56",
        borderRadius: 9999,
        flexDirection: "row",
        justifyContent: "center",
    },
    progressBarFillHighlight: {
        backgroundColor: "#F2A6B1",
        borderRadius: 9999,
        top: "1.5%",
        height: "38%",
        width: "80%",
    }
});