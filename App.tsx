import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import AuthProvider from "./src/context/providers/Auth.provider";
import { SocketProvider } from "./src/context/providers/Socket.provider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <AppNavigator />
        <Toast />
      </SocketProvider>
    </AuthProvider>
  );
}
