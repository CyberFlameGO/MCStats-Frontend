import styles from "./server-card.module.sass";
import { BiUser } from "react-icons/all";

function fixMotd(motd) {
  let max = 128;
  let result = "";

  for (let i = 0; i < max; i++) {
    result += motd[i] || " ";
  }

  return result;
}

export default function ServerCard({ server }) {
  let { hostname, online, players, motd, raw_software } = server;
  const status = online ? "online" : "offline";
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["icon"]}>
          <img
            src={"https://eu.mc-api.net/v3/server/favicon/" + hostname}
            alt=""
          />
        </div>
        <div className={styles["info"]}>
          <div className={styles["header"]}>
            <div className={styles["title"]}>{hostname}</div>
            <div className={styles["badges"]}>
              <div className={styles["badge-" + status]}>{status}</div>
              <div className={styles["badge-players"]}>
                <BiUser /> {players} players
              </div>
            </div>
          </div>
          <div className={styles["motd"]}>{fixMotd(motd)}</div>
          <div className={styles["software"]}>{raw_software}</div>
        </div>
      </div>
    </div>
  );
}
