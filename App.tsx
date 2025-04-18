import AuthProvider from "./src/context/providers/Auth.provider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     gap: "5%",
//   },
//   box: {
//     width: "80%",
//     height: "35%",
//     borderWidth: 1,
//     borderColor: "black",
//   },
