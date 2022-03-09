import React from "react";

import { Container, Title } from "./styles";

interface Props {
   title: string;
   onPre: () => void;
}

export default function CategorySelectButton({ title, onPre }: Props) {
   return (
      <Container onPress={onPre}>
         <Title> {title} </Title>
      </Container>
   );
}
