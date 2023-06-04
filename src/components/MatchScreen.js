import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useUser from '../hooks/useUser.js';
import { Image } from "react-native-elements";

const MatchScreen = () => {
    const route = useRoute();
    const { name, usersMatches } = route.params;

    const { getUserIntelligence, getUserSubIntelligence } = useUser();

    let intelligence = getUserIntelligence(name);
    let subIntelligence = getUserSubIntelligence(name);

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.intelligence}</Text>
            <Text style={styles.tableCell}>{item.subIntelligence}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}><Image source={require('../../assets/images/friend.png')} style={styles.image} /></View>
            <Text style={styles.title}>Usuario: <Text style={styles.subtitle}>{name}</Text></Text>
            <Text style={styles.title}>Inteligencia: <Text style={styles.subtitle}>{intelligence}</Text></Text>
            <Text style={styles.title}>SubInteligencia: <Text style={styles.subtitle}>{subIntelligence}</Text></Text>
            <Text style={styles.title}>{'\n'}Tiene las siguientes coincidencias: </Text>
            <View style={styles.containerTable}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Nombre</Text>
                    <Text style={styles.tableHeader}>Inteligencia</Text>
                    <Text style={styles.tableHeader}>SubInteligencia</Text>
                </View>
                <FlatList
                    data={usersMatches}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ffffff",
        paddingVertical: 20,
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#0D4F8B",
    },
    containerTable: {
        borderWidth: 1,
        borderColor: "#0D4F8B",
        borderRadius: 4,
        backgroundColor: "#f5f5f5",
        padding: 5,
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#0D4F8B",
        paddingVertical: 10,
        textAlign: "center",
    },
    tableHeader: {
        flex: 1,
        fontWeight: "bold",
        color: "#0D4F8B",
        textAlign: "center",
    },
    tableCell: {
        flex: 1,
        fontSize: 11,
        textAlign: "center",
    },
});

export default MatchScreen;