import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useQuestions from "../hooks/useQuestions";
import Question from "./Question";
import Navigate from "./Navigate";
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

    const verifyAllValuesAdded = (array) => {
        return array.every((value) => value !== -1);
    }

    useEffect(() => {
        setSelectedOptions(new Array(36).fill(-1));
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/images/neural.png')} style={styles.image} />
                <Text style={styles.title}>Hola {name}</Text>
            </View>
            <Text style={styles.subtitle}>
                Por favor responda pensando en qué tan identificado se siente con la pregunta, donde 1 es nada y 5 demasiado.
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
                    selectedOptions={selectedOptions}
                />
            </View>
            {currentQuestion === 35 && verifyAllValuesAdded(selectedOptions) ? (
                <Button
                    title="Resultado"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        const closesIntelligences = findClosestIntelligenceWithEuclides(intelligences, selectedOptions)
                        setUserIntelligence(name, closesIntelligences[0], closesIntelligences[1]);
                        navigation.navigate("Result", { name: name, });
                    }}
                />
            ) : (
                <Button
                    title="Random"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        const closesIntelligences = findClosestIntelligenceWithRandomEuclides(intelligences, selectedOptions)
                        setUserIntelligence(name, closesIntelligences[0], closesIntelligences[1]);
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
        paddingVertical: 40,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    image: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "justify",
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
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#0D4F8B',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;