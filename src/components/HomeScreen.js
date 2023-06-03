import React, { useEffect, useState } from "react";
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
import ModalComponent from "./ModalComponent";
import useEuclides from "../hooks/useEuclides";
import useIntelligences from "../hooks/useIntelligences";
import useUser from "../hooks/useUser";

const HomeScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const navigation = useNavigation();

    const { questions } = useQuestions();
    const { intelligences } = useIntelligences();
    const { findClosestIntelligenceWithEuclides, findClosestIntelligenceWithRandomEuclides } = useEuclides();
    const { setUserIntelligence } = useUser();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const addAnswer = (questionId, answerValue) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionId] = answerValue;
        setSelectedOptions(newSelectedOptions);
    }

    const calculateEuclides = () => {
        const euclidesResultIntelligence = findClosestIntelligenceWithEuclides(intelligences, selectedOptions);
        return euclidesResultIntelligence;
    }

    const verifyAllValuesAdded = (array) => {
        return array.every((value) => value !== -1);
    }

    useEffect(() => {
        setSelectedOptions(new Array(36).fill(-1));
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido(a) {name}</Text>
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
            {currentQuestion === 35 && verifyAllValuesAdded(selectedOptions) ? (
                <Button
                    title="Resultado"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        setUserIntelligence(name, findClosestIntelligenceWithEuclides(intelligences, selectedOptions));
                        navigation.navigate("Result", { name: name, });
                    }}
                />
            ) : (
                <Button
                    title="Random"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        setUserIntelligence(name, findClosestIntelligenceWithRandomEuclides(intelligences, selectedOptions));
                        navigation.navigate("Result", { name: name, });
                    }}
                />
            )}
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