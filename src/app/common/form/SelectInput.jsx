import React from "react";
import { Form, Select } from "semantic-ui-react";
import ErrorMessage from "./partials/ErrorMessage";

const SelectInput = ({
  input,
  label,
  placeholder,
  multiple,
  options,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <Select
        value={input.value || (multiple ? [] : null)}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
      />
      <ErrorMessage touched={touched} error={error} />
    </Form.Field>
  );
};

export default SelectInput;
