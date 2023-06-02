import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import listIntelligences from '../../data/listIntelligences.json';

const useIntelligences = () => {
    const [intelligences, setIntelligences] = useState([]);

    const loadIntelligences = async () => {
        try {
            const intelligencesData = await AsyncStorage.getItem('@IntelligencesListStore:Intelligences');
            if (intelligencesData) {
                const intelligences = JSON.parse(intelligencesData);
                setIntelligences(intelligences);
            } else {
                setIntelligences(listIntelligences);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (intelligences.length) return;
        loadIntelligences();
    }, []);

    return { questions: intelligences };
};

export default useIntelligences;
