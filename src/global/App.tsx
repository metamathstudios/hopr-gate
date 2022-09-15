import React, { useState } from "react";
import Content from "../components/Content";
import Github from "../components/Github";
import Header from "../components/Header";
import Popup from "../components/Popup";
import { AppContext, InterfaceType } from "../contexts/AppContext";
import styles from "./styles.module.scss";

const App: React.FC = () => {
  const [interfaceType, setInterfaceType] = useState<InterfaceType>(
    InterfaceType.USER
  );
  const [popup, setPopup] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ interfaceType, setInterfaceType, popup, setPopup }}
    >
      <div className={styles.app}>
        <Header />
        <Content />
        <Github />
        {popup && <Popup />}
      </div>
    </AppContext.Provider>
  );
};

export default App;
