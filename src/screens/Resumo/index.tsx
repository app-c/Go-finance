/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths} from "date-fns";
import {ptBR} from 'date-fns/locale'
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {
   ChartContainer,
   Container,
   Content,
   Header,
   Month,
   MonthSelect,
   MonthSelectButton,
   MonthSelectIcon,
   Title,
} from "./styles";

interface TransactionData {
   type: "positivo" | "negativo";
   name: string;
   amount: string;
   category: string;
   date: string;
}

interface Props {
   key: string;
   name: string;
   total: number;
   totalFormated: string;
   color: string;
   percent: string;
}

export function Resumo() {
   const dataKey = "@finance:transactions";

   const [totalCategories, setTotalCategories] = useState<Props[]>([]);
   const [selectdDate, setSelectesDate] = useState(new Date());

   const handleDateChange = useCallback(
      (action: "next" | "prev") => {
         if (action === "next") {
            setSelectesDate(addMonths(selectdDate, 1));
         } else {
            setSelectesDate(subMonths(selectdDate, 1));
         }
      },
      [selectdDate]
   );

   const loadData = useCallback(async () => {
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormated = response ? JSON.parse(response) : [];

      const expensives = responseFormated.filter(
         (h: TransactionData) => 
            h.type === "negativo" && 
            new Date(h.date).getMonth() === selectdDate.getMonth() &&
            new Date(h.date).getFullYear() === selectdDate.getFullYear()
      );

      const expensivesTotal = expensives.reduce(
         (acc: number, item: TransactionData) => {
            return acc + Number(item.amount);
         },
         0
      );

      const totalByCategory: Props[] = [];

      categories.forEach((h) => {
         let categorySum = 0;

         expensives.forEach((expensive: TransactionData) => {
            if (expensive.category === h.key) {
               categorySum += Number(expensive.amount);
            }
         });

         if (categorySum > 0) {
            const total = categorySum.toLocaleString("pt-BR", {
               style: "currency",
               currency: "BRL",
            });

            const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
               0
            )}%`;

            totalByCategory.push({
               key: h.key,
               name: h.name,
               total: categorySum,
               totalFormated: total,
               color: h.color,
               percent,
            });
         }
      });

      setTotalCategories(totalByCategory);
   }, [selectdDate]);

   useFocusEffect(
      useCallback(() => {
         loadData();
      }, [loadData])
   );

   return (
      <Container>
         <Header>
            <Title>Resumo por categoria</Title>
         </Header>

         <Content
            contentContainerStyle={{
               paddingHorizontal: 25,
               paddingBottom: useBottomTabBarHeight(),
            }}
         >
            <MonthSelect>
               <MonthSelectButton onPress={() => handleDateChange("prev")}>
                  <MonthSelectIcon name="chevron-left" />
               </MonthSelectButton>

               <Month>
                  {format(selectdDate, "MMMM, yyyy", { locale: ptBR })}
               </Month>

               <MonthSelectButton onPress={() => handleDateChange("next")}>
                  <MonthSelectIcon name="chevron-right" />
               </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
               <VictoryPie
                  data={totalCategories}
                  colorScale={totalCategories.map((h) => h.color)}
                  style={{
                     labels: {
                        fontSize: RFValue(18),
                        fontWeight: "bold",
                     },
                  }}
                  labelRadius={80}
                  x="percent"
                  y="total"
               />
            </ChartContainer>

            {totalCategories.map((h) => (
               <HistoryCard
                  key={h.key}
                  title={h.name}
                  amount={h.totalFormated}
                  color={h.color}
               />
            ))}
         </Content>
      </Container>
   );
}
