/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React from "react";

import { categories } from "../../utils/categories";
import {
   Amount,
   Category,
   CategoryName,
   Container,
   Date,
   Footer,
   Icon,
   Title,
} from "./styles";

export interface TransactionCardsProps {
   type: "positivo" | "negativo";
   name: string;
   amount: string;
   category: string;
   date: string;
}

interface Props {
   data: TransactionCardsProps;
}

export function TransactionCards({ data }: Props) {
   const [category] = categories.filter((h) => h.key === data.category);
   return (
      <Container>
         <Title>{data.name}</Title>

         <Amount type={data.type}>
            {data.type === "negativo" && "- "}
            {data.amount}
         </Amount>

         <Footer>
            <Category>
               <Icon name={category.icon} />
               <CategoryName>{category.name}</CategoryName>
            </Category>
            <Date>{data.date}</Date>
         </Footer>
      </Container>
   );
}
