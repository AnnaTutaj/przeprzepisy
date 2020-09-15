import React, { Component } from "react";
import RecipeDashboard from "../../features/recipe/RecipeDashboard/RecipeDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import RecipeViewPage from "../../features/recipe/RecipeView/RecipeViewPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserViewPage from "../../features/user/UserView/UserViewPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import RecipeForm from "../../features/recipe/RecipeForm/RecipeForm";

class App extends Component {
  render() {
    return (
      <>
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <>
              <NavBar />
              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/przepisy' component={RecipeDashboard} />
                  <Route path='/przepisy/:id' component={RecipeViewPage} />
                  <Route path='/uzytkownicy' component={PeopleDashboard} />
                  <Route path='/uzytkownik/:id' component={UserViewPage} />
                  <Route path='/ustawienia' component={SettingsDashboard} />
                  <Route
                    path={["/dodaj-przepis", "/edytuj-przepis/:id"]}
                    component={RecipeForm}
                  />
                </Switch>
              </Container>
            </>
          )}
        />
      </>
    );
  }
}

export default withRouter(App);
