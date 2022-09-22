import { createContext, useEffect, useState } from "react";
import useWebsocket, { ConnectionStatus } from "../../state/websocket";
import useUser from "./../../state/user";
import { useAppState } from "./../../state/index";

interface WebsocketContext {
  myPeerId: string;
  socketRef: React.MutableRefObject<WebSocket>;
  connectionStatus: ConnectionStatus;
}

export const WebsocketContext = createContext({} as WebsocketContext);

const WebsocketProvider = ({ children }) => {

    const {
        state: { settings },
        handleReceivedMessage,
        updateSettings,
    } = useAppState();
 
    const websocket = useWebsocket(settings);
    const { socketRef } = websocket;
    const connectionStatus = websocket.state.status;

    const user = useUser(settings);
    const { myPeerId } = user?.state;

    useEffect(() => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsed = JSON.parse(userData);
      updateSettings({
        apiEndpoint: parsed.apiEndpoint,
        apiToken: parsed.apiToken,
      }) 
    }

      if (!myPeerId || !socketRef.current) return;
      socketRef.current.addEventListener("message", handleReceivedMessage);

      return () => {
        if (!socketRef.current) return;
        socketRef.current.removeEventListener("message", handleReceivedMessage);
      };
    }, [myPeerId, socketRef.current]);
  

  return (
    <WebsocketContext.Provider value={{ myPeerId, socketRef, connectionStatus }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
