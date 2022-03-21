import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { globalContext } from '../game/GlobalState';
import { useContext, useReducer } from 'react';

export default function LevelSelector({ navigation }) {
  let level_count = 10;

  const { state } = useContext(globalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level Selector</Text>
      <Text style={styles.title}>Stars: {state.total_stars}</Text>
      <View style={styles.level_container}>
        {Array(level_count).fill(0).map((_, i) => (
          <TouchableOpacity onPress={ () => navigation.navigate('GameScreen', {level_id: i+1})} key={i} style={styles.square}>
            <Text style={{textAlign:'center', textAlignVertical:'center'}}>{i+1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width:'100%',
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  level_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  title: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
  },
  square: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 5,
    justifyContent:"center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
