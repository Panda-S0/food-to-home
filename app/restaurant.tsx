import {
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, useLocalSearchParams, router } from "expo-router"
import { featured } from "../constants"
import { Ionicons } from "@expo/vector-icons"
import DishRow from "../components/dishRow"
import CartIcon from "../components/cartIcon"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setRestaurant } from "../slices/restautantSlice"
import { emptyCart } from "../slices/cartSlice"
import { urlFor } from "../sanity"

const { width, height } = Dimensions.get("window")

const percentageWidth = (percentage) => (percentage / 100) * width
const percentageHeight = (percentage) => (percentage / 100) * height

// const getRestaurantbyId = (id) => {
//   return featured.restaurants.find((restaurant) => restaurant.id === +id)
// }

export default function Restaurant() {
  const { item } = useLocalSearchParams<{ item: string }>()
  const parsedItem = JSON.parse(item)

  const dispatch = useDispatch()
  useEffect(() => {
    if (parsedItem && parsedItem._id) {
      dispatch(setRestaurant({ ...parsedItem }))
    }
  }, [])

  const goBack = () => {
    // dispatch(emptyCart())
    router.back()
  }

  return (
    <>
      <CartIcon />
      {/* <StatusBar style="dark" /> */}
      <ScrollView style={styles.safeare}>
        <View style={styles.topbannerView}>
          <Image style={styles.image} source={{uri:urlFor(parsedItem.image).url()}}></Image>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Ionicons
              size={60}
              name="arrow-back-circle"
              color={"yellow"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.name}>{parsedItem.name}</Text>
          <View style={styles.info}>
            <Ionicons name="star" color="gold" />
            <Text>
              <Text>{parsedItem.stars}</Text>
              <Text>
                ({parsedItem.reviews}review){" "}
                <Text style={styles.cat}>{parsedItem.type.name}</Text>
              </Text>
            </Text>
            <Ionicons name="location-outline" color="gray" />
            <Text>Nearby {parsedItem.address}</Text>
          </View>
          <Text style={styles.discreptionText}>{parsedItem.description}</Text>
        </View>
        <View style={styles.dishesView}>
          <Text style={styles.menuText}>Menu</Text>
          {parsedItem?.dishes.map((dish, index) => (
            <DishRow item={{ ...dish }} key={index} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  safeare: {
    flex: 1,
    backgroundColor: "#eee",
  },
  topbannerView: {
    flexDirection: "column",
    backgroundColor: "#ee7777",
  },
  image: {
    width: "100%",
    height: percentageHeight(35),
    // backgroundColor: "#eee",
  },
  button: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  discreptionText: {
    color: "#555",
    paddingTop: 10,
  },
  infoView: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 20,
  },
  name: { fontWeight: "bold", paddingTop: 2, fontSize: 35 },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cat: {
    fontWeight: "500",
    flexDirection: "row",
  },
  dishesView: {
    flex: 1,
    backgroundColor: "#eee",
    paddingBottom: 100,
  },
  menuText: { fontSize: 25, fontWeight: "bold", paddingLeft: 20 },
})
