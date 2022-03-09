/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

type Props = TextInputProps;

export function Input({ ...rest }: Props) {
   return <Container {...rest} />;
}
