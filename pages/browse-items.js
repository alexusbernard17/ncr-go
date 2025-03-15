import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function BrowseItemsScreen({ navigation }) {
    const NavigationButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.navigationButtonContainer}>
            <Text style={styles.navigationButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const AddButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>{title}</Text>
        </TouchableOpacity>
    );


    const [itemsStockList, setItemsStockList] = React.useState([]);


    function getItems() {

        let temp = [
            {
                name: 'Beans',
                avatar_url: 'https://thumbs.dreamstime.com/b/tin-baked-beans-18166240.jpg',
                stock: false,
                aisle: null
            },
            {
                name: 'Cereal',
                avatar_url: 'https://res.cloudinary.com/general-mills/image/upload/products/00016000124790_C1N1_s301_09884e07-b3fd-4208-9171-650559f5a0de.jpg',
                stock: false,
                aisle: null
            },
            {
                name: 'Chips',
                avatar_url: 'https://www.meijer.com/content/dam/meijer/product/0002/84/0019/91/0002840019914_1_A1C1_0600.png',
                stock: false,
                aisle: null
            },
            {
                name: 'Milk',
                avatar_url: 'https://i5.walmartimages.com/asr/3a9975ee-c251-4351-8ec5-555fcd0d3053.83ec7f54fec7f767085c358714884bdd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
                stock: false,
                aisle: null
            },
            {
                name: 'Water',
                avatar_url: 'https://i5.walmartimages.com/asr/b631589a-5e1c-45f3-bf0a-df721e733bec.54aa57b58162f8527542b4aeef6a35a7.jpeg',
                stock: false,
                aisle: null
            },
        ]

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
            temp.forEach(element => {
                if (!data.products[element.name.toLowerCase()].inStock) {
                    element.stock = false
                    element.aisle = null
                } else {
                    element.stock = true
                    element.aisle = data.products[element.name.toLowerCase()].aisle
                }
            });

            setItemsStockList(temp);
            
        }).catch((err) => console.log(err))
    }
                                                                
       
    React.useEffect(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                              jiop   c                                                                                              
        let interval = setInterval(getItems, 5000);                                                                                                            
        return () => {                                                                       
            clearInterval(interval)                  
        }
    }, []);

    const [shoppingList, setShoppingList] = React.useState([]);
    exports.shoppingList = shoppingList;

    const showToast = (item) => {
        Toast.show({
            type: 'success',
            text1: 'Item Added to Shopping List',
        });
        setShoppingList(shoppingList => [...shoppingList, item])
    }

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}> Browse Items </Text>
            <View style={{flexDirection: 'row'}}>
                 <Text style={styles.storeText}>STORE 1</Text>
                 <View style={{marginLeft: '60%'}}>
                    <Icon size={55} color="#696969" name="account-circle" onPress={() => navigation.navigate('Profile')}/>
                 </View>
            </View>
            <View style={{ paddingBottom: 50 }}>
                {
                    itemsStockList.map((l, i) => (
                        <ListItem containerStyle={{backgroundColor:"#F8F8FF", borderRadius:10}} key={i} bottomDivider>
                            <Avatar source={{uri: l.avatar_url}} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                {
                                    l.stock ?
                                        <>
                                            <ListItem.Subtitle style={{ color: 'green' }}>In Stock</ListItem.Subtitle>
                                            <ListItem.Subtitle style={{ color: 'green' }}>Aisle: {l.aisle}</ListItem.Subtitle>
                                            <View>
                                                <AddButton style={{marginTop: '10'}}
                                                           title="ADD"
                                                           onPress={() => showToast(l)}
                                                />
                                            </View>
                                        </> :
                                        <>
                                            <ListItem.Subtitle style={{ color: 'red' }}>Out of Stock</ListItem.Subtitle>
                                        </>
                                }
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            <NavigationButton style={{marginTop: '10'}}
                title="My Shopping List"
                onPress={() => navigation.navigate('Shopping List')}
            />
            <NavigationButton
                title="Stores"
                onPress={() => navigation.navigate('Select Store')}
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
    navbarContainer: {
        flexDirection: "row",
        marginBottom: 100
    },
    navigationButtonContainer: {
        elevation: 8,
        backgroundColor: "#4682B4",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#2f3640",
        marginTop: 20
      },
    addButtonContainer: {
        elevation: 8,
        backgroundColor: "#4682B4",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 5,
        marginBottom: 5
    },
    storeText: {
        fontSize: 20,
        color: "black",
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    navigationButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    addButtonText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
