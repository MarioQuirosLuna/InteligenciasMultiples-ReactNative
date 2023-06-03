import { useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser.js';


const LoginScreen = ({ }) => {
    const [inputValueName, setInputValueName] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const inputName = useRef();
    const inputPassword = useRef();

    const navigation = useNavigation();

    const { users, loginUser, createUser } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inteligencias Múltiples</Text>
            <TextInput
                ref={inputName}
                style={styles.textInput}
                value={inputValueName}
                onChangeText={setInputValueName}
                autoCapitalize="none"
                placeholder='Ingrese su nombre...'
            />
            <TextInput
                ref={inputPassword}
                style={styles.textInput}
                value={inputValuePassword}
                onChangeText={setInputValuePassword}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder='Ingrese su contraseña...'
            />
            <Button
                title="Iniciar Sesión"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    let state = loginUser({ name: inputValueName, password: inputValuePassword, });
                    if (state === 'Logged in') {
                        navigation.navigate("Home", { name: inputValueName });
                        Alert.alert("Logged in");
                    } else {
                        Alert.alert(state);
                    }
                }}

            />
            <Button
                title="Registrarse"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    let state = createUser({ name: inputValueName, password: inputValuePassword, });
                    if (state === 'User created') {
                        Alert.alert("User created");
                    }
                }}
            />
        </View>
    );
}

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