import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      //flexBasis: "46%",
      height: "45%",
      padding: "3%",
      //marginBottom: "1%",
      aspectRatio: 1,
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 15,
      bottom: 0,
      zIndex: 2,
    },
    horizontalArrow: {
      width: "3.33%", 
      margin:"1%", 
      aspectRatio: 10/17,
      flexShrink: 1,
      zIndex: 2,
    },
    verticalArrow:{
      height: "100%", 
      aspectRatio: 15/12,
      flexShrink: 1,
    },
    verticalArrowContainer:{
      width:"21%", 
      marginVertical:'0.75%', 
      height: "3.83%", 
      alignItems:'center', 
      flexShrink: 1
    }
  });

  export default styles;