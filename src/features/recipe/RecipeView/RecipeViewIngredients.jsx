import React from "react";
import { Grid, Segment } from "semantic-ui-react";

// TODO zastąpić statyczne dane - aktualnie jest wersja do testów widoku
function RecipeViewIngredients() {
  return (
    <>
      <Segment>
        <h1>Składniki</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>mąka pszenna</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              1,5 szklanki
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>kakao</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              30 g
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>cukier</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              80 g
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>jajka</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              2 szt
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>woda gazowana</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              150 ml
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>olej z pestek winogron</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              100 ml
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>proszek do pieczenia</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              1 łyżeczka
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>czekolada</Grid.Column>
            <Grid.Column textAlign='right' width={6}>
              100 g
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}

export default RecipeViewIngredients;
