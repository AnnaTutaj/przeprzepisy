import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { changePassword } from "../../auth/authActions";
import AccountPage from "./AccountPage";
import PhotosPage from "./Photos/PhotosPage";
import ChangePasswordPage from "./ChangePasswordPage";
import SettingsNav from "./SettingsNav";
import { updateProfile } from "../../user/userActions";

const mapStateToProps = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
});

const mapDispatchToProps = {
  changePassword,
  updateProfile,
};

const SettingsDashboard = ({
  changePassword,
  updateProfile,
  providerId,
  user,
}) => {
  return (
    <Grid>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
      <Grid.Column width={12}>
        <Switch>
          <Redirect
            exact
            from='/ustawienia'
            to='/ustawienia/szczegoly-profilu'
          />
          <Route
            path='/ustawienia/szczegoly-profilu'
            render={() => (
              <AccountPage initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route path='/ustawienia/zdjecia' component={PhotosPage} />
          <Route
            path='/ustawienia/zmien-haslo'
            render={() => (
              <ChangePasswordPage
                changePassword={changePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);
