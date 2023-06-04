import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth= Dimensions.get('window').width;

const Navigate = ({ currentQuestion, setCurrentQuestion, selectedOptions }) => {

    const goToNextQuestion = () => {
        if (currentQuestion < 35 && selectedOptions[currentQuestion] !== -1) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prevQuestion => prevQuestion - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={goToPreviousQuestion}>
                <Text style={styles.buttonText}> Anterior </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToNextQuestion}>
                {selectedOptions[currentQuestion] !== -1 ?
                    <Text style={styles.buttonText}>Siguiente </Text>
                    : <Text style={styles.buttonText}>Esperando</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 60,
        backgroundColor: 'rgba(13, 79, 139, 0.4)',
        paddingVertical: 30,
        width: windowWidth,
    },
    button: {
        backgroundColor: '#0D4F8B',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Navigate;
