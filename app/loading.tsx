import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View,  StyleSheet, Image } from 'react-native';

export default function Loading() {
    // console.log(`GO BACK: ${router.canGoBack()}`)
    useEffect(() => {
        setTimeout(() => {
            router.push({
                pathname: "./delivery",
                // params:{itemID: item.id }
              })
        }, 3000);
    },[])
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/route.gif')} style={styles.image}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },image:{
        width:200,
        height:200
    }
});
