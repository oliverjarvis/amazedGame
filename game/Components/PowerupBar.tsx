import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const Button = ({icon, text, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.insetStyle}>
        <View style={styles.outsetStyle}>
          <Text style={{fontSize: 14,  fontWeight:'bold', textAlign: 'center', padding:2, textAlignVertical:"center", color: '#444'}}>{ icon }</Text>
          <Text style={{fontSize: 14,  fontWeight:'bold', textAlign: 'center', padding:2, textAlignVertical:"center", color: '#444'}}>{ text }</Text>
        </View>
      </TouchableOpacity>
      );
}

export const HintPowerup = ({onPress}) => {
  return <Button onPress={onPress} icon="💡" text="Hint"/>; 
}

export const SkipPowerup = ({onPress}) => {
  return <Button onPress={onPress} icon="💣" text="Skip"/>; 
}

let styles = StyleSheet.create({
  insetStyle:{
    flexShrink:1,
    aspectRatio: 1,
    alignContent: "center",
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: '#A88600',
  },
  outsetStyle:{
    width: "100%",
    height: '92%',
    padding: "2.5%",
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
  },
});
