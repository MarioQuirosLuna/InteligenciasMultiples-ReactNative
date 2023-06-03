import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser.js';


const LoginScreen = ({ }) => {
    const [inputValueName, setInputValueName] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const navigation = useNavigation();

    const { loginUser, createUser, resetUsers } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inteligencias Múltiples</Text>
            <TextInput
                style={styles.textInput}
                value={inputValueName}
                onChangeText={setInputValueName}
                autoCapitalize="none"
                placeholder="Ingrese su nombre..."
                autoFocus={true} // Enfocar automáticamente este campo
            />
            <TextInput
                style={styles.textInput}
                value={inputValuePassword}
                onChangeText={setInputValuePassword}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Ingrese su contraseña..."
            />
            <Button
                title="Iniciar Sesión"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    let state = loginUser({ name: inputValueName, password: inputValuePassword });
                    if (state === 'Logged in') {
                        navigation.navigate('Home', { name: inputValueName });
                        Alert.alert('Sesión iniciada');
                    } else {
                        Alert.alert('Usuario no encontrado, por favor verifique sus datos');
                    }
                }}
            />
            <Button
                title="Registrarse"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    let state = createUser({ name: inputValueName, password: inputValuePassword });
                    if (state === 'User created') {
                        Alert.alert('Usuario creado exitosamente');
                    } else {
                        if (state === 'User already exists') {
                            Alert.alert('El nombre de usuario ya existe, por favor seleccione otro');
                        }
                    }
                }}
            />
            <Button
                title="Resetear"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    resetUsers();
                    Alert.alert('Datos reestablecidos exitosamente');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    textInput: {
        width: "85%",
        borderWidth: 2,
        fontSize: 18,
        margin: 10,
        borderRadius: 10,
        padding: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
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

export default LoginScreen;