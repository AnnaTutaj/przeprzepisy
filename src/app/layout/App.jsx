import React, { Component } from "react";
import RecipeDashboard from "../../features/recipe/RecipeDashboard/RecipeDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container className='main'>
          <RecipeDashboard />
        </Container>
      </>
    );
  }
}

export default App;
