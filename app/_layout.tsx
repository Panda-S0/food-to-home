import { Stack } from "expo-router"
import { LogBox, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {Provider} from "react-redux"
import { store } from "../store"

const RootLayout = () => {
  LogBox.ignoreLogs(['Expected `onHeaderHeightChange` listener to be a function']);
  // return(<View style={{flex:1,backgroundColor:"cyan"}}></View>)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="restaurant"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen
          name="loading"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="delivery"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack></Provider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
