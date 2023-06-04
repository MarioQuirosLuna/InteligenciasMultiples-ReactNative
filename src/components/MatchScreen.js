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
            <Text style={styles.title}>
                Para <Text style={styles.subtitle}>{name}</Text> con inteligencia <Text style={styles.subtitle}>{intelligence}</Text> y subInteligencia <Text style={styles.subtitle}>{subIntelligence}</Text>, se tienen estas coincidencias:
            </Text>
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
        padding: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    containerTable: {
        borderWidth: 1,
        borderColor: "#d0d0d0",
        borderRadius: 4,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#d0d0d0",
        paddingVertical: 10,
    },
    tableHeader: {
        flex: 1,
        fontWeight: "bold",
    },
    tableCell: {
        flex: 1,
    },
});

export default MatchScreen;