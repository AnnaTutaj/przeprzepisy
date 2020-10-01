import React from "react";
import { Button, Icon } from "semantic-ui-react";

const FederatedLogin = ({ federatedLogin }) => {
  return (
    <div>
      <Button
        onClick={() => federatedLogin("facebook")}
        color='facebook'
        type='button'
        fluid
        style={{ marginBottom: "5px" }}
      >
        <Icon name='facebook' /> Zaloguj się przez Facebook
      </Button>

      <Button color='google plus' type='button' fluid>
        <Icon name='google plus' />
        Zaloguj się przez Google
      </Button>
    </div>
  );
};

export default FederatedLogin;
