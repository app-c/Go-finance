import { color } from "react-native-reanimated";

import styled from "styled-components/native";

import theme from "../../Global/styles/theme";

const { colors } = theme;

interface Props {
   color: string;
}

export const Container = styled.View<Props>`
   width: 100%;
   background-color: ${colors.shape};
   flex-direction: row;
   justify-content: space-between;
   padding: 13px 24px;

   border-radius: 5px;
   border-left-width: 5px;
   border-left-color: ${({ color }) => color};
   margin-bottom: 8px;
`;

export const Title = styled.Text``;

export const Amount = styled.Text``;
