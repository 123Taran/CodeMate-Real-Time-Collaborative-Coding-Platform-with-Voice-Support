const express = require("express");
const connectionDb = require("./config/db");
const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/api/user",userRoutes);

app.get("/",function(req,res){
    res.send("Hello world!");
})

connectionDb().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port: 3000 ");
  });
});