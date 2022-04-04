import { useState } from "react";
import { View, Text, TouchableOpacity, Switch} from "react-native";
import showInterstitialRewardedAd from "../../../constants/Ads";


const AdjustableSettings = () => {
  return (
    <View style={{flexDirection: 'row', width:'50%', justifyContent: 'center'}}>
      <TouchableOpacity style={{backgroundColor: 'lightgrey', borderRadius: 9999, aspectRatio: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>-</Text></TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 10}}>5</Text>
      <TouchableOpacity style={{backgroundColor: 'lightgrey', borderRadius: 9999, aspectRatio: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontWeight: 'bold'}}>+</Text></TouchableOpacity>
    </View>
  )
}

const IndividualLevelSetting = ({settingtext}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>             
      <Text style={{color: "#444", fontSize: 20, width: "50%"}}>{settingtext}</Text>
      <AdjustableSettings/>
    </View>
  );
}

const IndividualBooleanSetting = ({settingtext}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>             
      <Text style={{color: "#444", fontSize: 20, width: "50%"}}>{settingtext}</Text>
      <View style={{ width: "50%", flexDirection:'row', justifyContent: 'center'}}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={{
            transform:[{ scaleX: 1.6 }, { scaleY: 1.6 }]}}
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const SettingsModal = ({ setCloseModal}:{setCloseModal: any}) => {
    return (
      <>
      <View style={{position: 'absolute', zIndex: 10, height: '100%', width: '100%', backgroundColor: "rgba(0,0,0,0.2)", justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#fff', width: "80%", height: "40%", elevation: 5, borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start'}}>
            <View style={{flexGrow: 1, backgroundColor: 'transparent', padding: "5%", paddingTop: "0%", justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: "100%", justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => setCloseModal(false)} style={{display: 'flex', top: 0, backgroundColor: 'white', elevation: 5, padding: 5, aspectRatio: 1, borderRadius: 999, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text >X</Text>
              </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'space-between', alignItems: 'center', width: "80%"}}>
                <Text style={{color: "#444", fontSize: 20, fontWeight: 'bold', padding: 10, margin: 20}}>Settings</Text>
                <View style={{alignItems: 'center'}}> 
                  <IndividualLevelSetting settingtext={"Music"}/>
                  <IndividualLevelSetting settingtext={"SFX"}/>
                  <IndividualBooleanSetting settingtext={"Animation"}/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }

export default SettingsModal;