
const useEuclides = () => {

    const findClosestIntelligenceWithEuclides = (intelligencesVector, userVector) => {
        let minEuclides = [Infinity, Infinity];
        let minIntelligences = [null, null];

        intelligencesVector.forEach((intelligenceVector, index) => {
            const euclides = calcEuclides(index, intelligenceVector, userVector);

            if (euclides < minEuclides[0]) {
                minEuclides[1] = minEuclides[0];
                minIntelligences[1] = minIntelligences[0];
                minEuclides[0] = euclides;
                minIntelligences[0] = intelligenceVector.intelligence;
            } else if (euclides < minEuclides[1]) {
                minEuclides[1] = euclides;
                minIntelligences[1] = intelligenceVector.intelligence;
            }
        });

        return minIntelligences;
    }

    const findClosestIntelligenceWithRandomEuclides = (intelligencesVector, userVector) => {
        userVector = userVector.map(() => {
            return Math.floor(Math.random() * 5) + 1;
        });
        let minEuclides = [Infinity, Infinity];
        let minIntelligences = [null, null];

        intelligencesVector.forEach((intelligenceVector, index) => {
            const euclides = calcEuclides(index, intelligenceVector, userVector);

            if (euclides < minEuclides[0]) {
                minEuclides[1] = minEuclides[0];
                minIntelligences[1] = minIntelligences[0];
                minEuclides[0] = euclides;
                minIntelligences[0] = intelligenceVector.intelligence;
            } else if (euclides < minEuclides[1]) {
                minEuclides[1] = euclides;
                minIntelligences[1] = intelligenceVector.intelligence;
            }
        });

        return minIntelligences;
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

    return { findClosestIntelligenceWithEuclides, findClosestIntelligenceWithRandomEuclides };
}

export default useEuclides;