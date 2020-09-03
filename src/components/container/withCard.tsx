import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { CardElement } from "assets/propTypes";
import ClipBoardButton from "./withClipboard";
import CreateJob from "components/display/CreateJob";

const WithCard: React.FC<{ card: CardElement; onDelete: any; key: number }> = ({
  card,
  onDelete,
}) => {
  const handleClick = () => console.log("X");
  return (
    <React.Fragment>
      <Card color="red">
        <Image
          src={`https://pokeres.bastionbot.org/images/pokemon/${card.imageId}.png`}
          wrapped
          ui={false}
          size="small"
          style={{ width: "auto", height: "auto" }}
        />
        <Card.Content style={{ textAlign: "center" }}>
          <Card.Header style={{ marginBottom: "20px" }}>
            {card.name}
          </Card.Header>
          <Card.Meta>
            <ClipBoardButton name="User Id" copy={card.id} />
          </Card.Meta>
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
          <Button.Group>
            <CreateJob>
              <Button basic color="green" onClick={handleClick}>
                Create Job
              </Button>
            </CreateJob>
            <Button basic color="red" onClick={() => onDelete(card.id)}>
              Delete User
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

export default WithCard;
