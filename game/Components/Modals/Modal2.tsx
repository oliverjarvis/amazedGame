import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, Image, Text, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
let QuitButton = require("../../../assets/images/quitbutton.png");

export const Modal = ({children, showModal, style}:{children: any, showModal: any, style?: any}) =>{
    
    let [pointerEventType, setPointerEventType] = useState<"auto" | "none" | "box-none" | "box-only">("box-none");
    useEffect(()=> {
      if(showModal){
        setPointerEventType("auto");
      }else{
        setPointerEventType("box-none");
      }

    }, [showModal])
    
    let slideUpAmount = useSharedValue(1000);
  
    let showModalStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: slideUpAmount.value }]
      };
    }, []);
  
    useEffect(() => {
      if(showModal){
        slideUpAmount.value = withTiming(0, {duration: 400})
      }else{
        slideUpAmount.value = withTiming(1000, {duration: 400})
      }
    }, [showModal])
  
    return (
        <View pointerEvents={"box-none"} style={[{position: 'absolute', zIndex: 99999, height: '100%', width: '100%', backgroundColor: "rgba(0,0,0,0.0)", justifyContent: 'center', alignItems: 'center'}]}>
            <View pointerEvents={pointerEventType} style={[{position: 'relative', zIndex: 99999, height: '100%', width: '100%', backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center'}]}>
              <Animated.View style={[showModalStyle, {backgroundColor: 'white', width: "80%", height: "35%", elevation: 5, borderRadius: 20, flexDirection: 'column', justifyContent: 'space-between'}, style]}>
                {children}
              </Animated.View>
            </View>
        </View>
    );
  }
  
  export const ModalQuit = ({setCloseModal}:{setCloseModal: Function}) =>{
    return (
      <TouchableOpacity onPress={() => {console.log("clicked"); setCloseModal(false)}} style={{ position: 'absolute', aspectRatio: 1, backgroundColor: 'transparent', flexShrink: 1, top: -10, right: -10, width: 40, height: 40}}>
            <Image source={QuitButton} style={{flexShrink: 1, width: "100%"}}/>
      </TouchableOpacity>
    );
  }
  
  export const ModalHeader = ({header}:{header: String}) => {
    return (
      <View pointerEvents='box-none' style={{width: "100%", padding: "5%", height: "25%", backgroundColor: 'transparent', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{header}</Text>
      </View>
    )
  }
  
  export const ModalContent = (props) => {
    return (
      <View style={{height:"75%", width: "100%", backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}} pointerEvents='box-none'>
            {props.children}
      </View>
    )
  }