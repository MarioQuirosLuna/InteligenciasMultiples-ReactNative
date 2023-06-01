import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import listQuestions from '../../data/listQuestions.json';

const useQuestions = () => {
    const [questions, setQuestions] = useState([]);

    const loadQuestions = async () => {
        try {
            const questionsData = await AsyncStorage.getItem('@QuestionListStore:Questions');
            if (questionsData) {
                const questions = JSON.parse(questionsData);
                setQuestions(questions);
            } else {
                setQuestions(listQuestions);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (questions.length) return;
        loadQuestions();
    }, []);

    return { questions };
};

export default useQuestions;
