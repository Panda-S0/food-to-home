import { router } from "expo-router"
import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { selectCartItems, selectCartTotal } from "../slices/cartSlice"

export default function CartIcon() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  if(!cartItems?.length)return
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() =>
              router.push({
                pathname: "../cart",
              })
            } 
      style={styles.touchable}>
        <View style={styles.countView}>
          <Text style={styles.count}>{cartItems?.length}</Text>
        </View>
        <Text style={styles.count}>View Cart</Text>
        <Text style={styles.count}>${cartTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    zIndex: 500,
    shadowColor: "#0f0",
    shadowRadius: 100,
    shadowOpacity: 0.5,
    shadowOffset: { width: 100, height: 100 },
  },
  touchable: {
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 100,
  },
  countView: {
    // padding: 8,
    // paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 1000,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  count: { color: "white", fontWeight: "700",fontSize:18 },
})
