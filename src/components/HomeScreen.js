import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useQuestions from "../hooks/useQuestions";
import Question from "./Question";
import Navigate from "./Navigate";
import ModalComponent from "./ModalComponent";
import useEuclides from "../hooks/useEuclides";
import useIntelligences from "../hooks/useIntelligences";

const HomeScreen = () => {
    const route = useRoute();
    const { name } = route.params;
    const { questions } = useQuestions();
    const { intelligences } = useIntelligences();
    const { intelligence, fillVectorsWithEuclidesResults } = useEuclides();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const addAnswer = (questionId, answerValue) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionId] = answerValue;
        setSelectedOptions(newSelectedOptions);
    }

    const calculateEuclides = () => {
        const euclidesResults = fillVectorsWithEuclidesResults(intelligences, selectedOptions);
        return euclidesResults;
    }

    useEffect(() => {
        setSelectedOptions(new Array(36).fill(-1));
    }, []);

    useEffect(() => {
        calculateEuclides()
    }, [intelligences]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido {name}</Text>
            <Text style={styles.subtitle}>
                Responda pensando en qué tan identificado se siente con la pregunta, donde 1 es nada y 5 demasiado.
            </Text>
            {questions.length > 0 ? (
                <Question
                    question={questions[currentQuestion]}
                    addAnswer={addAnswer}
                    selectedOptions={selectedOptions}
                />
            ) : (
                <ActivityIndicator size="large" />
            )}
            <View style={styles.navigateContainer}>
                <Navigate
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </View>
            <ModalComponent text={calculateEuclides()} />
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
        paddingBottom: 20,
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
});

export default HomeScreen;