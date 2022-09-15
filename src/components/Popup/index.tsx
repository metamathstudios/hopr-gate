import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import styles from "./styles.module.scss";

const Popup: React.FC = () => {
  const { setPopup } = useContext(AppContext);

  return (
    <div className={styles.popup}>
      <div className={styles.background} onClick={() => setPopup(false)} />
      <div className={styles.settings}>
        <img
          src="/images/close.svg"
          alt="Close"
          onClick={() => setPopup(false)}
        />
        <div className={styles.title}>HOPR Node Settings</div>
        <div className={styles.form}>
          <div className={styles.item}>
            <div className={styles.title}>
              <label htmlFor="API_URL">API URL:</label>
            </div>
            <input type="text" name="API_URL" id="SETTINGS_API_URL" />
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              <label htmlFor="API_URL">Security Token:</label>
            </div>
            <input type="text" name="API_URL" id="SETTINGS_API_URL" />
          </div>

          <div className={styles.saveButton}>Save</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
