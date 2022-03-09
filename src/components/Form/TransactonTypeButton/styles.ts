import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled, { css } from "styled-components/native";

interface Props {
   type: "up" | "down";
}

interface contianerProps {
   isActive: boolean;
   type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<contianerProps>`
   width: 48%;
   flex-direction: row;
   align-items: center;

   border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
   border-color: ${({ theme }) => theme.colors.text};
   border-style: solid;

   padding: 16px;
   border-radius: 5px;

   ${({ isActive, type }) =>
      isActive &&
      type === "up" &&
      css`
         background-color: ${({ theme }) => theme.colors.cucces_light};
      `}

   ${({ isActive, type }) =>
      isActive &&
      type === "down" &&
      css`
         background-color: ${({ theme }) => theme.colors.attention_light};
      `}
`;

export const Icon = styled(Feather)<Props>`
   font-size: ${RFValue(24)}px;
   margin-right: 12px;
   color: ${({ theme, type }) =>
      type === "up" ? theme.colors.succes : theme.colors.attention_light};
`;

export const Title = styled.Text`
   font-size: ${RFValue(14)}px;
`;
