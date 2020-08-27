import React, { useReducer, useEffect } from "react";
import { Grid, Dimmer, Loader, Button } from "semantic-ui-react";
import Statistics from "components/container/statistics";
import { reducer, AppState } from "components/hooks/loginReducer";
import { LoginWithGoogle } from "core/db";
import { useHistory } from "react-router";

export const Login: React.FC<any> = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, AppState);
  let history = useHistory();
  useEffect(() => {
    if (state.userId !== "") {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [state.userId]);

  return (
    <React.Fragment>
      <Dimmer active={state.active}>
        <Loader />
      </Dimmer>

      <Grid columns={1} relaxed="very" stackable>
        <Grid.Column>
          <Button onClick={() => LoginWithGoogle(dispatch)}>Login</Button>
        </Grid.Column>
      </Grid>

      <Statistics />
    </React.Fragment>
  );
};

export default Login;
