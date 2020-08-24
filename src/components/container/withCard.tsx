import React from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { CardElement } from "assets/propTypes";
import ClipBoardButton from "./withClipboard";

const WithCard: React.FC<{ card: CardElement; onDelete: any }> = ({
  card,
  onDelete,
}) => {
  return (
    <React.Fragment>
      <Card color="red">
        <Label attached="top">{card.id}</Label>
        <Card.Content>
          <Card.Header>{card.name}</Card.Header>
          <Card.Meta>
            <ClipBoardButton name="Email" copy={card.email} />
          </Card.Meta>
          <Card.Meta>
            <ClipBoardButton name="Password" copy={card.password} />
          </Card.Meta>
          <Card.Description>
            <ClipBoardButton name="Token" copy={card.accessToken} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="red" onClick={() => onDelete(card.id)}>
            Delete User
          </Button>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

export default WithCard;
