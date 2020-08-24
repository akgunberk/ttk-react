import {
  Stitch,
  RemoteMongoClient,
  //AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} from "mongodb-stitch-browser-sdk";

export const client = Stitch.initializeDefaultAppClient("ttk-ui-cvkwt");

export const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("ttk-ui-db");

export const collection = db.collection("test");

export async function fetchUsers() {
  return await collection
    .find()
    .asArray()
    .then((users) => users);
}

export async function deleteUser(id) {
  return await collection
    .deleteOne({ id })
    .then((res) => console.log("deleted"));
}

export async function logDB(email, password) {
  const credential = new UserPasswordCredential(email, password);
  try {
    const authedUser = await client.auth.loginWithCredential(credential);
    console.log(`successfully logged in with id: ${authedUser.id}`);
    return { success: true, id: authedUser.id, error: undefined };
  } catch (err) {
    console.error(`login failed with error: ${err}`);
    return { success: false, error: err };
  }
}

export async function SignUp(email, password) {
  const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(
    UserPasswordAuthProviderClient.factory
  );

  try {
    await emailPasswordClient.registerWithEmail(email, password);
    return { success: true, error: undefined };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
}

export async function confirmUser() {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get("token");
  const tokenId = params.get("tokenId");

  // Confirm the user's email/password account
  const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
    UserPasswordAuthProviderClient.factory
  );
  return emailPassClient.confirmUser(token, tokenId);
}

export function resendConfirmation(email) {
  const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
    UserPasswordAuthProviderClient.factory
  );

  emailPassClient
    .sendResetPasswordEmail(email)
    .then(() => {
      console.log("Successfully sent password reset email!");
    })
    .catch((err) => {
      console.log("Error sending password reset email:", err);
    });
}
