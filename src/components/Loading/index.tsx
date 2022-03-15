import React from "react";
import { ActivityIndicator } from "react-native";

import icon from "../../../assets/icon.png";
import theme from "../../Global/styles/theme";
import { Container, Image, Title } from "./styles";

export function Loading() {
   return (
      <Container>
         <Image source={icon} />
         <ActivityIndicator color={theme.colors.attention} size="large" />
      </Container>
   );
}
