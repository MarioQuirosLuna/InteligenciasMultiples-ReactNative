import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ModalComponent = ({ text }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Button
                title="Abrir Modal"
                onPress={() => setModalVisible(true)}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{text}</Text>
                    <Button
                        title="Cerrar Modal"
                        onPress={() => setModalVisible(false)}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default ModalComponent;
