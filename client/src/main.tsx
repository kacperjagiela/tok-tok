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
import { UserProvider } from "./providers/UserProvider";
import { routes } from "./routes";

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

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <App router={router} />
        </UserProvider>
      </ChakraProvider>
    </React.StrictMode>
  </>
);
