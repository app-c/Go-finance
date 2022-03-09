/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
   title: string;
}

export function Button({ title, ...rest }: Props) {
   return (
      <Container {...rest}>
         <Title>{title}</Title>
      </Container>
   );
}
