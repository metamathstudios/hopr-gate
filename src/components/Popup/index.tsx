import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import styles from "./styles.module.scss";

const Popup: React.FC = () => {
  const { setPopup } = useContext(AppContext);
  const [ url, setUrl ] = useState('');
  const [ token, setToken ] = useState('');

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
            <input type="text" name="API_URL" id="SETTINGS_API_URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>
              <label htmlFor="API_URL">API Token:</label>
            </div>
            <input type="text" name="API_URL" id="SETTINGS_API_URL" value={token} onChange={(e) => setToken(e.target.value)}/>
          </div>

          <div className={styles.saveButton} onClick={() => console.log(url + token)}>Save</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
