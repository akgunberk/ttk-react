import React, { useReducer, useContext } from "react";
import {
  Segment,
  Grid,
  Form,
  Button,
  Divider,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { LogIn, SignUp } from "core/db";
import WithMessage from "../container/withMessage";
import Statistics from "components/container/statistics";
import { useHistory } from "react-router";
import { reducer } from "components/hooks/loginReducer";
import { UserContext } from "core/store/ContextApi/Context";
import WithModal from "components/container/withModal";

export const Login: React.FC = () => {
  const initialState = {
    email: "",
    password: "",
    active: false,
    error: "",
    modal: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const { setLogged } = useContext(UserContext);

  const handleLogin = async () => {
    dispatch({ type: "active", payload: true });
    await LogIn(state.email, state.password).then((res) => {
      if (res.success) {
        setLogged(true);
        history.push("/");
      } else {
        dispatch({ type: "error", payload: res.error.message });
      }
    });
  };

  const handleSignup = async () => {
    dispatch({ type: "active", payload: true });
    await SignUp(state.email, state.password).then((res) =>
      res.success
        ? dispatch({ type: "modal", payload: true })
        : dispatch({ type: "error", payload: res.error.message })
    );
  };
  return (
    <React.Fragment>
      <WithModal
        open={{ status: state.modal, setStatus: dispatch }}
        header="Email Confirmation"
        content=" Please Confirm Your Email and Come Back"
        icon="mail"
      />
      <div className="logo">
        <img
          alt="armut-logo"
          title="armut-logo"
          src="https://cdn.armut.com/images/tr:h-70/armut-header-logo-colour@2x.png"
        />
      </div>
      <div style={{ position: "absolute", top: "20%" }}>
        <WithMessage
          message={
            !state.error
              ? "Log in or Sign up so that we can save your precious users"
              : state.error
          }
          header={
            !state.error ? "Welcome to Armut Test Tool Kit" : "Upps! Error..."
          }
          error={state.error ? true : false}
        />
      </div>

      <Dimmer active={state.active}>
        <Loader />
      </Dimmer>
      <Segment placeholder style={{ margin: "0" }}>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                type="email"
                label="Email"
                placeholder="Email"
                onChange={(e, data) =>
                  dispatch({ type: "email", payload: data.value })
                }
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                onChange={(e, data) =>
                  dispatch({ type: "password", payload: data.value })
                }
              />
            </Form>
            <Button
              type="submit"
              content="Login"
              icon="sign in"
              primary
              style={{ marginTop: "10px" }}
              onClick={handleLogin}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Form>
              <Form.Input
                icon="user"
                type="email"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                onChange={(e, data) =>
                  dispatch({ type: "email", payload: data.value })
                }
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                onChange={(e, data) =>
                  dispatch({ type: "password", payload: data.value })
                }
              />
            </Form>

            <Button
              content="Sign up"
              icon="signup"
              type="submit"
              color="vk"
              style={{ marginTop: "10px" }}
              onClick={handleSignup}
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>

      <Statistics />
    </React.Fragment>
  );
};

export default Login;
