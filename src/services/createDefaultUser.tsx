import { useState } from "react";
import store from "core/store/index";
import { dispatchDefaultUser } from "core/store/actions";
import { Application, collection } from "core/initApp";

const payload = {
  operation: "CREATEUSER",
  commands: ["WITHPHONECONFIRMATION", "WITHPASSWORD"],
};

export function CreateDefaultUser(environment: string) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // to prevent SSL
  const url = `https://ttk.armut.${environment}/operate`;

  const [isLoading, setState] = useState(false);

  const controller = new AbortController();
  const signal = controller.signal;

  const loadUser = () => {
    setState(true);
    setTimeout(() => controller.abort(), 20000);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      signal,
    })
      .then((res) => res.json())
      .then((user) => {
        const { responseContext, error } = user;
        if (error) return;
        const { accessToken, password, model } = responseContext[0];
        const { user_id, email, first_name } = model;
        if (!error) {
          let imageId = Math.floor(Math.random() * Math.floor(151));
          store.dispatch(
            dispatchDefaultUser({
              user_id,
              email,
              password,
              accessToken,
              name: first_name,
              imageId,
            })
          );
          collection.insertOne({
            user_id: Application.currentUser?.id,
            id: user_id,
            environment,
            email,
            password,
            accessToken,
            name: first_name,
            imageId,
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
