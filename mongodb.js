// CRUD

//gives us access to all the mongodb methods; this is an object.
// const mongodb = require("mongodb");
// //gives us access to the function necessary to connect to the database so we can CRUD
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

//the IP address is the localhost IP address, it performs better.
//this is the mongodb protocol
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

//to connect to the db, passing in url and an options object.
//the single option has to do with the old urlParser being deprecate
//
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    //creates and manipulates db, returns reference object
    const db = client.db(databaseName);
  }
);
