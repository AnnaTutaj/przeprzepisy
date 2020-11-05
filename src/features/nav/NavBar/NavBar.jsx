import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Menu, Button, Container, Icon } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./Menus/SignedOutMenu";
import SignedInMenu from "./Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const mapDispatchToProps = {
  openModal,
};

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

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
          {authenticated && (
            <Menu.Item position='right' as={Link} to='/ulubione-przepisy'>
              <Icon link name='heart' />
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              profile={profile}
              auth={auth}
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

export default withRouter(
  withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar))
);
