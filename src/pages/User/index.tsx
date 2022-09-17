import React, { useState } from "react";
import Content from "../../components/Content";
import Github from "../../components/Github";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import { AppContext } from "../../contexts/AppContext";
import styles from "./styles.module.scss";

const User: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ popup, setPopup }}>
      <div className={styles.app}>
        <Header />
        <Content interfaceType="USER" />
        <Github />
        {popup && <Popup />}
      </div>
    </AppContext.Provider>
  );
};

export default User;
