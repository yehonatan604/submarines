import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/Home.screen";
import LobbyScreen from "../screens/Lobby.screen";
import LoginScreen from "../screens/Login.screen";
import RegisterScreen from "../screens/Register.screen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#0f172a", // ✅ Set your dark background
          },
          headerStyle: {
            backgroundColor: "#0f172a", // (Optional) make header match
          },
          headerTitleStyle: {
            color: "#fff", // ✅ make title white
            fontWeight: "bold", // optional: bold
            fontSize: 20, // optional: larger
          },
          headerTintColor: "#fff", // (Optional) header text color
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
