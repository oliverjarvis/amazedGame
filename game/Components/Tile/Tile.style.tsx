import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tileImage:{
      height: '100%',
      aspectRatio: 1,
      zIndex: 99999,
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
      zIndex: 99999,
    },
    outset:{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      zIndex: 99999,
    },
    outsetCompleted:{
      backgroundColor: '#FFCC00',
      zIndex: 99999,

    },
    outsetOpen:{
      backgroundColor: '#65C877',
      zIndex: 99999,

    },
    outsetSelected:{
      backgroundColor: '#21712F',
      zIndex: 99999,

    },
    outsetBlank:{
      backgroundColor: 'transparent',
      zIndex: 99999,

    },
    inset:{
      alignContent: "center",
      zIndex: 99999,

      width: '100%',
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: 'flex-start'
    },
    insetCompleted:{
      backgroundColor: '#A88600',
      zIndex: 99999,

    },
    insetBlank:{
      backgroundColor: 'transparent',
      zIndex: 99999,

    },
    insetOpen:{
      backgroundColor: '#21712F',
      zIndex: 99999,

    },
    insetSelected:{
      backgroundColor: '#214422',
      zIndex: 99999,

    },
    endGoal:{
      position: 'relative',
      height: '90%',
      aspectRatio: 1,
      zIndex: 99999,

    },
    buttonText:{
      width: '100%',
      padding: 6,
      zIndex: 999999,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#444'
    },
  });

  export default styles;