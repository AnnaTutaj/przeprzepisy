import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
} from "revalidate";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import TextInput from "../../../app/common/form/TextInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { createRecipe, updateRecipe } from "../recipeActions";
import texts from "../../../app/common/texts";

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;
  let recipe = {};

  if (
    state.firestore.ordered.recipes &&
    state.firestore.ordered.recipes.length > 0
  ) {
    recipe =
      state.firestore.ordered.recipes.filter(
        (recipe) => recipe.id === recipeId
      )[0] || {};
  }

  return {
    initialValues: recipe,
    recipe
  };
};

const mapDispatchToProps = {
  createRecipe,
  updateRecipe,
};

const validate = combineValidators({
  title: isRequired({ message: texts["isRequired"] }),
  time: isRequired({ message: texts["isRequired"] }),
  peopleCount: isRequired({ message: texts["isRequired"] }),
  description: composeValidators(
    isRequired({ message: texts["isRequired"] }),
    hasLengthLessThan(10000)({ message: "Limit znaków w opisie wynosi 10000" })
  )(),
});

const timeList = [
  { key: "15", text: "<15min", value: "15" },
  { key: "30", text: "<30min", value: "30" },
  { key: "45", text: "<45min", value: "45" },
  { key: "60", text: "<1h", value: "60" },
  { key: "90", text: "<1h 30min", value: "90" },
  { key: "120", text: "<2h", value: "120" },
  { key: "150", text: "<2h 30min", value: "150" },
  { key: "180", text: ">3h", value: "180" },
];

const peopleCountList = [
  { key: "1", text: "1 os.", value: "1" },
  { key: "2", text: "2 os.", value: "2" },
  { key: "3", text: "3 os.", value: "3" },
  { key: "4", text: "4 os.", value: "4" },
  { key: "5", text: "5 os.", value: "5" },
  { key: "6", text: "6 os.", value: "6" },
];

class RecipeForm extends Component {
  state = {};

  async componentDidMount() {
    const { firestore, match, history } = this.props;

    if (match.params.id) {
      let recipe = await firestore.get(`recipes/${match.params.id}`);
      console.log(recipe.id);

      if (!recipe.exists) {
        history.push("/recipes");
        toastr.error("Ooops", "Przepis nie został znaleziony");
      }
    }
  }

  onSubmitForm = async (values) => {
    try {
      if (this.props.initialValues.id) {
        this.props.updateRecipe(values);
        this.props.history.push(`/przepisy/${this.props.initialValues.id}`);
      } else {
        let createdRecipe = await this.props.createRecipe(values);
        this.props.history.push(`/przepisy/${createdRecipe.id}`);
      }
    } catch (error) {}
  };

  handleCancelForm = () => {
    if (this.props.initialValues.id) {
      this.props.history.push(`/przepisy/${this.props.initialValues.id}`);
    } else {
      this.props.history.push("/przepisy");
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { submitting } = this.props;
    return (
      <Segment style={{ width: "50%" }}>
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmitForm)}
          autoComplete='off'
        >
          <Header as='h3' dividing>
            <Header.Content>
              {this.state.id ? "Edytuj przepis" : "Dodaj przepis"}
            </Header.Content>
          </Header>
          <Field
            name='title'
            label='Nazwa przepisu'
            component={TextInput}
            placeholder='np. Przepyszne ciasteczka'
          />
          <Field
            name='time'
            label='Czas przygotowania w minutach'
            component={SelectInput}
            options={timeList}
            placeholder='Ile zajmie przygotowanie całego przepisu?'
          />
          <Field
            name='peopleCount'
            label='Liczba osób'
            component={SelectInput}
            options={peopleCountList}
            placeholder='Składniki są wyliczone na ile osób?'
          />
          <Field
            name='description'
            label='Opis'
            rows={10}
            component={TextAreaInput}
            placeholder='Opis krok po kroku'
          />
          <Button disabled={submitting} primary type='submit' floated='right'>
            Zapisz
          </Button>
          <Button type='button' onClick={this.handleCancelForm}>
            Anuluj
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "recipeForm", validate, enableReinitialize: true })(RecipeForm))
);
