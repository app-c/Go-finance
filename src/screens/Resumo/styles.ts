import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

import theme from "../../Global/styles/theme";

const { colors } = theme;

export const Container = styled.View`
   flex: 1;
`;

export const Title = styled.Text`
   color: ${colors.shape};
`;

export const Header = styled.View`
   background-color: ${({ theme }) => theme.colors.primary};

   width: 100%;
   height: ${RFValue(100)}px;

   align-items: center;
   justify-content: flex-end;
   padding-bottom: 19px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
   width: 100%;
   align-items: center;
`;

export const MonthSelect = styled.View`
   width: 100%;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;

   margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity`
   padding: 3px 10px;
`;

export const MonthSelectIcon = styled(Feather)`
   font-size: 24px;
`;

export const Month = styled.Text`
   font-size: 20px;
`;
