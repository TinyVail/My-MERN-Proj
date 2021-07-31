const mongoose = require("mongoose");

const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://TinyVail:${password}@cluster0.nf8bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

module.exports = mongoose.connection;
