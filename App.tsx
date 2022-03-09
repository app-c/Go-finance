import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";

import { ThemeProvider } from "styled-components";

import theme from "./src/Global/styles/theme";
import { Route } from "./src/routes/index.routes";

export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <Route />
      </ThemeProvider>
   );
}
