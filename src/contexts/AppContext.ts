import { createContext, Dispatch, SetStateAction } from "react";

export enum InterfaceType {
  USER = "user",
  RELAYER = "relayer",
}

interface ContextType {
  interfaceType: InterfaceType;
  setInterfaceType: Dispatch<SetStateAction<InterfaceType>>;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext({} as ContextType);
