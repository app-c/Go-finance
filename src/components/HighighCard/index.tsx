/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React from "react";

import {
   Amount,
   Container,
   Footer,
   Header,
   LastTransaction,
   Title,
   Icon,
} from "./styles";

interface Props {
   title: string;
   amount: string;
   lastTransacton: string;
   type: "up" | "down" | "total";
}

const icon = {
   up: "arrow-up-circle",
   down: "arrow-down-circle",
   total: "dollar-sign",
};
export function HighlightCard({ type, title, amount, lastTransacton }: Props) {
   return (
      <Container type={type}>
         <Header>
            <Title type={type}>{title}</Title>
            <Icon name={icon[type]} type={type} />
         </Header>

         <Footer>
            <Amount type={type}>{amount}</Amount>
            <LastTransaction type={type}>{lastTransacton}</LastTransaction>
         </Footer>
      </Container>
   );
}
