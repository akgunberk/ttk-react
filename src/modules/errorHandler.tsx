import React, { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import { ErrorContext } from "core/store/ContextApi/Context";
export const ErrorHandler: React.FC = () => {
  let { error, setError } = useContext(ErrorContext);

  return (
    <Modal
      size="tiny"
      onClose={() => setError(false)}
      onOpen={() => setError(true)}
      open={error}
    >
      <Modal.Header>Somethings wrong...</Modal.Header>
      <Modal.Actions>
        <Button color="black" onClick={() => setError(false)}>
          Nope
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
