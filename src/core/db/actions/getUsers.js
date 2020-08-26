import { collection } from "core/db";

export async function getUsers() {
  return await collection.find().then((users) => users);
}
