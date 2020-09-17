import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";

const LoginForm = () => {
  return (
    <>
      <Form size='large'>
        <Field
          name='login'
          component={TextInput}
          type='text'
          placeholder='Twój nick lub email'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='Hasło'
        />
        <Button fluid size='large' primary>
          Zaloguj się
        </Button>
      </Form>
    </>
  );
};

export default reduxForm({ form: "loginForm" })(LoginForm);
