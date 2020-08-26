import React, { useState, useEffect } from "react";
import { ConfirmUser, app } from "core/db";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router";
import WithMessage from "components/container/withMessage";

export const Confirmation: React.FC = () => {
  const [error, setError] = useState(false);
  const [mail, setMail] = useState("");
  const history = useHistory();
  const resendMail = async () => {
    console.log(mail);
    await app.emailPasswordAuth
      .resendConfirmationEmail(mail)
      .catch(() => console.log("error"));
  };
  useEffect(() => {
    try {
      ConfirmUser()
        .then((res) => history.push("/login"))
        .catch(() => setError(true));
    } catch (error) {
      setError(true);
    }
  }, [history]);
  return (
    <React.Fragment>
      {error ? (
        <div style={{ display: "block" }}>
          <WithMessage
            header="Please try to login with your email and password"
            message="If you cant login it means you had a trouble with confirmation of your email."
          />
          <Form.Input
            icon="user"
            iconPosition="left"
            type="email"
            placeholder="Email"
            onChange={(e, data) => setMail(data.value)}
            style={{ marginTop: "25px" }}
          />
          <Button style={{ marginTop: "10px" }} primary onClick={resendMail}>
            Resend Confirmation Mail
          </Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};