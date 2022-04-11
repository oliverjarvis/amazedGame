import { useContext } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { DiamondCount } from "../../../Components/Header";
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

const PrizeModal = ({showModal, setCloseModal}:{showModal: any, setCloseModal: any}) => {

    const {state, dispatch} = useContext(gameManagerContext);

    return (
      <>
      <Modal height={"40%"} showModal={showModal}>
        <ModalQuit setCloseModal={setCloseModal}/>
        <ModalHeader header={"Daily free skips!"} />
        <ModalContent>
          <View style={{ height: "100%", width: "100%", alignItems: 'center'}}>
            <View style={{width: "80%", height: "100%", justifyContent: 'space-evenly',}}>
              <Text style={{fontSize:20, textAlign: 'center'}}>
              Thanks for playing, here's two free skips.
              </Text> 
              <View style={{height:"30%", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <DiamondCount diamongCount={2}/>
              </View>
              <Text style={{fontSize: 17, textAlign: 'center'}}>
              Come back tommorow for more free skips.
              </Text>
            </View>
          </View>
        </ModalContent>
        </Modal>
      </>
    );
  }

export default PrizeModal;