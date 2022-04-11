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
      
    await AdMobRewarded.setAdUnitID(AdUnitId); // Test ID, Replace with your-admob-unit-id
    try{
    await AdMobRewarded.requestAdAsync();
    }catch(e){
    console.log(e);
    }
}

export default async function showInterstitialRewardedAd(){
    await loadAd();
    await AdMobRewarded.showAdAsync().catch((e)=>{
        console.log(e);
        //showInterstitialRewardedAd();
    });
}