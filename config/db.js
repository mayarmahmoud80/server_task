const mongoose = require("mongoose");
const connectToDB = () => {
    mongoose.connect("mongodb://localhost:27017/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

module.exports = connectToDB