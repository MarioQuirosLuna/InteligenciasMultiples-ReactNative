import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser.js';

const ResultScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const navigation = useNavigation();
    const { getUserIntelligence, searchUserMatches } = useUser();

    let intelligence = getUserIntelligence(name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>La inteligencia de {name} es:</Text>
            <Text style={styles.subtitle}>
                {intelligence}
            </Text>
            <Button
                title="Coincidencias"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    navigation.navigate("Match", { name: name, usersMatches: searchUserMatches(name, intelligence) });
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
        paddingTop: 40,
        marginBottom: 30,
        marginHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 70,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResultScreen;