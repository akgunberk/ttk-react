import React, { useEffect, useContext } from "react";
import { Grid, Button, Header, Icon } from "semantic-ui-react";
import Statistics from "components/container/statistics";
import { LoginWithGoogle } from "core/initApp";
import { UserContext } from "core/store/ContextApi/Context";
import { history } from "App";

export const Login: React.FC<any> = () => {
  // eslint-disable-next-line
  let User = useContext(UserContext);

  useEffect(() => {
    if (User.isLoggedIn) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [User.isLoggedIn]);

  return (
    <React.Fragment>
      <Grid columns={1} relaxed="very" stackable>
        <Grid.Column>
          <Header as="h1" icon>
            <Icon name="briefcase" />
            Armut Test Tool Kit
            <Header.Subheader>Manage your test users</Header.Subheader>
            <Header.Content>
              <Button
                style={{ marginTop: "20px" }}
                onClick={() => LoginWithGoogle(User.actions.setAuthState)}
              >
                Login
              </Button>
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid>

      <Statistics />
    </React.Fragment>
  );
};

export default Login;
