import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { changePassword } from "../../auth/authActions";
import BasicPage from "./BasicPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import SettingsNav from "./SettingsNav";

const mapStateToProps = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
});

const mapDispatchToProps = {
  changePassword,
};

const SettingsDashboard = ({ changePassword, providerId }) => {
  return (
    <Grid>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/ustawienia' to='/ustawienia/ogolne' />
          <Route path='/ustawienia/ogolne' component={BasicPage} />
          <Route path='/ustawienia/zdjecia' component={PhotosPage} />
          <Route
            path='/ustawienia/konto'
            render={() => (
              <AccountPage
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
