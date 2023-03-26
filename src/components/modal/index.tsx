import React, {FC, PropsWithChildren} from 'react';
import {Modal as RNModal, Pressable, StyleSheet, View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';

interface IModalProps extends PropsWithChildren {
  visible: boolean;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({children, visible, onClose}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <FaIcon name="close" size={20} color={'#333'} />
          </Pressable>
          <View>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingLeft: 20,
    paddingRight: 20,
  },

  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  closeButton: {
    marginLeft: 'auto',
  },
});
