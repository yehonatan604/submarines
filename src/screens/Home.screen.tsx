import { StackNavigationProp } from "@react-navigation/stack";
import { Button, View } from "react-native";

const HomeScreen = ({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
  return (
    <View>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default HomeScreen;
