import React, { useState } from "react";
import Content from "../../components/Content";
import Github from "../../components/Github";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import { AppContext } from "../../contexts/AppContext";
import WebsocketProvider from "../../contexts/WebsocketProvider";
import RelayerStateProvider from "../../contexts/RelayerStateProvider";
import styles from "./styles.module.scss";

const User: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);

  return (
    <WebsocketProvider>
      <RelayerStateProvider>
        <AppContext.Provider value={{ popup, setPopup }}>
          <div className={styles.app}>
            <Header />
            <Content interfaceType="USER" />
            <Github />
            {popup && <Popup />}
          </div>
        </AppContext.Provider>
      </RelayerStateProvider>
    </WebsocketProvider>
  );
};

export default User;
