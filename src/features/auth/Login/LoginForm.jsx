import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login } from "../authActions";

const mapDispatchToProps = {
  login,
};

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <>
      <Form size='large' onSubmit={handleSubmit(login)}>
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

export default connect(null, mapDispatchToProps)(reduxForm({ form: "loginForm" })(LoginForm));