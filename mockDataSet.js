import { UsersDB } from "./models/userModel.js";

export async function createDataSet() {
  const firstNames = [
    "Eden",
    "Benny",
    "John",
    "Mary",
    "Dana",
    "Ronen",
    "Jacob",
    "Noa",
    "Cori",
    "Lior",
  ];
  const lastNames = [
    "Alush",
    "Smith",
    "Ben Dahan",
    "Doe",
    "Raskin",
    "Jerom",
    "Dibala",
    "Manted",
    "Ronaldo",
    "Arikson",
  ];
  let names = [];

  for (const firstName of firstNames) {
      for(const lastName of lastNames)
        names.push(firstName + " " + lastName);
  }
  shuffleArray(names);
  createFakeInformation(names);
  await pushToDB(names);
  await createConnections(names);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createFakeInformation(array) {
  for (const i in array) {
    array[i] = {
      name: array[i],
      creation_date: new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ),
      img:
        "https://avatars.githubusercontent.com/u/" +
        Math.floor(Math.random() * 62000),
      profile_link: "https://github.com/" + array[i].replace(" ", ""),
      followers: [],
    };
  }
}

async function pushToDB(users) {
  users.forEach(async (user) => {
    await UsersDB(user).save((err) => {
      if (err) console.log(err);
    });
  });
}

async function createConnections(array) {
  for (const user of array) {
    const randomUsers = await UsersDB.aggregate([
      { $match: { name: { $ne: user.name } } },
      { $sample: { size: Math.floor(Math.random() * 10) } },
      { $group: { _id: "$_id", document: { $push: "$$ROOT" } } },
    ])

    await UsersDB.updateOne({ name: user.name }, { $set: { followers: randomUsers } });
  }

  console.log('Done creating data set in DB')
}
