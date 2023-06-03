import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useUser from '../hooks/useUser.js';

const MatchScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const { users, getUser } = useUser();

    let intelligence = getUser(name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Para {name} con inteligencia {intelligence} se tienen estas coincidencias:</Text>
            <Text style={styles.subtitle}>
                {users.map((user, index) => (
                <Text key={index}>
                    <Text>{'\n'}{index+1}{'.  Nombre: '}{user.name}{' - Inteligencia: '}</Text>
                    <Text>{user.intelligence}{'.\n'}</Text>
                </Text>
                ))}
            </Text>
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
        fontSize: 20,
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

export default MatchScreen;