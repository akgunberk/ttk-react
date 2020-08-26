import * as Realm from "realm-web";

import { mongodb } from "./db/constants";

export const app = new Realm.App({ id: "ttk-ui-cvkwt" });

export const mongo = app.services.mongodb(mongodb.service);

export const collection = mongo
  .db(mongodb.database)
  .collection(mongodb.collection);

export async function SignUp(email, password) {
  try {
    await app.emailPasswordAuth.registerUser(email, password);
    return { success: true, error: undefined };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

export async function LogIn(email, password) {
  const credential = Realm.Credentials.emailPassword(email, password);
  try {
    const authedUser = await app.logIn(credential);
    console.log(`successfully logged in with id: ${authedUser.id}`);
    return { success: true, id: authedUser.id, error: undefined };
  } catch (err) {
    console.error(`login failed with error: ${err}`);
    return { success: false, error: err };
  }
}

export async function ConfirmUser() {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get("token");
  const tokenId = params.get("tokenId");

  return app.emailPasswordAuth.confirmUser(token, tokenId);
}

export function SendResetPasswordEmail(email) {
  return app.emailPasswordAuth
    .sendResetPasswordEmail(email)
    .then(() => {
      console.log("Successfully sent password reset email!");
    })
    .catch((err) => {
      console.log("Error sending password reset email:", err);
    });
}
