import React, { useState } from "react";
import Content from "../../components/Content";
import Github from "../../components/Github";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import { AppContext } from "../../contexts/AppContext";
import WebsocketProvider from "../../contexts/WebsocketProvider";
import styles from "./styles.module.scss";

const User: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);

  return (
    <WebsocketProvider>
    <AppContext.Provider value={{ popup, setPopup }}>
      <div className={styles.app}>
        <Header />
        <Content interfaceType="USER" />
        <Github />
        {popup && <Popup />}
      </div>
    </AppContext.Provider>
    </WebsocketProvider>
  );
};

export default User;
