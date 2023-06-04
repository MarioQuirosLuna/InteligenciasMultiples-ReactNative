import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Image } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;

const Question = ({ question, addAnswer, selectedOptions }) => {

    const showSelectedOptions = (questionId, optionNumber) => {
        if (selectedOptions[questionId] === optionNumber) {
            return (
                { backgroundColor: "#00ff00" }
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.questionContainer}>
                <Image source={require('../../assets/images/question.png')} style={styles.image} />
                <Text style={styles.questionText}>{question.question}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, showSelectedOptions(question.id, index)]}
                        onPress={() => addAnswer(question.id, index)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(13, 79, 139, 0.2)'
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    questionContainer: {
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        width: windowWidth,
        minHeight: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    questionText: {
        fontSize: 20,
        lineHeight: 26,
        textAlign: "center",
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    optionButton: {
        backgroundColor: "#0D4F8B",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 50,
    },
    optionText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Question