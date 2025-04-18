import Toast from "react-native-toast-message";
import AuthProvider from "./src/context/providers/Auth.provider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
