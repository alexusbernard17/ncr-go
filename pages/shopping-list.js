import {StyleSheet, View, Text, TouchableOpacity, FlatList, Alert} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import axios from "axios";

export default function ShoppingListScreen({ navigation }) {
    const NavigationButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.navigationButtonContainer}>
            <Text style={styles.navigationButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const RemoveButton = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.removeButtonContainer}>
          <Text style={styles.removeButtonText}>{title}</Text>
      </TouchableOpacity>
  );

    const showToast = (itemName) => {
      Toast.show({
          type: 'error',
          text1: 'Item Removed from Shopping List',
      });
      for(var i = 0; i < shoppingList.length; i++){
        if (shoppingList[i].name === itemName) {
            for (var j = 0; j < i; j++) {
                modifiedList.push(shoppingList[j]);
            }
            for (var j = i+1; j < shoppingList.length; j++) {
                modifiedList.push(shoppingList[j]);
            }
            console.log(modifiedList);
            setShoppingList(modifiedList);
            console.log(shoppingList);
        }
    }
  }

    var browseItemsClass = require("./browse-items");

    const [shoppingList, setShoppingList] = React.useState(browseItemsClass.shoppingList);
    var modifiedList = [];

    let alerted = false;

    function getItems() {
        let temp = []
        let apiKey = 'wUjrBtp1G8XtVxhYcgu25ol7J5i7y7ytOFnLuqIHUaAygK37DMI3VRLHQ8u0O9pz'
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apiKey
        }
        axios.post("https://data.mongodb-api.com/app/data-vehyh/endpoint/data/v1/action/findOne", {
            dataSource: "Cluster0",
            database: "store-info",
            collection: "products",
            filter: {storeId: "store0"}
        }, {headers: headers}).then((response) => {
            data = response.data.document

            shoppingList.forEach(element => {
                console.log("testing")
                if (!data.products[element.name.toLowerCase()].inStock) {
                    console.log("stopped")
                    if (!alerted) {
                        alerted = true
                        Alert.alert(
                            "Update",
                            `${element.name} is no longer in stock.`,
                            [
                              { text: "OK", onPress: () => console.log("pressed")}
                            ]
                          );
                          console.log(shoppingList);
                    }
                }
            });
            
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        alerted = false
        let interval = setInterval(getItems, 1000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}> Shopping List </Text>
            <View style={{flexDirection: 'row'}}>
                 <Text style={styles.storeText}>STORE 1</Text>
                 <View style={{marginLeft: '60%'}}>
                    <Icon size={55} color="#696969" name="account-circle" onPress={() => navigation.navigate('Profile')}/>
                 </View>
            </View>
            <View style={{ paddingBottom: 50 }}>
            {
                shoppingList.map((l, i) => (
                    <ListItem containerStyle={{backgroundColor:"#F8F8FF", borderRadius:10}} key={i} bottomDivider>
                        <Avatar source={{uri: l.avatar_url}} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <RemoveButton style={{marginTop: '10'}}
                                    title="Remove"
                                    onPress={() => showToast(l.name)}
                            />
                        </ListItem.Content>
                    </ListItem>
                ))
            }
            </View>
          <NavigationButton style={{marginTop: '0'}}
              title="Add Item"
              onPress={() => navigation.navigate('Browse Items')}
          />
          
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    screen: {
      flex:1,
      padding: 30,
      backgroundColor: "#dcdde1"
    },
    itemlist: {
      marginVertical: 20
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 30,
      color: "#2f3640",
      marginTop: 20
    },
    instructions: {
      textAlign: "center",
      fontStyle: "italic",
      color: "#777"
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    storeText: {
        fontSize: 20,
        color: "black",
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    navigationButtonContainer: {
      elevation: 8,
      backgroundColor: "#4682B4",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 20
    },
    navigationButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
  },
  removeButtonText: {
      fontSize: 13,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
  },
  removeButtonContainer: {
      elevation: 8,
      backgroundColor: "#cc2900",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginTop: 5,
      marginBottom: 5
  },
});
