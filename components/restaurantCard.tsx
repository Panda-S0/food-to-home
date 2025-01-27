import { Ionicons } from "@expo/vector-icons"
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native"
import { router } from "expo-router"
import { urlFor } from "../sanity"

export default function RestaurantCard({ item }) {
  // console.log(typeof(item))
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        router.push({
          pathname: "../restaurant",
          params: { item: JSON.stringify(item) }, // Serialize the object
        })
      }
    >
      <View style={styles.card}>
        <Image style={styles.img} source={{uri:urlFor(item.image).url()}} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.rate}>
            <Ionicons name="star" color="gold" />
            <Text>
              <Text>{item.stars}</Text>
              <Text>
                ({item.reviews}review){" "}
                <Text style={styles.cat}>{item.type.name}</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.location}>
            <Ionicons name="location-outline" color="gray" />
            <Text>Nearby {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginRight: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "gold",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  img: { width: 100, height: 100 },
  details: { paddingHorizontal: 3, paddingBottom: 4 },
  name: { fontWeight: "bold", paddingTop: 2 },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: { width: 15, height: 15 },
  cat: {
    fontWeight: "500",
    flexDirection: "row",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})
