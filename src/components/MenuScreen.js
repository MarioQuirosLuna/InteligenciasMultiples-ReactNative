import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import useUser from '../hooks/useUser';

const MenuScreen = () => {
    const route = useRoute();
    const { name } = route.params;
    const navigation = useNavigation();
    const { getUserIntelligence } = useUser();

    const intelligence = getUserIntelligence(name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido(a) {name}</Text>
            <Button
                title="Cuestionario"
                onPress={() => {
                    navigation.navigate('Home', { name: name });
                }}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
            {intelligence !== 'default' ?
                <Button
                    title="Ver mi tipo de inteligencia"
                    onPress={() => {
                        navigation.navigate('Result', { name: name });
                    }}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                />
                : <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MenuScreen;