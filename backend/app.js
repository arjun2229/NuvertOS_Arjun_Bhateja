const compoundRouter = require("./routes/compoundRoutes");
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync().then(() => {
    console.log("DB synced succesfully!");
}).catch((err) => {
    console.error("Failed to Sync DB: " + err.message);
});


app.use("/api/compound", compoundRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});