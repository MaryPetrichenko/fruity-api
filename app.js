const express = require("express")
const app = express()

const logger = require("./logger")

//middleware
app.use(express.json())
app.use(logger)  // will run on every pat

const fruitsRouter = require("./routes/fruits")

app.get("/", (req, res) => {
  res.send("Hello Fruity!");
});

app.use("/fruits", fruitsRouter)



module.exports = app






