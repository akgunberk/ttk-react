import { collection } from "core/initApp";

export async function deleteUser(id: string) {
  return await collection.deleteOne({ id }).then(() => console.log("deleted"));
}

export async function getAllUsers() {
  return await collection.find().then((users) => users);
}
