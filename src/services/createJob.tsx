import { useState } from "react";
import store from "core/store/index";
import { dispatchDefaultUser } from "core/store/actions";
import { collection, Application } from "core/initApp";
import { DefaultPayload } from "./shared";
import { Payload } from "./models";

export function CreateCustomUser(environment: string) {
  const payload: Payload = JSON.parse(JSON.stringify(DefaultPayload));

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // to prevent SSL
  const url = `https://ttk.armut.${environment}/operate`;

  const [isLoading, setLoading] = useState(false);

  const createJob = () => {
    console.log("job creation");

    console.log(payload);

    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((user) => {
        const { responseContext, error } = user;
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
          collection
            .insertOne({
              user_id: Application.currentUser?.id,
              id: user_id,
              email,
              password,
              accessToken,
              first_name,
              imageId,
            })
            .then((result) =>
              console.log(
                `Successfully inserted item with _id: ${result.insertedId}`
              )
            )
            .catch((err) => console.error(`Failed to insert item: ${err}`));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return [isLoading, createJob] as const;
}
