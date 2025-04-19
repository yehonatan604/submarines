import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import useSocket from "../hooks/useSocket";

// Mocked users
const mockPlayers = [
  { id: "1", name: "Captain Nemo" },
  { id: "2", name: "AquaHunter" },
  { id: "3", name: "SeaDog42" },
  { id: "4", name: "KrakenRider" },
  { id: "5", name: "TorpedoTom" },
];

const LobbyScreen = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const { connected } = useSocket();

  console.log("Socket connected:", connected);

  const handleInvite = (playerName: string) => {
    // Here you'd emit a socket event
    Toast.show({
      type: "success",
      text1: `Invite sent to ${playerName}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Players</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => handleInvite(item.name)}
            >
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Toast />
    </View>
  );
};

export default LobbyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  playerName: {
    fontSize: 18,
    color: "#fff",
  },
  inviteButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  inviteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
