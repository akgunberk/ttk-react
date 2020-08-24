import React from "react";
import { Message, Icon } from "semantic-ui-react";

const WithMessage: React.FC<{
  message: string;
  header?: string;
  error?: boolean;
}> = ({ message, header, error = false }) => (
  <div>
    <Message floating icon>
      {error ? <Icon name="warning circle" /> : null}
      <Message.Content>
        <Message.Header>{header}</Message.Header>
        <p>{message} </p>
      </Message.Content>
    </Message>
  </div>
);

export default WithMessage;
