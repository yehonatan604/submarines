import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";
import { TUser } from "../types/TUser";

const HomeScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
  const { user, handleLogout } = useAuth();

  return (
    <View>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text>Welcome {user ? (user as TUser).name : "Guest"}</Text>
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
