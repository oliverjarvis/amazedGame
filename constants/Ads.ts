import {
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { Platform } from 'react-native';

export async function loadAd(){

    const AdUnitId = Platform.select({
        ios: 'ca-app-pub-3899429663512482/2322798436',
        android: 'ca-app-pub-3899429663512482/2961146586',
      });
      
    await AdMobRewarded.setAdUnitID(AdUnitId).catch((e)=>{
        console.log("Ad not ready.");
        return;
    })
    try{
    await AdMobRewarded.requestAdAsync();
    }catch(e){
    return;
    }
}

export default async function showInterstitialRewardedAd(){
    await loadAd().catch((e)=>{
        console.log("Ad Not ready!");
    });
    await AdMobRewarded.showAdAsync().catch((e)=>{
        return;
        //showInterstitialRewardedAd();
    });
}