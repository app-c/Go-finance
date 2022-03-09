import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Input } from "../Input";
import { Container } from "./styles";

interface PropsInput extends TextInputProps {
   name: string;
   control: Control;
}

export function InputForm({ name, control, ...rest }: PropsInput) {
   return (
      <Container>
         <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
               <Input onChangeText={onChange} value={value} {...rest} />
            )}
            name={name}
         />
      </Container>
   );
}
