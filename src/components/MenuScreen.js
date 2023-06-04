import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import useUser from '../hooks/useUser';

const windowHeigth = Dimensions.get('window').height;

const MenuScreen = () => {
    const route = useRoute();
    const { name } = route.params;
    const navigation = useNavigation();
    const { getUserIntelligence } = useUser();

    const intelligence = getUserIntelligence(name);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/neural.png')} style={styles.image} />
            <Text style={styles.title}>Bienvenido(a){'\n'}{name}</Text>
            <Button
                title="Empezar cuestionario"
                onPress={() => {
                    navigation.navigate('Home', { name: name });
                }}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
            {intelligence !== 'default' ?
                <Button
                    title="Mi tipo de inteligencia"
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
        height: windowHeigth/1.5,
        padding: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#0D4F8B',
        textAlign: 'center',
    },
    button: {
        alignSelf: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 20,
        backgroundColor: '#0D4F8B',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MenuScreen;