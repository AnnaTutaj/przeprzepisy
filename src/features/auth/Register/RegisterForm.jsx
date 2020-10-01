import React from "react";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Message } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser } from "../authActions";

const mapDispatchToProps = {
  registerUser,
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
      </Form>
    </>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
