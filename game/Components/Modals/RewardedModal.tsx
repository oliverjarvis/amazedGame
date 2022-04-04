import { View, Text, TouchableOpacity} from "react-native";
import showInterstitialRewardedAd from "../../../constants/Ads";

const RewardedModal = ({powerup, setCloseModal}:{powerup: "skip" | "hint", setCloseModal: any}) => {
    return (
      <>
      <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: "rgba(0,0,0,0.2)", justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#fff', width: "80%", aspectRatio: 3/2, elevation: 5, borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-end'}}>
            <View style={{flexGrow: 1, backgroundColor: 'transparent', padding: "5%", paddingTop: 0, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: "100%", justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => setCloseModal(false)} style={{display: 'flex', top: 0, backgroundColor: 'white', elevation: 5, padding: 5, aspectRatio: 1, borderRadius: 999, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text >X</Text>
              </TouchableOpacity>
              </View>
              <Text style={{color: "#444", fontSize: 20}}>Oh no!</Text>
              {powerup == "skip" && <Text style={{color: "#444", fontSize: 20}}>No more skips left!</Text>}
              {powerup == "hint" && <Text style={{color: "#444", fontSize: 20}}>No more hints left!</Text>}
            </View>
            <TouchableOpacity onPress={() => showInterstitialRewardedAd()} style={{ width: "100%", height: "30%", alignItems: 'center', backgroundColor: 'transparent', borderTopColor: "#999", borderTopWidth: 1, justifyContent: 'center'}}>
              <Text style={{ color: '#444', fontSize: 20}}>Earn two skips</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

export default RewardedModal;