import {Button, View, StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import * as React from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from "react";

export default function HomeScreen({ navigation }) {
    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('store1');
    const [items, setItems] = useState([
        {label: 'Store 1', value: 'store1'},
        {label: 'Store 2', value: 'store2'},
        {label: 'Store 3', value: 'store3'}
    ]);

    return (
        <>
            <View style={styles.screenContainer}>
                <Image style={{width: 130, height: 130, marginBottom: 50, alignSelf: "center"}} source={require('../public/images/ncr-logo1.png')}/>
                <Text style={styles.title}>Please Select a Store</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <AppButton
                    title="GO TO STORE"
                    onPress={() => navigation.navigate('Profile')}
                />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#2f3640",
        marginBottom: 30
    },
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#4682B4",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 50
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})