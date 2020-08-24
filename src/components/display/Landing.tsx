import React, { useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import CustomUser from "../cards/customUser";
import UserForm from "components/forms/userForm";
import { connect, useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getUserElements } from "store/selectors";
import DefaultUser from "../cards/defaultUser";
import Submit from "components/display/Submit";
import { USER } from "store/actionTypes";

const Landing = () => {
  const user = useSelector(getUserElements);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: USER.TYPE, payload: "Default" });
    dispatch({ type: USER.ENVIRONMENT, payload: "Test" });
  }, [dispatch]);
  return (
    <React.Fragment>
      <div style={{ margin: "0px 15%" }}>
        <Grid columns={user.type === "Custom" ? 2 : 1} divided stackable>
          <Grid.Column>
            <Header />
            {user.type === "Custom" ? (
              <CustomUser {...user} />
            ) : (
              <DefaultUser />
            )}
          </Grid.Column>
          {user.type === "Custom" ? (
            <React.Fragment>
              <Grid.Column>
                <UserForm />
              </Grid.Column>
            </React.Fragment>
          ) : null}
          <Container style={{ margin: "15px auto" }}>
            <Submit />
          </Container>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default connect(null, null)(Landing);
