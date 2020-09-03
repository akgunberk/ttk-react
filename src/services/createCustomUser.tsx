import { useState } from "react";
import store from "core/store/index";
import { dispatchDefaultUser } from "core/store/actions";
import { collection, Application } from "core/initApp";
import { useSelector } from "react-redux";
import { getUserElements } from "core/store/selectors";
import { DefaultPayload } from "./shared";
import { Payload, With, Create } from "./models";

export function CreateCustomUser(environment: string) {
  const payload: Payload = JSON.parse(JSON.stringify(DefaultPayload));

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // to prevent SSL
  const url = `https://ttk.armut.${environment}/operate`;

  const user = useSelector(getUserElements);
  const [isLoading, setLoading] = useState(false);

  const loadCustomUser = () => {
    /*  if (user.country) {
      payload.commands?.push(With.COUNTRY);
      payload.commandContext = {
        ...payload.commandContext,
        countryId: user.country,
      };
    } */
    if (user.job) {
      payload.commands?.push(With.JOB);
      payload.jobTestContext = {
        operation: Create.JOB,
        commands: [With.SERVICEID],
        commandContext: {
          serviceId: parseInt(user.service),
        },
      };
      if (user.date) {
        payload.jobTestContext.commands?.push(With.JOBDATE);
        payload.jobTestContext.commandContext = {
          ...payload.jobTestContext.commandContext,
          jobDate: user.date,
        };
      }
      if (user.deal) {
        payload.jobTestContext.commands?.push(With.DEAL);
        payload.jobTestContext.commandContext = {
          ...payload.jobTestContext.commandContext,
          jobDate: user.date,
        };
        payload.jobTestContext.proTestContext = {
          operation: Create.PRO,
          commands: [With.CREDITCARD, With.BALANCE],
          commandContext: { proBalance: 10000 },
        };
      } else if (!user.deal) {
        payload.jobTestContext.commands?.push(With.QUOTES);
      }
    }
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
  return [isLoading, loadCustomUser] as const;
}
