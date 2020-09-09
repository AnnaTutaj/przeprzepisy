import React, { Component } from "react";
import { Menu, Button, Container } from "semantic-ui-react";

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>Przeprzepisy</Menu.Item>
          <Menu.Item name='przepisy' />
          {/* TODO docelowo tu będzie przycisk dodawania przepisów */}
          <Menu.Item>
            <Button floated='right' content='Dodaj przepis' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button content='Zaloguj się | Zarejestruj się' />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
