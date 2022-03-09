import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
   acttiveOpacity: 0.7,
})`
   background-color: ${({ theme }) => theme.colors.shape};
   flex-direction: row;
   justify-content: space-between;
   align-items: center;

   border-radius: 5px;
   padding: 18px 16px;
`;

export const Title = styled.Text`
   font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
   font-size: ${RFValue(20)}px;
   color: ${({ theme }) => theme.colors.text};
`;
