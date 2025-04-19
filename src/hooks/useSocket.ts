import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import socketContext from "../context/socket.context";
import { TRootStackParamList } from "../types/TRootStackParamList";
import useAuth from "./useAuth";

const useSocket = () => {
    const { user } = useAuth();
    const { socket, connect, connected, on, emit, isAvailable } = useContext(socketContext);
    const [players, setPlayers] = useState<any[]>([]);
    const { navigate } = useNavigation<NavigationProp<TRootStackParamList>>();

    const joinLobby = () => {
        if (socket && user?._id) {
            socket.emit("join-lobby", { userId: user._id });
        }
    };

    const sendInvetation = (playerId: string) => {
        if (socket && user) {
            socket.emit("send-invitation", { toId: playerId });
        }
    }

    useEffect(() => {
        if (!connected) connect();
    }, [connected]);

    useEffect(() => {
        if (socket) {
            const availablePlayershandler = (playerList: any[]) => {
                setPlayers(playerList);
            };

            const invetationHandler = (fromId: string) => {
                Alert.alert(
                    "Invitation",
                    `You have received an invitation from ${fromId}`,
                    [
                        {
                            text: "Accept",
                            onPress: () => {
                                socket.emit("accept-invitation", { toId: fromId });
                                Toast.show({
                                    type: "success",
                                    text1: `Invitation accepted from ${fromId}`,
                                });
                            },
                        },
                        {
                            text: "Decline",
                            onPress: () => {
                                socket.emit("reject-invitation", { toId: fromId });
                                Toast.show({
                                    type: "error",
                                    text1: `Invitation declined from ${fromId}`,
                                });
                            },
                        },
                    ]
                );
            }

            const handleAccepted = ({ from }: { from: string }) => {
                Toast.show({
                    type: "success",
                    text1: `${from} accepted your invitation!`,
                });
                navigate("Room", { playerId: from });
            };

            const handleRejected = ({ from }: { from: string }) => {
                Toast.show({
                    type: "error",
                    text1: `${from} rejected your invitation.`,
                });
            };

            socket.on("available-users", availablePlayershandler);
            socket.on("invitation", invetationHandler);
            socket.on("invitation-accepted", handleAccepted);
            socket.on("invitation-rejected", handleRejected);

            return () => {
                socket.off("available-users", availablePlayershandler);
                socket.off("invitation", invetationHandler);
                socket.off("invitation-accepted", handleAccepted);
                socket.off("invitation-rejected", handleRejected);
            };
        }
    }, [socket]);

    return {
        socket,
        connect,
        connected,
        on,
        emit,
        isAvailable,
        players,
        user,
        joinLobby,
        sendInvetation,
    };
};

export default useSocket;
