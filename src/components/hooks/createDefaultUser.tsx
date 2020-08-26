import { useState } from "react";
import store from "core/store/index";
import { dispatchDefaultUser } from "core/store/actions";
import { app, collection } from "core/initApp";

const payload = {
  operation: "CREATEUSER",
  commands: ["WITHPHONECONFIRMATION", "WITHPASSWORD"],
};

export function CreateDefaultUser(environment: string) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // to prevent SSL
  const url = `https://ttk.armut.${environment}/operate`;

  const [isLoading, setState] = useState(false);

  const loadUser = () => {
    setState(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((user) => {
        const { responseContext, error } = user;
        if (error) return;
        const { accessToken, password, model } = responseContext[0];
        const { user_id, email, first_name } = model;
        if (!error) {
          store.dispatch(
            dispatchDefaultUser({
              user_id,
              email,
              password,
              accessToken,
              name: first_name,
            })
          );
          collection.insertOne({
            user_id: app.currentUser?.id,
            id: user_id,
            environment,
            email,
            password,
            accessToken,
            name: first_name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setState(false);
      });
  };
  return [isLoading, loadUser] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
