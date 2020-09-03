import React from "react";
import WithCard from "components/container/withCard";
import { getAllUsers, deleteUser } from "core/db/services";
import { Button, Dimmer, Loader, Grid } from "semantic-ui-react";
import { history } from "App";
import { CardElement } from "assets/propTypes";

type Props = {
  env: string;
};

export default class Saved extends React.Component<Props> {
  state: { users: CardElement[]; loading: boolean } = {
    users: [],
    loading: true,
  };
  async componentDidMount() {
    const users = await getAllUsers();
    this.setState({ users, loading: false });
  }
  render() {
    const handleDelete = (user_id: string) => {
      this.setState({ ...this.state, loading: true });
      deleteUser(user_id)
        .then(() =>
          this.setState({
            users: this.state.users.filter((user) => user.id !== user_id),
            loading: false,
          })
        )
        .catch(() => console.log("cant deleted..."));
    };
    return (
      <div>
        {this.state.loading ? (
          <Dimmer active={this.state.loading}>
            <Loader />
          </Dimmer>
        ) : this.state.users.filter(
            (user) => user.environment === this.props.env
          ).length ? (
          <Grid
            container
            stackable
            stretched
            columns="4"
            style={{ margin: "auto auto" }}
            centered
          >
            <Grid.Row centered verticalAlign="middle">
              <h1>{this.props.env}</h1>
            </Grid.Row>
            {this.state.users
              .filter((user) => user.environment === this.props.env)
              .map((user, id) => (
                <Grid.Column key={id}>
                  <WithCard
                    card={user}
                    key={id}
                    onDelete={(user_id: string) => handleDelete(user_id)}
                  />
                </Grid.Column>
              ))}
          </Grid>
        ) : (
          <React.Fragment>
            <h1>There is no saved user</h1>
            <Button color="green" onClick={() => history.push("/")}>
              Go to Create One
            </Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}
