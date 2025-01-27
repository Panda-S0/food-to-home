import { router } from "expo-router"
import {
  View,
  StyleSheet,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native"
import { featured } from "../constants"
import MapView, { Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import { selectRestaurant } from "../slices/restautantSlice"
import { emptyCart } from "../slices/cartSlice"

export default function Delivery() {
  const restaurant = useSelector(selectRestaurant)
  // const restaurant = featured.restaurants[0]
  // console.log(restaurant)
  const dispatch = useDispatch()

  const cancleOrder = () => {
    dispatch(emptyCart())
    router.replace({ pathname: "./" })
  }

  return (
    <View style={styles.container}>
      <MapView
        // provider="google"
        compassOffset={{ x: 10, y: 10 }}
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor="orange"
        ></Marker>
      </MapView>
      <View style={styles.lower}>
        <View style={styles.deleveryInfo}>
          <View>
            <Text style={styles.infoText}>Estimated Arrival</Text>
            <Text style={styles.timeText}>20-30 Minutes</Text>
            <Text style={styles.infoText}>Your order is on it's way</Text>
          </View>
          <Image
            source={require("../assets/images/scooter.gif")}
            style={styles.gif}
          />
        </View>
        <View style={styles.deleveryGuy}>
          <View style={styles.deleveryGuyInside}>
            <Image
              style={styles.image}
              source={require("../assets/images/man.png")}
            />
          </View>
          <View style={styles.deleveryGuyInfo}>
            <Text style={styles.deleveryGuyName}>Delevery Guy</Text>
            <Text>Your Guy</Text>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => router.back()}
            >
              <Ionicons size={30} name="call" color={"orange"}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={cancleOrder}>
              <Ionicons size={30} name="close" color={"red"}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  lower: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    // height: 100,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  deleveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: -20,
    // backgroundColor: "red",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
  },
  infoText: {
    // fontSize: 13,
    color: "#666",
  },
  gif: {
    width: 100,
    height: 100,
  },
  deleveryGuy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#FFDDaa",
    padding: 10,
  },
  deleveryGuyInside: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: "orange",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  deleveryGuyInfo: {
    flex: 1,
    marginLeft: 10,
  },
  deleveryGuyName: {
    fontSize: 20,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    // backgroundColor:"red"
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 100,
  },
})
