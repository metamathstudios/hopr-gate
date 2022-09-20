import { createContext, useEffect, useState } from "react";
import useWebsocket from "../../state/websocket";
import useUser from "./../../state/user";
import useAppState from "./../../state/index";

interface WebsocketContext {
  myPeerId: string;
  socketRef: React.MutableRefObject<WebSocket>;
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

    const user = useUser(settings);
    const { myPeerId } = user?.state;

    useEffect(() => {
      if (!myPeerId || !socketRef.current) return;
      socketRef.current.addEventListener("message", handleReceivedMessage);

      return () => {
        if (!socketRef.current) return;
        socketRef.current.removeEventListener("message", handleReceivedMessage);
      };
    }, [myPeerId, socketRef.current]);
  

  return (
    <WebsocketContext.Provider value={{ myPeerId, socketRef }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
