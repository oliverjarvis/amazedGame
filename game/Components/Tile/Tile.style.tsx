import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tileImage:{
      height: '100%',
      aspectRatio: 1,
      zIndex: 2,
    },
    outer:{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: "center",
      margin: -0.05,
      flexBasis: '21%',
      aspectRatio: 1,
      flexShrink: 1,
      zIndex: 3,
    },
    outset:{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      zIndex: 2,
    },
    outsetCompleted:{
      backgroundColor: '#FFCC00',
      zIndex: 2,

    },
    outsetOpen:{
      backgroundColor: '#65C877',
      zIndex: 2,

    },
    outsetSelected:{
      backgroundColor: '#21712F',
      zIndex: 2,

    },
    outsetBlank:{
      backgroundColor: 'transparent',
      zIndex: 2,

    },
    inset:{
      alignContent: "center",
      zIndex: 2,

      width: '100%',
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: 'flex-start'
    },
    insetCompleted:{
      backgroundColor: '#A88600',
      zIndex: 2,

    },
    insetBlank:{
      backgroundColor: 'transparent',
      zIndex: 2,

    },
    insetOpen:{
      backgroundColor: '#21712F',
      zIndex: 2,

    },
    insetSelected:{
      backgroundColor: '#214422',
      zIndex: 2,

    },
    endGoal:{
      position: 'relative',
      height: '90%',
      aspectRatio: 1,
      zIndex: 2,

    },
    buttonText:{
      width: '100%',
      padding: 6,
      zIndex: 3,
      fontSize: 17,
      backgroundColor: 'transparent',
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#444'
    },
  });

  export default styles;