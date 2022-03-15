import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { StatusBar, View } from "react-native";

import { ThemeProvider } from "styled-components";

import theme from "./src/Global/styles/theme";
import { Route } from "./src/routes/index.routes";

export default function App() {
   return (
      <ThemeProvider theme={theme}>
         <StatusBar barStyle="light-content" hidden />
         <View style={{ flex: 1 }}>
            <Route />
         </View>
      </ThemeProvider>
   );
}
