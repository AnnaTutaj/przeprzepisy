import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";

const RegisterForm = () => {
  return (
    <>
      <Form size='large'>
        <Field
          name='nick'
          type='text'
          component={TextInput}
          placeholder='Nazwa Profilu'
        />
        <Field
          name='email'
          type='text'
          component={TextInput}
          placeholder='Adres email'
        />
        <Field
          name='password'
          type='password'
          component={TextInput}
          placeholder='Hasło'
        />
        <Button fluid size='large' primary>
          Zarejestruj się
        </Button>
      </Form>
    </>
  );
};

export default reduxForm({ form: "registerForm" })(RegisterForm);
