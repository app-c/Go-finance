import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

interface TransactionsProps {
   type: "positivo" | "negativo";
}

export const Container = styled.View`
   background-color: ${({ theme }) => theme.colors.shape};
   border-radius: 5px;

   padding: 17px 24px;
   margin-top: 10px;
`;

export const Title = styled.Text`
   font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionsProps>`
   font-size: ${RFValue(20)}px;
   margin-top: 2px;
   color: ${({ theme, type }) =>
      type === "positivo" ? theme.colors.succes : theme.colors.attention};
`;

export const Footer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;

   margin-top: 19px;
`;

export const Category = styled.View`
   flex-direction: row;
   align-items: center;
`;

export const Icon = styled(Feather)`
   font-size: ${RFValue(20)}px;
   color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
   font-size: ${RFValue(14)}px;
   color: ${({ theme }) => theme.colors.text};

   margin-left: 17px;
`;

export const Date = styled.Text`
   font-size: ${RFValue(14)}px;
   color: ${({ theme }) => theme.colors.text};
`;
