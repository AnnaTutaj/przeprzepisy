import React from "react";
import { Form } from "semantic-ui-react";
import ErrorMessage from "./partials/ErrorMessage";

const TextAreaInput = ({
  input,
  label,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <textarea {...input} placeholder={placeholder} rows={rows} />
      <ErrorMessage touched={touched} error={error} />
    </Form.Field>
  );
};

export default TextAreaInput;
