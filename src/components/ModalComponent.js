import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Modal, Dimensions } from 'react-native';
import { Button, Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeigth = Dimensions.get('window').height;

const ModalComponent = ({ title, text, modalVisible, setModalVisible }) => {

    return (
        <View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    <Image source={require('../../assets/images/alert.png')} style={styles.image}/>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{text}</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cerrar"
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonText}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 5, 0.9)',

        height: windowHeigth ,
        padding: 30,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0D4F8B',
    },
    description: {
        fontSize: 20,
        marginVertical: 20,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#0D4F8B',
        margin: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        marginHorizontal: 20,
        fontWeight: 'bold',
    },
});

export default ModalComponent;
