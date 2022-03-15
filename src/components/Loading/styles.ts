import styled from "styled-components/native";

import theme from "../../Global/styles/theme";

const { colors } = theme;

export const Container = styled.View`
   flex: 1;
   background-color: ${colors.primary};
   align-items: center;
   justify-content: center;
`;

export const Image = styled.Image`
   width: 200px;
   height: 200px;
`;

export const Title = styled.Text``;
