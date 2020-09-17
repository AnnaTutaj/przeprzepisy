import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Button, Container } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./Menus/SignedOutMenu";
import SignedInMenu from "./Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";

const mapDispatchToProps = {
  openModal,
};

class NavBar extends Component {
  state = {
    authenticated: false,
  };

  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push("/");
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            Przeprzepisy
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            to='/przepisy'
            name='recipes'
            content='Przepisy'
          />
          <Menu.Item
            as={NavLink}
            exact
            to='/uzytkownicy'
            name='users'
            content='Użytkownicy'
          />
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
          )}
          <Menu.Item as={Link} to='/dodaj-przepis'>
            <Button floated='right' primary content='Dodaj przepis' />
          </Menu.Item>
        </Container>
      </Menu>
    ); 
  }
}

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
