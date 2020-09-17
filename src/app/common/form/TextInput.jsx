import React from "react";
import { Form } from "semantic-ui-react";
import ErrorMessage from "./partials/ErrorMessage";

const TextInput = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <input {...input} placeholder={placeholder} type={type} />
      <ErrorMessage touched={touched} error={error} />
    </Form.Field>
  );
};

export default TextInput;
