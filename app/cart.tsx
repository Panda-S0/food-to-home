import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native"
import { featured } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { selectRestaurant } from "../slices/restautantSlice"
import { removeFromCart, selectCartItems, selectCartTotal } from "../slices/cartSlice"
import { useEffect, useState } from "react"
import { urlFor } from "../sanity"
// import { LinearGradient } from "expo-linear-gradient";

export default function cart() {
  const restaurant = useSelector(selectRestaurant)
  // const restaurant = featured.restaurants[0]

  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const [groupedItems,setGroupedItems]=useState({})
  const dispatch = useDispatch()
  const deleveryFee = 2

  useEffect(()=>{
    const items=cartItems.reduce((group,item)=>{
      if (group[item.id]){
        group[item.id].push(item)
      }else{
        group[item.id]=[item]
      }
      return group
    },{})
    setGroupedItems(items)
  },[cartItems])

  return (
    // <LinearGradient
    //   colors={["rgba(255,255,255,0.1)", "black"]} // Gradient colors (top to bottom)
    //   start={{ x: 0, y: -0.1 }} // Gradient starts at the top-left
    //   end={{ x: 0, y: 0.1 }} // Gradient ends at the bottom-left
    //   style={styles.overlay}
    // >
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Ionicons
            size={45}
            name="arrow-back-circle"
            color={"orange"}
          ></Ionicons>
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.title}>Your cart</Text>
          <Text style={styles.resturantName}>{restaurant.name}</Text>
        </View>
        <View style={styles.deleveryView}>
          <Image
            source={require("../assets/images/bike.png")}
            style={styles.bike}
          />
          <Text>Deliver in 20-30 minutes</Text>
          <TouchableOpacity>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {Object.entries(groupedItems).map(([key, items]) => {
            let dish=items[0]
            return (
              <View key={key} style={styles.dish}>
                <Text style={styles.count}>{items.length} X</Text>
                <Image style={styles.dishImg} source={{uri:urlFor(dish.image).url()}} />
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>${dish.price}</Text>
                <TouchableOpacity onPress={() => dispatch(removeFromCart({id:dish._id}))}>
                  <Ionicons
                    size={45}
                    name="remove-circle"
                    color={"orange"}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.totalView}>
          <View style={styles.totalTextView}>
            <Text style={styles.totalText}>Subtotal</Text>
            <Text style={styles.totalText}>${cartTotal}</Text>
          </View>
          <View style={styles.totalTextView}>
            <Text style={styles.totalText}>Delivery Fee</Text>
            <Text style={styles.totalText}>${deleveryFee}</Text>
          </View>
          <View style={styles.totalTextView}>
            <Text style={styles.orderTotal}>Order Total</Text>
            <Text style={styles.orderTotal}>${deleveryFee+cartTotal}</Text>
          </View>
          <TouchableOpacity style={styles.totalButton} onPress={() => router.push({
                    pathname: "../loading",
                    // params:{itemID: item.id }
                  })}>
            <Text style={styles.placeOrder}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </LinearGradient>
  )
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    height: "95%",
    width: "100%",
    backgroundColor: "#eee",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  button: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  titleView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "black" },
  resturantName: { fontSize: 15, color: "gray" },
  deleveryView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFDDaa",
  },
  bike: { width: 60, height: 50 },
  change: { color: "orange", fontWeight: "bold", fontSize: 15 },
  scroll: {
    paddingBottom: 50,
    paddingTop: 10,
  },
  dish: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    // shadowColor: "gold",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 10,
  },
  count: {
    fontSize: 15,
    fontWeight: "bold",
    color: "orange",
  },
  dishImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 5,
  },
  dishName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  dishPrice: {
    // flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  totalView: {
    padding: 20,
    backgroundColor: "#FFDDaa",
    borderRadius: 20,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  totalTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: 10,
  },
  totalText: { color: "grey" },
  orderTotal: { color: "#444", fontWeight: "700" },
  totalButton: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
  },placeOrder:{color:"white",fontWeight:"bold",fontSize:20}
})


