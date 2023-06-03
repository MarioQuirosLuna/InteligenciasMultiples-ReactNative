import { useState } from "react";

const useEuclides = () => {

    const [intelligence, setIntelligence] = useState('default');

    const fillVectorsWithEuclidesResults = (intelligencesVector, userVector) => {
        userVector = userVector.map(() => {
            return Math.floor(Math.random() * 5) + 1;
        });
        let minEuclides = Infinity;
        let minIntelligence = null;

        intelligencesVector.forEach((intelligenceVector, index) => {
            const euclides = calcEuclides(index, intelligenceVector, userVector);

            if (euclides < minEuclides) {
                minEuclides = euclides;
                minIntelligence = intelligenceVector.intelligence;
            }
        });

        return minIntelligence;
    }

    const calcEuclides = (index, intelligenceVector, userVector) => {
        if (intelligenceVector.values.length !== userVector.length) throw new Error("Los vectores deben tener la misma longitud " + index);
        let normalizedUserVector = userVector.map((value) => {
            return (value + 1) / 5;
        });
        let sum = 0;
        for (let i = 0; i < intelligenceVector.values.length; i++) {
            sum += Math.pow(intelligenceVector.values[i] - normalizedUserVector[i], 2);
        }
        return Math.sqrt(sum);
    }

    return { intelligence, fillVectorsWithEuclidesResults };
}

export default useEuclides;