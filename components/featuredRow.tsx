import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  ScrollView,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import RestaurantCard from "./restaurantCard"

export default function FeaturedRow({ title, restaurants, description }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeall}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollcontent}
        style={styles.scroll}
      >
        {restaurants.map((restaurant, index) => {
          return (
            <RestaurantCard
                item={restaurant}
                key={index}
                />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  title: {
    fontWeight: "bold",
  },
  description: { color: "gray" },
  seeall: {
    color: "orange",
    fontWeight: "500",
  },
  scrollcontent: {
    paddingHorizontal: 15,
  },
  scroll: {
    // overflow: "hidden",
    paddingVertical:5
  },
})
