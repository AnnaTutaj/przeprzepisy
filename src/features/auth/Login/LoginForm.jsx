import React from "react";
import { connect } from "react-redux";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login, federatedLogin } from "../authActions";
import FederatedLogin from "../FederatedLogin/FederatedLogin";

const mapDispatchToProps = {
  login,
  federatedLogin,
};

const LoginForm = ({ login, federatedLogin, handleSubmit, error }) => {
  return (
    <>
      <Form size='large' onSubmit={handleSubmit(login)} error>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Twój email'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='Hasło'
        />
        {error && <Message error header='' content={error} />}
        <Button fluid size='large' primary>
          Zaloguj się
        </Button>
        <Divider horizontal>albo</Divider>
        <FederatedLogin federatedLogin={federatedLogin} />
      </Form>
    </>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
