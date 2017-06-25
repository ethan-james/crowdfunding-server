"use strict";

import {MongoClient, ObjectId} from 'mongodb'

const MONGO_DATABASE = "corgo";
const MONGO_URL = `mongodb://admin:${process.env.MONGO_PASSWORD}@corgo-shard-00-00-lx3by.mongodb.net:27017,corgo-shard-00-01-lx3by.mongodb.net:27017,corgo-shard-00-02-lx3by.mongodb.net:27017/${MONGO_DATABASE}?ssl=true&replicaSet=corgo-shard-0&authSource=admin`;

let _db;

const connect = async () => {
  if (!_db) {
    _db = await MongoClient.connect(MONGO_URL);
  }
  return _db;
};

const prepare = (o) => {
  if (o) {
    o._id = o._id.toString();
    o.id = o._id;
  }

  return o;
}

export const find = async (c, query) => {
  const db = await connect();

  if (typeof query == "string") {
    return prepare(await db.collection(c).findOne(ObjectId(query)));
  } else {
    return prepare(await db.collection(c).findOne(query));
  }
};

export const all = async (c, query = {}) => {
  const db = await connect();
  return (await db.collection(c).find(query).toArray()).map(prepare);
};

export const insert = async(c, args) => {
  const db = await connect();
  const res = await db.collection(c).insert(args);
  return prepare(await db.collection(c).findOne(res.insertedIds[0]));
};
