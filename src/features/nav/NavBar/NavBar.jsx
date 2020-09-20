import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Button, Container } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./Menus/SignedOutMenu";
import SignedInMenu from "./Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  openModal,
  logout,
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
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;

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
          {authenticated && (
            <Menu.Item
              as={NavLink}
              exact
              to='/uzytkownicy'
              name='users'
              content='Użytkownicy'
            />
          )}
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              currentUser={auth.currentUser}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
          {authenticated && (
            <Menu.Item as={Link} to='/dodaj-przepis'>
              <Button floated='right' primary content='Dodaj przepis' />
            </Menu.Item>
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
