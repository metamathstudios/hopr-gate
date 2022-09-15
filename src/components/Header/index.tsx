import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const { setPopup } = useContext(AppContext);

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
          <img src="/images/logo.svg" alt="Logo" />
        </div>
        <div className={styles.right}>
          <span>Not connected</span>
          <img
            src="/images/gear.svg"
            alt="Logo"
            onClick={() => setPopup(true)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
