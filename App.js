import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';
import ResultScreen from './src/components/ResultScreen';
import MatchScreen from './src/components/MatchScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Login"
          options={{ title: "Inicio Sesión" }}
          component={LoginScreen}
        />
        <Screen
          name="Home"
          options={{ title: "Inteligencias Múltiples" }}
          component={HomeScreen}
        />
        <Screen
          name="Result"
          options={{ title: "Resultado Inteligencias Múltiples" }}
          component={ResultScreen}
        />
        <Screen
          name="Match"
          options={{ title: "Coincidencias de Inteligencias Múltiples" }}
          component={MatchScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
