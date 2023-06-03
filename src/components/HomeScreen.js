import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useQuestions from "../hooks/useQuestions";
import Question from "./Question";
import Navigator from "./Navigator";

const HomeScreen = () => {
    const route = useRoute();
    //const { name } = route.params;
    let name = "Juan";
    const { questions } = useQuestions();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido {name}</Text>
            <Text style={styles.subtitle}>
                Responda pensando en qué tan identificado se siente con la pregunta, donde 1 es nada y 5 demasiado.
            </Text>
            {questions.length > 0 ? (
                <Question question={questions[currentQuestion]} />
            ) : (
                <ActivityIndicator size="large" />
            )}
            <View style={styles.navigatorContainer}>
                <Navigator
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </View>
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
    navigatorContainer: {
        marginBottom: 20,
    },
});

export default HomeScreen;