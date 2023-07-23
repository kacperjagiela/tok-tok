import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Main } from "./pages/Main";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    light: {
      background: "#FFFFFF",
      text: "#000000",
    },
    dark: {
      background: "#333333",
      text: "#FFFFFF",
    },
  },
  config,
});

const router = createBrowserRouter([{ path: "/", element: <Main /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </>
);
