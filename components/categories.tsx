import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import { getCategories } from "../api"
import { urlFor } from "../sanity"

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollcontent}
      >
        {categories.map((category, index) => {
          let isActive = category._id == activeCategory
          return (
            <View key={index} style={styles.category}>
              <TouchableOpacity
                style={[
                  styles.touch,
                  isActive
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "lightgray" },
                ]}
                onPress={() => setActiveCategory(category._id)}
              >
                <Image style={styles.img} source={{uri:urlFor(category.image).url()}}></Image>
              </TouchableOpacity>
              <Text
                style={[
                  styles.name,
                  isActive
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" },
                ]}
              >
                {category.name}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  scroll: {
    overflow: "visible",
  },
  scrollcontent: {
    paddingHorizontal: 15,
  },
  category: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  touch: {
    padding: 5,
    borderRadius: 100,
  },
  img: { width: 45, height: 45, },
  name: {
    fontSize: 14,
    lineHeight: 20,
  },
})
