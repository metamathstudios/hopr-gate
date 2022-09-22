import { createContext, useEffect, useState } from "react";
import useWebsocket, { ConnectionStatus } from "../../state/relayerws";
import { useRelayerState } from "../../state";
import { ethers } from "ethers";
import { getRelayerConfig } from "../../lib/url";

interface RelayerStateContext {
  socketRef: React.MutableRefObject<WebSocket>;
  relayerStatus: boolean;
  eventsList: any[];
}

export const RelayerStateContext = createContext({} as RelayerStateContext);

const RelayerStateProvider = ({ children }) => {
  const {
    relayerState: { settings },
    handleReceivedMessage,
    updateSettings,
  } = useRelayerState();

  const [eventsList, setEventsList] = useState<any[]>([]);
  const [rpcVitals, setRpcVitals] = useState<boolean>(false);
  const [relayerStatus, setRelayerStatus] = useState(false);

  const websocket = useWebsocket(settings);
  const { socketRef } = websocket;
  const connectionStatus = websocket.state.status;

  const relayerConfig = getRelayerConfig();
  const provider = relayerConfig
    ? new ethers.providers.JsonRpcProvider(relayerConfig.rpcEndpoint)
    : undefined;

  const sendRpcMethod = async (method: string, ...args) => {
    provider.send(method, [...args]).then((res) => {
      return res;
    });
  };

  const checkRpcVitals = async () => {
    provider.send("eth_chainId", []).then((res) => {
      if(res !== undefined){
        setRpcVitals(true);
        eventsList.push(res);
      } else {
        setRpcVitals(false);
      }
    });
    
  };

  useEffect(() => {
      if (connectionStatus === "CONNECTED" && rpcVitals) {
      setRelayerStatus(true);
      } else {
      setRelayerStatus(false);
      }
  }, [connectionStatus, rpcVitals]);

  useEffect(() => {
    const relayerData = localStorage.getItem("relayerData");

    if (relayerData) {
      const parsed = JSON.parse(relayerData);
      updateSettings({
        apiEndpoint: parsed.apiEndpoint,
        apiToken: parsed.apiToken,
      });
    }

    checkRpcVitals();

    if (!socketRef.current) return;
    socketRef.current.addEventListener("message", handleReceivedMessage);

    return () => {
      if (!socketRef.current) return;
      socketRef.current.removeEventListener("message", handleReceivedMessage);
    };
  }, [socketRef.current]);

  return (
    <RelayerStateContext.Provider
      value={{
        socketRef,
        relayerStatus,
        eventsList,
      }}
    >
      {children}
    </RelayerStateContext.Provider>
  );
};

export default RelayerStateProvider;
