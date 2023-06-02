import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import useQuestions from "../hooks/useQuestions";
import { useEffect, useState } from "react";


const HomeScreen = () => {
    const route = useRoute();
    //const { name } = route.params;
    let name = "Juan";
    const { questions } = useQuestions();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [results, setResults] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const initializeSelectedOptions = () => {
        const newSelectedOptions = {};
        questions.forEach((question) => {
            newSelectedOptions[question.id] = -1;
        });
        setSelectedOptions(newSelectedOptions);
        setResults(newSelectedOptions);
    };

    const getOptionStyle = (questionId, indexBtn) => {
        let isSelected = selectedOptions[questionId] === indexBtn;
        return { backgroundColor: isSelected ? '#00FF00' : '#FFFFFF' };
    };

    const addResponse = (questionId, optionIndex) => {
        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = {
                ...prevSelectedOptions,
                [questionId]: optionIndex
            };
            return updatedOptions;
        });
    };

    const showResults = () => {
        setResults(selectedOptions);
        setModalVisible(true);
    };

    const handleShowResults = () => {
        setResults(selectedOptions);
    };

    useEffect(() => {
        initializeSelectedOptions();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <View style={styles.optionsContainer}>
                {item.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, getOptionStyle(item.id, index)]}
                        onPress={() => addResponse(item.id, index)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={showResults}
            >
                <Text style={styles.buttonText}>Mostrar resultados</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Resultados</Text>
                        <Text style={styles.modalText}>{JSON.stringify(results, null, 2)}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>Bienvenido {name}</Text>
            <Text style={styles.subtitle}>Reponda pensando en que tan identificado te sientes con la pregunta, donde 1 es nada y 5 demasiado.</Text>
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
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    subtitle: {
        fontSize: 18,
        alignSelf: 'center',
        paddingVertical: 10,
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
