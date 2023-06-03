import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Navigate = ({ currentQuestion, setCurrentQuestion }) => {

    const goToNextQuestion = () => {
        if (currentQuestion < 35) {
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
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 40,
    },
    button: {
        backgroundColor: '#4287f5',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Navigate;
