/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */

import React, { useState, useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";

import Storage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighighCard";
import {
   TransactionCards,
   TransactionCardsProps,
} from "../../components/TransactionCard";
import {
   Container,
   ElementosFiltroContainer,
   FiltroDataContainer,
   Header,
   HighlightCards,
   Icon,
   LoadContainer,
   Photo,
   Title,
   Transaction,
   TransactionList,
   User,
   UserGreeting,
   UserInfo,
   UserName,
   UserWrapper,
} from "./styles";

export interface DataLIstProps extends TransactionCardsProps {
   id: string;
}

interface HighlightProps {
   amount: string;
}

interface HighLighData {
   entries: HighlightProps;
   expensives: HighlightProps;
   total: HighlightProps;
}

export function Home() {
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState<DataLIstProps[]>([]);
   const [highligh, setHighligh] = useState<HighLighData>({} as HighLighData);
   const [typeSelect, setTypeSelect] = useState("mes");

   const dataKey = "@finance:transactions";

   const handleSelect = useCallback((type: string) => {
      setTypeSelect(type);
   }, []);

   const Load = useCallback(() => {
      async function load() {
         let entriesTotal = 0;
         let exensiveTotal = 0;
         const response = await Storage.getItem(dataKey);

         const transacton = response ? JSON.parse(response) : [];

         const formatedd: DataLIstProps[] = transacton
            .map((h: DataLIstProps) => {
               // if (h.type === "positivo") {
               //    entriesTotal += Number(h.amount);
               // } else {
               //    exensiveTotal += Number(h.amount);
               // }

               const amount = Number(h.amount).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               });

               const date = Intl.DateTimeFormat("pt-br", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
               }).format(new Date(h.date));

               return {
                  id: h.id,
                  type: h.type,
                  name: h.name,
                  category: h.category,
                  amount,
                  date,
                  value: h.amount,
               };
            })
            .filter((h) => {
               const [dia, mes, ano] = h.date.split("/").map(Number);
               const dataN = new Date(Date.now());

               if (
                  (typeSelect === "ano" && ano === dataN.getFullYear()) ||
                  (typeSelect === "mes" && mes === dataN.getMonth() + 1) ||
                  typeSelect === "todos"
               ) {
                  return h;
               }
            });

         const dataFilter = formatedd.filter((h) => {
            const [dia, mes, ano] = h.date.split("/").map(Number);
            const dataN = new Date(Date.now());

            if (
               (typeSelect === "ano" && ano === dataN.getFullYear()) ||
               (typeSelect === "mes" && mes === dataN.getMonth() + 1) ||
               typeSelect === "todos"
            ) {
               return h;
            }
         });

         const soma = dataFilter.map((h) => {
            if (h.type === "positivo") {
               entriesTotal += Number(h.value);
            } else {
               exensiveTotal += Number(h.value);
            }

            return h;
         });

         setData(formatedd);

         const tot = entriesTotal - exensiveTotal;
         setHighligh({
            entries: {
               amount: entriesTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               }),
            },
            expensives: {
               amount: exensiveTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               }),
            },
            total: {
               amount: tot.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               }),
            },
         });
         setLoading(false);
      }

      load();
   }, [typeSelect]);

   useEffect(() => {
      Load();
   }, [typeSelect]);

   useFocusEffect(
      useCallback(() => {
         Load();
      }, [])
   );

   return (
      <Container>
         {isLoading ? (
            <LoadContainer>
               <ActivityIndicator color="red" size="small" />
            </LoadContainer>
         ) : (
            <>
               <Header>
                  <UserWrapper>
                     <UserInfo>
                        <Photo
                           source={{
                              uri: "https://i1.wp.com/sempreupdate.com.br/wp-content/uploads/2020/01/kali-linux.png?resize=728%2C455&ssl=1",
                           }}
                        />
                        <User>
                           <UserGreeting>Olá</UserGreeting>
                           <UserName>William</UserName>
                        </User>
                     </UserInfo>
                     <Icon name="power" />
                  </UserWrapper>
               </Header>

               <HighlightCards>
                  <HighlightCard
                     type="up"
                     title="Entrada"
                     amount={highligh.entries.amount}
                     lastTransacton="Últimas entrada"
                  />

                  <HighlightCard
                     type="down"
                     title="Saída"
                     amount={highligh.expensives.amount}
                     lastTransacton="Últimas saidas"
                  />

                  <HighlightCard
                     type="total"
                     title="Saldo"
                     amount={highligh.total.amount}
                     lastTransacton=""
                  />
               </HighlightCards>

               <Transaction>
                  <Title>Listagem</Title>
                  <FiltroDataContainer>
                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("mes");
                        }}
                        select={typeSelect === "mes"}
                     >
                        <Title>MES</Title>
                     </ElementosFiltroContainer>

                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("ano");
                        }}
                        select={typeSelect === "ano"}
                     >
                        <Title>ANO</Title>
                     </ElementosFiltroContainer>

                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("todos");
                        }}
                        select={typeSelect === "todos"}
                     >
                        <Title>TODOS</Title>
                     </ElementosFiltroContainer>
                  </FiltroDataContainer>
                  <TransactionList
                     data={data}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => <TransactionCards data={item} />}
                  />
               </Transaction>
            </>
         )}
      </Container>
   );
}
