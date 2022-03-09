import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled.View`
   background-color: ${({ theme }) => theme.colors.background};
   flex: 1;
`;

export const Header = styled.View`
   background-color: ${({ theme }) => theme.colors.primary};

   width: 100%;
   height: ${RFValue(113)}px;

   align-items: center;
   justify-content: flex-end;
   padding-bottom: 19px;
`;

export const Title = styled.Text`
   font-size: ${RFValue(18)}px;
   color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
   width: 100%;
   flex: 1;
   padding: 24px;
   flex: 1;
   justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransaTypes = styled.View`
   flex-direction: row;
   justify-content: space-between;

   margin-top: 8px;
   margin-bottom: 16px;
`;
