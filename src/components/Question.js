import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const Question = ({ question }) => {

    return (
        <View style={styles.screen}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => { }}
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
    },
    questionContainer: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        width: windowWidth - 40,
        minHeight: 200,
        justifyContent: "center",
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 26,
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    optionButton: {
        backgroundColor: "#4287f5",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    optionText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Question