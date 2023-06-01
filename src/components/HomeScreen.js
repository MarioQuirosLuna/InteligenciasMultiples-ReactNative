import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import useQuestions from "../hooks/useQuestions";


const HomeScreen = () => {
    const route = useRoute();
    const { name } = route.params;
    const { questions } = useQuestions();

    const renderItem = ({ item }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <View style={styles.optionsContainer}>
                {item.options.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido {name}</Text>
            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    optionText: {
        textAlign: 'center',
    },
});

export default HomeScreen;
