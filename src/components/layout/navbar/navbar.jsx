import {
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ToggleModeButton from "./toggle-mode-button";

import styles from "./navbar.module.sass";

export default function Navbar() {
  return (
    <Link to="/">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        className={styles["navbar"]}
      >
        <div className={styles["container"]}>
          <div className={styles["content"]}>
            <div className={styles["brand"]}>
              <Image src="/favicon.png" width="36px" alt="MCStats Logo" />
              <Text className={styles["brand-title"]}>MCStats</Text>
            </div>
            <div className={styles["right-items"]}>
              <ToggleModeButton />
              <Button onClick={() => { window.open("https://paypal.me/sammwy", "_blank") }} variant="ghost" padding="5" margin="2">Donate</Button>
            </div>
          </div>
        </div>
      </Flex>
    </Link>
  );
}
