import { useImmer } from "use-immer";
import { decode } from "rlp";
import { getUrlParams } from "../lib/url";

export type Settings = {
  apiEndpoint: string;
  apiToken?: string;
};

export type State = {
  settings: Settings;
};

export const isSSR: boolean = typeof window === "undefined";

export const DEFAULT_SETTINGS: Settings = {
  apiEndpoint: "http://localhost:3001",
};

const useAppState = () => {
  const urlParams = !isSSR ? getUrlParams(window.location) : {};
  const [state, setState] = useImmer<State>({
    settings: {
      apiEndpoint: urlParams.apiEndpoint || DEFAULT_SETTINGS.apiEndpoint,
      apiToken: urlParams.apiToken,
    },
  });

  const updateSettings = (settings: Partial<Settings>) => {
    setState((draft) => {
      for (const [k, v] of Object.entries(settings)) {
        (draft.settings as any)[k] = v;
      }
      return draft;
    });
  }

    const decodeMessage = (msg: string): string => {
      let uint8Array = new Uint8Array(JSON.parse(`[${msg}]`));
      let decodedArray = decode(uint8Array);
      if (decodedArray[0] instanceof Uint8Array) {
        return new TextDecoder().decode(decodedArray[0]);
      }
      throw Error(`Could not decode received message: ${msg}`);
    };

    const handleReceivedMessage = async (ev: MessageEvent<string>) => {
      try {
        const data = decodeMessage(ev.data);
        console.log("WebSocket Data: ", data);

        const message = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
    };

    return {
      state: {
        ...state,
      },
      updateSettings,
      handleReceivedMessage,
    };
  };


export default useAppState;
