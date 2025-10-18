import { IndexType } from "node-appwrite";

import { db, questionCollection } from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";
import { log } from "console";

export default async function createQuestionCollection() {
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Question collection is created");

  //created attributes and Indixes

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      50,
      false
    ),
  ]);
  console.log("Questions Attributes are created");

  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["ascs"]
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["title"],
      ["ascs"]
    ),
  ]);
}
