import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, TouchableWithoutFeedback} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import showInterstitialRewardedAd from "../../../constants/Ads";
import { changeMusicVolAsync, changeSFXVolAsync } from "../../../soundmanager";
import { Modal, ModalContent, ModalHeader, ModalQuit } from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { decreaseMusic, decreaseSFX, increaseMusic, increaseSFX } from "../../../redux/actions";

let QuitButton = require("../../../assets/images/quitbutton.png");
let plusButton = require("../../../assets/images/plus.png");
let minusButton = require("../../../assets/images/minus.png")

const AdjustableSettings = ({soundtype}) => {
  const levelmanager = useSelector((state: RootState) => state.levelmanager);
  const levelManagerDispatch = useDispatch();
  return (
    <View style={{flexDirection: 'row', width:'50%', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity 
        onPress={
          () => { 
            if(soundtype == "Music"){
              levelManagerDispatch(decreaseMusic());
              changeMusicVolAsync(levelmanager.musicVolume, "down") 
            }else{
              levelManagerDispatch(decreaseSFX());
              changeSFXVolAsync(levelmanager.sfxVolume, "down");
            }
          }
        } 
        style={{borderRadius: 9999, aspectRatio: 1, flexShrink: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{aspectRatio: 1, flexShrink: 1, width: 40, height: 40,}}>
          <Image source={minusButton} style={{flexShrink: 1, width: "100%"}}/>
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 10}}>{soundtype=="Music"? levelmanager.musicVolume : levelmanager.sfxVolume}</Text>
      <TouchableOpacity 
         onPress={
          () => { 
            if(soundtype == "Music"){
              levelManagerDispatch(increaseMusic());
              changeMusicVolAsync(levelmanager.musicVolume, "up")
            }else{
              levelManagerDispatch(increaseSFX());
              changeSFXVolAsync(levelmanager.sfxVolume, "up");
            }
          }
        } 
        style={{borderRadius: 9999, aspectRatio: 1, flexShrink: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{aspectRatio: 1, flexShrink: 1, width: 40, height: 40, backgroundColor: 'transparent'}}>
          <Image source={plusButton} style={{flexShrink: 1, width: "100%"}}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const IndividualLevelSetting = ({settingtext}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>             
      <Text style={{color: "#444", fontWeight: 'bold', fontSize: 20, width: "50%"}}>{settingtext}</Text>
      <AdjustableSettings soundtype={settingtext}/>
    </View>
  );
}

const IndividualBooleanSetting = ({settingtext}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>             
      <Text style={{color: "#444", fontWeight: 'bold', fontSize: 20, width: "50%"}}>{settingtext}</Text>
      <View style={{ width: "50%", flexDirection:'row', justifyContent: 'center'}}>
        <Switch
          trackColor={{ false: "#767577", true: "#E11070" }}
          thumbColor={isEnabled ? "#E47070" : "#f4f3f4"}
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


const SettingsModal = ({setCloseModal, showModal}:{setCloseModal: any, showModal: any}) => {

    return (
        <Modal showModal={showModal}>
          <ModalQuit setCloseModal={setCloseModal}/>
          <ModalHeader header="Settings" />
          <ModalContent>
            <View style={{justifyContent: 'space-between', alignItems: 'center', width: "80%"}}>
              <View style={{alignItems: 'center'}}> 
                <IndividualLevelSetting settingtext={"Music"}/>
                <IndividualLevelSetting settingtext={"SFX"}/>
              </View>
            </View>
          </ModalContent>
        </Modal>
    );
  }

  /*<View style={{flexGrow: 1, backgroundColor: 'transparent', padding: "5%", paddingTop: "0%", justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: "100%", justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          
              </View>
              <View style={{justifyContent: 'space-between', alignItems: 'center', width: "80%"}}>
                <View style={{alignItems: 'center'}}> 
                  <IndividualLevelSetting settingtext={"Music"}/>
                  <IndividualLevelSetting settingtext={"SFX"}/>
                  <IndividualBooleanSetting settingtext={"Animation"}/>
                </View>
              </View>
            </View>
          </View>
  
      <TouchableOpacity onPress={() => setCloseModal(false)} style={{display: 'flex', top: 0, backgroundColor: 'white', elevation: 5, padding: 5, aspectRatio: 1, borderRadius: 999, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text >X</Text>
              </TouchableOpacity>
              */
export default SettingsModal;