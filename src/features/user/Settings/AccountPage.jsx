import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import RadioInput from "../../../app/common/form/RadioInput";

class AccountPage extends Component {
  render() {
    const { submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size='large' content='Szczegóły profilu' />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name='nick'
            type='text'
            label='Nazwa profilu'
            component={TextInput}
          />
          <Field
            width={8}
            name='description'
            label='Kilka słów o Tobie'
            rows={3}
            component={TextAreaInput}
          />
          <Form.Field>
            <label>Płeć</label>
            <Field
              name='gender'
              type='radio'
              value='male'
              label='Mężczyzna'
              component={RadioInput}
            />
            <Field
              name='gender'
              type='radio'
              value='female'
              label='Kobieta'
              component={RadioInput}
            />
            <Field
              name='gender'
              type='radio'
              value='other'
              label='Inna'
              component={RadioInput}
            />
          </Form.Field>
          <Divider />
          <Button
            disabled={submitting}
            size='large'
            primary
            content='Aktualizuj profil'
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: "userProfile", enableReinitialize: true })(
  AccountPage
);
