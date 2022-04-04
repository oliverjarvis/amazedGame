import {
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

export async function loadAd(){
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
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