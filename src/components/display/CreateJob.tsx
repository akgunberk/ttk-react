import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import UserForm from "components/forms/userForm";

const CreateJob = (props: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      closeIcon
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.children}
    >
      <Modal.Header>Create Job</Modal.Header>
      <Modal.Content image>
        <UserForm />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Next"
          labelPosition="right"
          icon="plus"
          onClick={() => {
            setOpen(false);
            CreateJob("a");
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateJob;
