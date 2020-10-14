import React from "react";
import {
  Header,
  Form,
  Divider,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
import {
  isRequired,
  matchesField,
  combineValidators,
  composeValidators,
} from "revalidate";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import texts from "../../../app/common/texts";

const validate = combineValidators({
  newPassword1: isRequired({ message: texts["isRequired"] }),
  newPassword2: composeValidators(
    isRequired({ message: texts["isRequired"] }),
    matchesField("newPassword1")({ message: "Podane hasła nie są takie same" })
  )(),
});

const ChangePasswordPage = ({
  error,
  submitting,
  handleSubmit,
  changePassword,
  providerId,
}) => {
  return (
    <>
      <Header dividing size='large' content='Moje konto' />
      {providerId && providerId === "password" && (
        <div>
          <Header as='h3' content='Zmień hasło' />
          <Form onSubmit={handleSubmit(changePassword)} error>
            <Field
              width={8}
              name='newPassword1'
              type='password'
              pointing='left'
              inline={true}
              component={TextInput}
              basic={true}
              placeholder='Nowe hasło'
            />
            <Field
              width={8}
              name='newPassword2'
              type='password'
              inline={true}
              basic={true}
              pointing='left'
              component={TextInput}
              placeholder='Powtórz hasło'
            />
            {error && <Message error header='' content={error} />}
            <Divider />
            <Button
              disabled={submitting}
              size='large'
              primary
              content='Zmień hasło'
            />
          </Form>
        </div>
      )}

      {providerId && providerId === "facebook.com" && (
        <div>
          <Header as='h3' content='Konto Facebook' />
          <p>Odwiedź Facebooka, aby zaktualizować ustawienia konta</p>
          <Button
            type='button'
            color='facebook'
            onClick={() => window.open("https://facebook.com")}
          >
            <Icon name='facebook' />
            Przejdź do Facebooka
          </Button>
        </div>
      )}

      {providerId && providerId === "google.com" && (
        <div>
          <Header as='h3' content='Konto Google' />
          <p>Odwiedź Google, aby zaktualizować ustawienia konta</p>
          <Button
            type='button'
            color='google plus'
            onClick={() => window.open("https://google.com")}
          >
            <Icon name='google plus' />
            Przejdź do Google
          </Button>
        </div>
      )}
    </>
  );
};

export default reduxForm({ form: "accountForm", validate })(ChangePasswordPage);
