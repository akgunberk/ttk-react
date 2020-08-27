import * as Realm from "realm-web";
import { mongodb } from "./db/constants";
import { RedirectUri } from "assets/constants";

export const Application = new Realm.App({ id: "ttk-ui-cvkwt" });

export const Mongo = Application.services.mongodb(mongodb.service);

export const collection = Mongo.db(mongodb.database).collection(
  mongodb.collection
);

export async function LoginWithGoogle(dispatch) {
  const credentials = Realm.Credentials.google(RedirectUri);
  Application.logIn(credentials).then((user) => {
    dispatch({ type: "userId", payload: user.id });
    console.log("signed in successfully with id:" + user.id);
  });
}
