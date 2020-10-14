import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import RadioInput from "../../../app/common/form/RadioInput";
import SelectInput from "../../../app/common/form/SelectInput";

const categories = [
  { key: "snacks", text: "Przekąski", value: "snacks" },
  { key: "breakfasts", text: "Śniadania", value: "breakfasts" },
  { key: "cakes", text: "Ciasta", value: "cakes" },
  { key: "cookies", text: "Ciasteczka", value: "cookies" },

  { key: "chicken", text: "Kurczak", value: "chicken" },
  { key: "instantPot", text: "Dania jednogarnkowe", value: "instantPot" },
  { key: "soups", text: "Zupy", value: "soups" },
  { key: "iceCreams", text: "Lody", value: "iceCreams" },
  { key: "drinks", text: "Napoje", value: "drinks" },
  { key: "vegan", text: "Dania wegańskie", value: "vegan" },
  { key: "vegetarian", text: "Dania wegetariańskie", value: "vegetarian" },
];
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
          <Field
            name='favCategories'
            component={SelectInput}
            options={categories}
            value='favCategories'
            multiple={true}
            label='Twoje ulubione kategorie'
          />
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

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(AccountPage);
