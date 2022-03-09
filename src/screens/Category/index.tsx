import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
   Category,
   Container,
   Footer,
   Header,
   Icon,
   Name,
   Separator,
   Title,
} from "./styles";

interface Categorie {
   key: string;
   name: string;
}

export interface Props {
   category: Categorie;
   setCategory: (category: Categorie) => void;
   closeSelectCategory: () => void;
}

export function CategorySelected({
   category,
   setCategory,
   closeSelectCategory,
}: Props) {
   const handleSetCategory = useCallback((category: Categorie) => {
      setCategory(category);
   }, []);

   return (
      <Container>
         <Header>
            <Title>Category</Title>
         </Header>

         <FlatList
            data={categories}
            keyExtractor={(item) => item.key}
            style={{ flex: 1, width: "100%" }}
            renderItem={({ item }) => (
               <Category
                  onPress={() => handleSetCategory(item)}
                  select={item.key === category.key}
               >
                  <Icon name={item.icon} />
                  <Name>{item.name}</Name>
               </Category>
            )}
            ItemSeparatorComponent={() => <Separator />}
         />

         <Footer>
            <Button onPress={closeSelectCategory} title="Selecionar" />
         </Footer>
      </Container>
   );
}
