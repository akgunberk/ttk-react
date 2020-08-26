import React from "react";
import { Card, Image } from "semantic-ui-react";
import pokemon from "images/pokemon-destek.png";
import { useSelector } from "react-redux";
import { getUserElements, getCardElements } from "core/store/selectors";
import ClipBoardButton from "components/container/withClipboard";

const DefaultUser: React.FC = () => {
  const user = useSelector(getUserElements);
  const { userId, email, password, accessToken } = useSelector(getCardElements);
  return (
    <React.Fragment>
      <Card centered>
        <Image
          src={pokemon}
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
        />
        <Card.Content>
          <Card.Header>Pokemon Destek</Card.Header>
          <Card.Meta>
            <span>Ash Ketchum</span>
          </Card.Meta>
          <Card.Description>
            I wanna be the very best like no one ever was
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          {userId ? <ClipBoardButton name="Id" copy={userId} /> : null}
          {email ? <ClipBoardButton name="Email" copy={email} /> : null}
          {password ? (
            <ClipBoardButton name="Password" copy={password} />
          ) : null}
          {accessToken ? (
            <ClipBoardButton name="Token" copy={accessToken} />
          ) : null}
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

export default DefaultUser;
