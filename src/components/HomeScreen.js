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
import useQuestions from "../hooks/useQuestions";
import Question from "./Question";
import Navigate from "./Navigate";

const HomeScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const navigation = useNavigation();

    const { questions } = useQuestions();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido(a) {name}</Text>
            <Text style={styles.subtitle}>
                Responda pensando en qué tan identificado se siente con la pregunta, donde 1 es nada y 5 demasiado.
            </Text>
            {questions.length > 0 ? (
                <Question question={questions[currentQuestion]} />
            ) : (
                <ActivityIndicator size="large" />
            )}
            <View style={styles.navigateContainer}>
                <Navigate
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </View>
            <Button
                title="Resultado"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    navigation.navigate("Result", { name: name, });
                }}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    questionContainer: {
        flex: 1,
        width: "100%",
    },
    navigateContainer: {
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

export default HomeScreen;