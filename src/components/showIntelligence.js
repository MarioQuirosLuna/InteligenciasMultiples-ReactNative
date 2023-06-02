import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';


const HomeScreen = () => {
    const route = useRoute();
    const { name } = route.params;



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tu inteligencia es</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
});

export default HomeScreen;
