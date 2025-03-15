import {Button, Text, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({ navigation }) {
    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screenContainer}>
            <View style={styles.profileContainer}>

                    <Icon size={150} color="#585858" name="account-circle" onPress={() => navigation.goBack()}/>
                    <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 29}}>
                        {`STORE 1`}
                    </Text>
                    <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 33}}>
                        {`John Doe`}
                    </Text>
            </View>
            <AppButton
                title="Browse Items"
                onPress={() => navigation.navigate('Browse Items')}
            />
            <AppButton
                title="My Shopping List"
                onPress={() => navigation.navigate('Shopping List')}
            />
            <AppButton 
                title="Stores"
                onPress={() => navigation.goBack()} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#4682B4",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 30
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    profileContainer: {
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 60,
    },
});
