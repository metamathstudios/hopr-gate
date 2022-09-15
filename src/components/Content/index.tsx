import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { MethodDropdownOptions, RelayerDropdownOptions } from "../../constants";
import { AppContext, InterfaceType } from "../../contexts/AppContext";
import styles from "./styles.module.scss";

const Content: React.FC = () => {
  const { interfaceType, setInterfaceType } = useContext(AppContext);
  const [relayerStatus, setRelayerStatus] = useState(false);

  useEffect(() => {
    const previewArea = document.getElementById(
      "preview"
    ) as HTMLTextAreaElement;

    const slug = {
      oi: "Phill",
      tudo: "bom?",
    };

    previewArea.value = JSON.stringify(slug, undefined, 4);
  }, []);

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div
            className={styles.user}
            onClick={() => setInterfaceType(InterfaceType.USER)}
            style={
              interfaceType === InterfaceType.USER
                ? {
                    background:
                      "linear-gradient(180deg, #000000 0%, #0202b3 100%)",
                    cursor: "default",
                    color: "white",
                  }
                : { background: "white", cursor: "pointer", color: "black" }
            }
          >
            User
          </div>
          <div
            className={styles.relayer}
            onClick={() => setInterfaceType(InterfaceType.RELAYER)}
            style={
              interfaceType === InterfaceType.RELAYER
                ? {
                    background:
                      "linear-gradient(180deg, #000000 0%, #0202b3 100%)",
                    cursor: "default",
                    color: "white",
                  }
                : { background: "white", cursor: "pointer", color: "black" }
            }
          >
            Relayer
          </div>
        </div>

        <div className={styles.interface}>
          {interfaceType === InterfaceType.USER && (
            <>
              <div className={styles.columns} style={{ height: "410px" }}>
                <div className={styles.left}>
                  <div className={styles.form}>
                    <div className={styles.relayerSelect}>
                      <div className={styles.title}>
                        <label>Relayer Address:</label>
                      </div>
                      <Dropdown
                        fluid
                        selection
                        options={RelayerDropdownOptions}
                      />
                    </div>

                    <div className={styles.method}>
                      <div className={styles.title}>
                        <label>Method:</label>
                      </div>
                      <Dropdown
                        fluid
                        selection
                        options={MethodDropdownOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.preview}>
                    <div className={styles.title}>
                      <label htmlFor="preview">Preview</label>
                    </div>
                    <textarea
                      name="preview"
                      id="preview"
                      cols={45}
                      rows={10}
                    ></textarea>
                  </div>

                  <div className={styles.response}>
                    <div className={styles.title}>
                      <label htmlFor="response">Response</label>
                    </div>
                    <textarea
                      name="response"
                      id="response"
                      cols={45}
                      rows={10}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={styles.sendButton}>Send Request</div>
            </>
          )}

          {interfaceType === InterfaceType.RELAYER && (
            <>
              <div className={styles.columns} style={{ height: "500px" }}>
                <div className={styles.left}>
                  <div className={styles.form}>
                    <div className={styles.apiURL}>
                      <div className={styles.title}>
                        <label>Relayer API URL:</label>
                      </div>
                      <input
                        type="text"
                        name="RELAYER_API_URL"
                        id="RELAYER_API_URL"
                      />
                    </div>

                    <div className={styles.apiKEY}>
                      <div className={styles.title}>
                        <label>Relayer API KEY:</label>
                      </div>
                      <input
                        type="text"
                        name="RELAYER_API_KEY"
                        id="RELAYER_API_KEY"
                      />
                    </div>

                    <div className={styles.apiENDPOINT}>
                      <div className={styles.title}>
                        <label>Relayer RPC Endpoint:</label>
                      </div>
                      <input
                        type="text"
                        name="RELAYER_API_ENDPOINT"
                        id="RELAYER_API_ENDPOINT"
                      />
                    </div>

                    <div className={styles.relayerStatus}>
                      <div
                        className={styles.ball}
                        style={
                          relayerStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Relayer {relayerStatus ? "On-line" : "Off-line"}
                    </div>
                  </div>

                  <div className={styles.saveButton}>Save</div>
                </div>
                <div className={styles.right}>
                  <div className={styles.logs}>
                    <div className={styles.title}>
                      <label htmlFor="logs">Logs</label>
                    </div>
                    <textarea
                      name="logs"
                      id="logs"
                      cols={45}
                      rows={26}
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
