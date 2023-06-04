import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Image } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser.js';
import ModalComponent from './ModalComponent.js';

const LoginScreen = ({ }) => {
    const [inputValueName, setInputValueName] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const navigation = useNavigation();

    const { loginUser, createUser, deleteUserAccount } = useUser();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/neural.png')} style={styles.image} />
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
                    if (inputValueName && inputValuePassword && inputValueName !== '' && inputValuePassword !== '') {
                        let state = loginUser({ name: inputValueName, password: inputValuePassword });
                        if (state === 'Logged in') {
                            navigation.navigate('Menu', { name: inputValueName });
                        } else {
                            setModalVisible(true);
                            setModalText('Usuario o contraseña incorrectos, verifique sus datos.');
                            setModalTitle('Error');
                        }
                    } else {
                        setModalVisible(true);
                        setModalText('Debe ingresar un nombre de usuario y contraseña.');
                        setModalTitle('Error');
                    }
                }}
            />
            <Button
                title="Registrarse"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    if (inputValueName && inputValuePassword && inputValueName !== '' && inputValuePassword !== '') {
                        let state = createUser({ name: inputValueName, password: inputValuePassword });
                        if (state === 'User created') {
                            setModalVisible(true);
                            setModalText('Usuario creado correctamente.');
                            setModalTitle('Éxito');
                        } else {
                            if (state === 'User already exists') {
                                setModalVisible(true);
                                setModalText('El nombre de usuario ya existe, por favor seleccione otro.');
                                setModalTitle('Error');
                            }
                        }
                    } else {
                        setModalVisible(true);
                        setModalText('Debe ingresar un nombre de usuario y contraseña.');
                        setModalTitle('Error');
                    }
                }}
            />
            <Button
                title="Eliminar Cuenta"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => {
                    if (inputValueName && inputValuePassword && inputValueName !== '' && inputValuePassword !== '') {
                        const response = deleteUserAccount({ name: inputValueName, password: inputValuePassword });
                        if (response) {
                            setModalVisible(true);
                            setModalText('Usuario eliminado correctamente.');
                            setModalTitle('Éxito');
                        } else {
                            setModalVisible(true);
                            setModalText('Usuario o contraseña incorrectos, verifique sus datos.');
                            setModalTitle('Error');
                        }
                    } else {
                        setModalVisible(true);
                        setModalText('Debe ingresar un nombre de usuario y contraseña.');
                        setModalTitle('Error');
                    }
                }}
            />
            <ModalComponent
                title={modalTitle}
                text={modalText}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 50,
        padding: 20,
        borderRadius: 20,

    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    textInput: {
        width: "85%",
        borderWidth: 2,
        fontSize: 18,
        margin: 10,
        borderRadius: 10,
        borderColor: "#0D4F8B",
        padding: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
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

export default LoginScreen;