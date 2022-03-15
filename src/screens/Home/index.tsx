/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native";

import AppLoading from "expo-app-loading";
import * as ImagePiker from "expo-image-picker";

import Storage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighighCard";
import { Loading } from "../../components/Loading";
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
   TitleElementosFiltro,
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
   const [image, setImage] = useState("");

   const dataKey = "@finance:transactions";
   const imageKey = "@image:finace";

   const Imagae = useCallback(async () => {
      const result = await ImagePiker.launchImageLibraryAsync({
         mediaTypes: ImagePiker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [6, 6],
         quality: 1,
      });

      if (!result.cancelled) {
         setImage(result.uri);
         await AsyncStorage.setItem(imageKey, JSON.stringify(result.uri));
      }
   }, []);

   useEffect(() => {
      async function storege() {
         const res = await AsyncStorage.getItem(imageKey);
         console.log(res);
         setImage(res ? JSON.parse(res) : "");
      }
      storege();
   }, []);
   const handleSelect = useCallback((type: string) => {
      setTypeSelect(type);
   }, []);

   const Load = useCallback(() => {
      const a = 160550.5;
      async function load() {
         const response = await Storage.getItem(dataKey);

         const transacton = response ? JSON.parse(response) : [];

         const formatedd: DataLIstProps[] = transacton
            .map((h: DataLIstProps) => {
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

         const EntriesTotal = formatedd
            .filter((h) => {
               return h.type === "positivo";
            })
            .reduce((acc, item) => {
               return acc + Number(item.value);
            }, 0);

         const ExpensiveTotal = formatedd
            .filter((h) => {
               return h.type === "negativo";
            })
            .reduce((acc, item) => {
               return acc + Number(item.value);
            }, 0);

         setData(formatedd);

         const tot = EntriesTotal - ExpensiveTotal;
         setHighligh({
            entries: {
               amount: EntriesTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               }),
            },
            expensives: {
               amount: ExpensiveTotal.toLocaleString("pt-BR", {
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

      setTimeout(() => {
         load();
      }, 1500);
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
            <Loading />
         ) : (
            <>
               <Header>
                  <UserWrapper>
                     <UserInfo onPress={Imagae}>
                        <Photo
                           source={{
                              uri: image,
                           }}
                        />
                        <User>
                           <UserGreeting>Olá</UserGreeting>
                           <UserName />
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
                  <Title>Extrato</Title>
                  <FiltroDataContainer>
                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("mes");
                        }}
                        select={typeSelect === "mes"}
                     >
                        <TitleElementosFiltro>MES</TitleElementosFiltro>
                     </ElementosFiltroContainer>

                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("ano");
                        }}
                        select={typeSelect === "ano"}
                     >
                        <TitleElementosFiltro>ANO</TitleElementosFiltro>
                     </ElementosFiltroContainer>

                     <ElementosFiltroContainer
                        onPress={() => {
                           handleSelect("todos");
                        }}
                        select={typeSelect === "todos"}
                     >
                        <TitleElementosFiltro>TODOS</TitleElementosFiltro>
                     </ElementosFiltroContainer>
                  </FiltroDataContainer>
                  <TransactionList
                     contentContainerStyle={{ paddingBottom: 40 }}
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
