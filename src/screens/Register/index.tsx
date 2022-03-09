/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactonTypeButton";
import { CategorySelected } from "../Category";
import { Container, Fields, Form, Header, Title, TransaTypes } from "./styles";

interface FormData {
   name: string;
   amount: string;
}

export function Register() {
   const { navigate } = useNavigation();
   const { control, handleSubmit, reset } = useForm();
   const dataKey = "@finance:transactions";

   const [transacton, setTransaction] = useState("");
   const [modal, setModal] = useState(false);

   const [cat, setCat] = useState({
      key: "categor",
      name: "Categoria",
   });

   const handleTransactionType = useCallback(
      (type: "positivo" | "negativo") => {
         setTransaction(type);
      },
      []
   );

   const handleColseModal = useCallback(() => {
      setModal(false);
   }, []);

   const handleOpemModal = useCallback(() => {
      setModal(true);
   }, []);

   const handleRegister = useCallback(
      async (form: FormData) => {
         if (!form.name) return Alert.alert("Insira um nome");
         if (!form.amount) return Alert.alert("Insira um valor de preço");
         if (!transacton) return Alert.alert("Escolha uma transaçao");
         if (cat.key === "categor") return Alert.alert("Escolha uma categoria");

         const newData = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transacton,
            category: cat.key,
            date: new Date(),
         };

         try {
            const data = await AsyncStorage.getItem(dataKey);
            const current = data ? JSON.parse(data) : [];

            const dataFormated = [...current, newData];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

            setCat({ key: "categor", name: "Categoria" });
            setTransaction("");
            navigate("Listagem");
            reset();
         } catch (error) {
            console.log(error);
         }
      },
      [cat.key, navigate, reset, transacton]
   );

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <Container>
            <Header>
               <Title>Cadastro</Title>
            </Header>

            <Form>
               <Fields>
                  <InputForm name="name" control={control} placeholder="Nome" />

                  <InputForm
                     name="amount"
                     control={control}
                     placeholder="Preço"
                     keyboardType="numeric"
                  />

                  <TransaTypes>
                     <TransactionTypeButton
                        isActive={transacton === "positivo"}
                        onPress={() => handleTransactionType("positivo")}
                        title="Income"
                        type="up"
                     />
                     <TransactionTypeButton
                        isActive={transacton === "negativo"}
                        onPress={() => handleTransactionType("negativo")}
                        title="Outcome"
                        type="down"
                     />
                  </TransaTypes>

                  <CategorySelectButton
                     onPre={handleOpemModal}
                     title={cat.name}
                  />
               </Fields>

               <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
            </Form>

            <Modal visible={modal}>
               <CategorySelected
                  category={cat}
                  setCategory={setCat}
                  closeSelectCategory={handleColseModal}
               />
            </Modal>
         </Container>
      </TouchableWithoutFeedback>
   );
}
