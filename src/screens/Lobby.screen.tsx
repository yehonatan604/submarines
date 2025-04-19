import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import useSocket from "../hooks/useSocket";

const LobbyScreen = () => {
  const { connected, joinLobby, players, user } = useSocket();

  const handleInvite = (playerId: string) => {
    Toast.show({
      type: "success",
      text1: `Invite sent to ${playerId}`,
    });
  };

  useEffect(() => {
    if (connected) {
      joinLobby();
    }
  }, [connected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Players</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View
            key={item._id}
            style={[
              styles.playerRow,
              user?._id !== item._id && { backgroundColor: "#334155" },
            ]}
          >
            <Text style={styles.playerName}>{item.name}</Text>
            {user?._id !== item._id && (
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => handleInvite(item._id)}
              >
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            )}
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
  disabled: {
    backgroundColor: "#64748b",
  },
  inviteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
