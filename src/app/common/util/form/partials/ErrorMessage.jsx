import React from "react";
import { Icon, Label } from "semantic-ui-react";

const ErrorMessage = ({ touched, error }) => {
  return (
    <>
      {touched && error && (
        <Label pointing color='red'>
          <Icon name='cancel' />
          {error}
        </Label>
      )}
    </>
  );
};

export default ErrorMessage;
