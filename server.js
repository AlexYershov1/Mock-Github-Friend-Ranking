import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { createDataSet } from "./mockDataSet.js";
import "dotenv/config.js";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { Graph } from "./classes/graph.js";
import { router } from "./routes/userDataRouter.js";
import cors from 'cors'

const MONGO_URI = process.env.MONGODB_URI;
const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export let graph

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(cors())

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.use(
  session({
    secret: "ljadfhlkjdhvkja3wuu2749q82yfujwbc",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { secure: false, maxAge: 24 * 3600000 },
  })
);

app.use('/', router)

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Mongo is connected");
    
    // Remove comment to add 100 random users to DB
    // wait for message: 'Done creating data set in DB' in console, it might take up to a minute
    // warning: the 100 random users are made of constants, so make 
    //          sure to clear DB before creating the users to avoid duplicates
    // await createDataSet()

    graph = new Graph()
  })
  .catch((err) => console.log(err + "unable to connect"));