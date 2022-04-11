import { useContext } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import showInterstitialRewardedAd from "../../../constants/Ads";
import { gameManagerContext } from "../../GameLogic";
import { Modal, ModalContent, ModalHeader, ModalQuit } from "./Modal";


const SettingsModal = ({setCloseModal, showModal}:{setCloseModal: any, showModal: any}) => {

  return (
      <Modal showModal={showModal}>
        <ModalQuit setCloseModal={setCloseModal}/>
        <ModalHeader header="Settings" />
        <ModalContent>
          <View style={{justifyContent: 'space-between', alignItems: 'center', width: "80%"}}>
            <View style={{alignItems: 'center'}}> 
              
            </View>
          </View>
        </ModalContent>
      </Modal>
  );
}

const RewardedModal = ({powerup, showModal, setCloseModal}:{powerup: "skip" | "hint", showModal: any, setCloseModal: any}) => {

    const {state, dispatch} = useContext(gameManagerContext);

    return (
      <>
      <Modal showModal={showModal}>
        <ModalQuit setCloseModal={setCloseModal}/>
        <ModalHeader header={"Oh no! No more " + powerup + "s!"} />
        <ModalContent>
          <View style={{justifyContent: 'space-evenly', height: "100%", width: "100%", alignItems: 'center'}}>
            <View style={{width: "80%", height: "50%"}}>
              <Text style={{fontSize:18}}>
              Get an instant skip by watching a rewarded video ad, or come back tommorow for a free skip and a free hint.
              </Text> 
            </View>
          
            <TouchableOpacity onPress={() => {showInterstitialRewardedAd(); dispatch({type: 'pause-unpause'})} } style={{ width: "80%", height: "30%", borderRadius: 10, alignItems: 'center', backgroundColor: '#D36F6F',  justifyContent: 'center'}}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30}}>Earn {powerup}!</Text>
              </TouchableOpacity>
          </View>
        </ModalContent>
        </Modal>
      </>
    );
  }

export default RewardedModal;