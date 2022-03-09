import { FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

import { DataLIstProps } from ".";
import theme from "../../Global/styles/theme";

type PropsElements = {
   select: boolean;
};

export const Container = styled.View`
   background-color: ${({ theme }) => theme.colors.background};

   flex: 1;
`;

export const Header = styled.View`
   width: 100%;
   height: ${RFPercentage(38)}px;
   background-color: ${({ theme }) => theme.colors.primary};

   justify-content: center;
   align-items: flex-start;
   flex-direction: row;
`;

export const UserWrapper = styled.View`
   width: 100%;
   padding: 0 24px;

   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: ${RFValue(40)}px;
`;

export const UserInfo = styled.View`
   flex-direction: row;
   align-items: center;
`;

export const Photo = styled.Image`
   width: ${RFValue(55)}px;
   height: ${RFValue(55)}px;
   border-radius: 15px;
`;

export const User = styled.View`
   margin-left: 17px;
`;

export const UserGreeting = styled.Text`
   color: ${({ theme }) => theme.colors.shape};

   font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
   font-size: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)`
   color: ${({ theme }) => theme.colors.secondary};
   font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
   horizontal: true,
   contentContainerStyle: { paddingHorizontal: 24 },
   showsHorizontalScrollIndicator: true,
})`
   position: absolute;
   margin-top: ${RFPercentage(20)}px;
   width: 100%;
`;

export const Transaction = styled.View`
   flex: 1;
   padding: 0 24px;
   margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
   font-size: ${RFValue(18)}px;
`;

export const TransactionList = styled(
   FlatList as new () => FlatList<DataLIstProps>
).attrs({
   showsVerticalScrollIndicator: false,
})``;

export const LoadContainer = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`;

export const FiltroDataContainer = styled.View`
   width: 100%;
   height: 40px;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   margin-top: 16px;
`;

export const ElementosFiltroContainer = styled.TouchableOpacity<PropsElements>`
   padding: 3px 10px;
   border-radius: 5px;
   background-color: ${({ select }) =>
      select ? theme.colors.primary : theme.colors.primary_light};
`;
