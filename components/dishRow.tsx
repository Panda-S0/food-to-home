import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart, selectCartItems, selectCartItemsById } from "../slices/cartSlice"
import { urlFor } from "../sanity"

export default function DishRow({ item }) {
  // console.log(item)
  
  const dispatch = useDispatch()
  const totalItems = useSelector(state =>selectCartItemsById(state,item._id))

  const handleIncrease =()=>{
    dispatch(addToCart({...item}))
  }
  const handleDecrease =()=>{
    dispatch(removeFromCart({id:item._id}))
  }

  return (
    <View style={styles.cardView}>
      <Image source={{uri:urlFor(item.image).url()}} style={styles.img} />
      <View style={styles.textView}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.payment}>
            <TouchableOpacity style={styles.button} onPress={handleDecrease} disabled={!totalItems?.length}>
          <Ionicons
            size={20}
            name="remove"
            color={"white"}
          ></Ionicons></TouchableOpacity>
            <Text style={styles.count}>{totalItems?.length}</Text>
          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Ionicons
          size={20}
          name="add"
          color={"white"}
        ></Ionicons></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 5,
    borderRadius: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  textView: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 10,
  },
  info: { paddingLeft: 10 },
  name: { fontWeight: "bold", fontSize: 15 },
  priceView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  price: { fontWeight: "bold" },
  payment: {
    flexDirection: "row",
    alignItems: "center",
  },button:{
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"orange",
  },count:{paddingHorizontal:10}
})
