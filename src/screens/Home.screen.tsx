import { StackNavigationProp } from "@react-navigation/stack";
import { Button, StyleSheet, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";
import { TUser } from "../types/TUser";

const HomeScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
  const { user, handleLogout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user ? (user as TUser).name : "Guest"}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title={user ? "Logout" : "Login"}
          onPress={user ? () => handleLogout() : () => navigation.navigate("Login")}
        />
        <Button title="Register" onPress={() => navigation.navigate("Register")} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingTop: "25%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
