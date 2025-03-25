const mongoose = require("mongoose");
const initData = require("./data");
const List = require("../models/list");
const mongourl = "mongodb://127.0.0.1:27017/collegehub";

async function main() {
  await mongoose.connect(mongourl);
}

main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const initDB = async () => {
  await List.deleteMany({});
  await List.insertMany(initData.data);
  console.log("Database seeded");
};
initDB();
