import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./sass/main-styles.sass";

import { RestContext } from "react-rest-dom";

import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <RestContext.Provider url="http://localhost:8250/" >
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </RestContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
