import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { withRouter } from "react-router";

const NotFound = ({ history }) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Szukaliśmy wszędzie, ale nie możemy znaleźć tej strony
      </Header>
      <Segment.Inline>
        <Button onClick={() => history.push("/przepisy")} primary>
          Wróć do Przepisów
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default withRouter(NotFound);
