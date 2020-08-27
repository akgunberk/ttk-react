import React from "react";
import { Card, Image, Flag, Icon } from "semantic-ui-react";
import ClipBoardButton from "components/container/withClipboard";
import { useSelector } from "react-redux";
import { getUserElements, getCardElements } from "../../core/store/selectors";

const images = require.context("images", true);

const CustomUser = () => {
  const user = useSelector(getUserElements);
  const { userId, email, password, accessToken } = useSelector(getCardElements);
  return (
    <Card centered>
      <Image
        circular
        src={images("./" + (user.country ? user.country : "tr") + ".png")}
        wrapped
        ui={false}
        label={
          user.environment !== ""
            ? {
                as: "a",
                color: user.environment === "Test" ? "red" : "blue",
                content: user.environment === "Test" ? "TEST" : "STAGE",
                ribbon: true,
              }
            : null
        }
      ></Image>
      <Card.Content>
        <Card.Header>
          <span>Serbest Meslek Erbabı</span>
        </Card.Header>
        <Card.Meta>
          ShapeShifter
          <span>
            <Flag
              style={{ marginLeft: "4px" }}
              name={user.country}
              size="huge"
            />
          </span>
        </Card.Meta>
        <Card.Description>
          <div> Valar Morghulis</div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        {userId ? <ClipBoardButton name="Id" copy={userId} /> : null}
        {email ? <ClipBoardButton name="Email" copy={email} /> : null}
        {password ? <ClipBoardButton name="Password" copy={password} /> : null}
        {accessToken ? (
          <ClipBoardButton name="Token" copy={accessToken} />
        ) : null}
      </Card.Content>
      <Icon name="user" />
    </Card>
  );
};

export default CustomUser;
