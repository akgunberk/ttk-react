import { collection } from "core/db";

export async function deleteUser(id) {
  return await collection.deleteOne({ id }).then(() => console.log("deleted"));
}
