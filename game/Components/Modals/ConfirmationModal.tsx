import { View, Text, TouchableOpacity} from "react-native";
import { Modal, ModalContent, ModalHeader, ModalQuit } from "./Modal";


const ConfirmationModal = ({confirmation, show, setshow, callback}:{ confirmation: string, show: any, setshow: any, callback: any}) => {


    return (
      <>
      <Modal style={{width: "60%", height: "30%"}} showModal={show}>
        <ModalHeader header={confirmation} />
        <ModalContent>
          <View style={{justifyContent: 'center', alignItems: 'center', width:"100%", height: "100%", flexDirection:"column"}}>
            <TouchableOpacity onPress={() => setshow(false)} style={{ width: "46%", margin: "2%", height: "25%", borderRadius: 10, alignItems: 'center', backgroundColor: '#666',  justifyContent: 'center'}}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => callback()} style={{ width: "46%", marginRight: "2%", height: "25%", borderRadius: 10, alignItems: 'center', backgroundColor: '#D36F6F',  justifyContent: 'center'}}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30}}>Yes!</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
        </Modal>
      </>
    );
  }

export default ConfirmationModal;