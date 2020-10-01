import React from "react";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser, federatedLogin } from "../authActions";
import FederatedLogin from "../FederatedLogin/FederatedLogin";

const mapDispatchToProps = {
  registerUser,
  federatedLogin
};

const isRequiredText = "Pole jest wymagane";

const validate = combineValidators({
  nick: isRequired({ message: isRequiredText }),
  email: isRequired({ message: isRequiredText }),
  password: isRequired({ message: isRequiredText }),
});
const RegisterForm = ({
  handleSubmit,
  registerUser,
  federatedLogin,
  error,
  invalid,
  submitting,
}) => {
  return (
    <>
      <Form size='large' onSubmit={handleSubmit(registerUser)} error>
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
        {error && <Message error header='' content={error} />}
        <Button disabled={submitting} fluid size='large' primary>
          Zarejestruj się
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
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
