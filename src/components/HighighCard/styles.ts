import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled, { css } from "styled-components/native";

interface Props {
   type: "up" | "down" | "total";
}
export const Container = styled.View<Props>`
   background-color: ${({ theme, type }) =>
      type === "total" ? theme.colors.secondary : theme.colors.shape};

   width: ${RFValue(300)}px;
   border-radius: 5px;

   padding: 19px 23px;
   padding-bottom: ${RFValue(42)}px;
   margin-right: 16px;
`;

export const Header = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const Title = styled.Text<Props>`
   font-size: ${RFValue(16)}px;

   color: ${({ theme, type }) =>
      type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<Props>`
   font-size: ${RFValue(40)}px;

   ${(props) =>
      props.type === "up" &&
      css`
         color: ${({ theme }) => theme.colors.succes};
      `}

   ${(props) =>
      props.type === "down" &&
      css`
         color: ${({ theme }) => theme.colors.attention};
      `}

   ${(props) =>
      props.type === "total" &&
      css`
         color: ${({ theme }) => theme.colors.shape};
      `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<Props>`
   font-size: ${RFValue(32)}px;
   color: ${({ theme, type }) =>
      type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<Props>`
   color: ${({ theme, type }) =>
      type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;
