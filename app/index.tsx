import { Pressable, StyleSheet, Text, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { Link, router } from "expo-router"
import Categories from "../components/categories"
import { featured } from "../constants"
import FeaturedRow from "../components/featuredRow"
import { useEffect, useState } from "react"
import { getFeaturedRestaurants } from "../api"

export default function HomePage() {
  const [FeaturedRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      // console.log(data[0].description)
      setFeaturedRestaurants(data)
    })
  }, [])

  return (
    <SafeAreaView style={styles.safeare}>
      <View style={styles.searcharea}>
        <View style={styles.searchbar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="gray"
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="Meals"
            placeholderTextColor="gray"
          />

          <View style={styles.location}>
            <Ionicons
              name="location-outline"
              size={20}
              color="gray"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>New York, NYC</Text>
          </View>
        </View>
        <Ionicons name="filter" size={24}></Ionicons>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.catscroll}
      >
        <Categories />
        <View style={styles.featured}>
          {FeaturedRestaurants.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeare: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffe",
  },
  searcharea: {
    padding: 10,
    backgroundColor: "#ffe",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#000",
  },
  catscroll: {
    paddingBottom: 20,
  },
  featured: {
    marginTop: 5,
  },
})
