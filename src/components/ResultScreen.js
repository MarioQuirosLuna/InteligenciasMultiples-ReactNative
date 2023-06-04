import React from "react";
import {
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
    const { getUserIntelligence, getUserSubIntelligence, searchUserMatches } = useUser();

    let intelligence = getUserIntelligence(name);
    let subIntelligence = getUserSubIntelligence(name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>La inteligencia de {name} es:</Text>
            <Text style={styles.subtitle}>
                {intelligence}
            </Text>
            <Text style={styles.title}>Y la subinteligencia es:</Text>
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