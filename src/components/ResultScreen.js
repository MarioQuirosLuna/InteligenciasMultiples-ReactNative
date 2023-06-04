import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser.js';

const ResultScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const navigation = useNavigation();
    const { getUserIntelligence, getUserSubIntelligence, searchUserMatches } = useUser();

    let intelligence = getUserIntelligence(name);
    let subIntelligence = getUserSubIntelligence(name);

    const images = {
        Espacial: require('../../assets/images/Espacial.png'),
        Musical: require('../../assets/images/Musical.png'),
        Lingüístico: require('../../assets/images/Lingüístico-Verbal.png'),
        Lógico: require('../../assets/images/Lógico-Matemático.png'),
        Corporal: require('../../assets/images/Corporal-Cinestésico.png'),
        Intrapersonal: require('../../assets/images/Intrapersonal.png'),
        Interpersonal: require('../../assets/images/Interpersonal.png'),
        Naturalista: require('../../assets/images/Naturalista.png'),
        Existencial: require('../../assets/images/Existencial.png'),
        Creativo: require('../../assets/images/Creativo.png'),
        Emocional: require('../../assets/images/Emocional.png'),
        Colaborativo: require('../../assets/images/Colaborativo.png'),
    };

    let separatedIntelligence = "";
    let separatedSubIntelligence = "";

    if (intelligence == "Lingüístico-Verbal" || intelligence == "Lógico-Matemático" || intelligence == "Corporal-Cinestésico") {
        const separatedTextIntelligence = intelligence.split('-');
        separatedIntelligence = separatedTextIntelligence[0];
    } else {
        separatedIntelligence = intelligence;
    }

    if (subIntelligence == "Lingüístico-Verbal" || subIntelligence == "Lógico-Matemático" || subIntelligence == "Corporal-Cinestésico") {
        const separatedTextSubIntelligence = subIntelligence.split('-');
        separatedSubIntelligence = separatedTextSubIntelligence[0];
    } else {
        separatedSubIntelligence = subIntelligence;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name} tiene inteligencia</Text>
            <Image source={images[separatedIntelligence]} style={styles.image} />
            <Text style={styles.subtitle}>
                {intelligence}
            </Text>
            <Text style={styles.title}>y subinteligencia</Text>
            <Image source={images[separatedSubIntelligence]} style={styles.image} />
            <Text style={styles.subtitle}>
                {subIntelligence}
            </Text>
            <Button
                title="Coincidencias"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    navigation.navigate("Match", { name: name, usersMatches: searchUserMatches(name, intelligence, subIntelligence) });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 5,
        marginVertical: 30,
        marginHorizontal: 20,
        backgroundColor: "#ffffff",
        textAlign: "center",
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0D4F8B",
    },
    button: {
        alignSelf: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 40,
        backgroundColor: '#0D4F8B',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResultScreen;