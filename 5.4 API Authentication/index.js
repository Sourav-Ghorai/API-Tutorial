import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const myUsername = "chirag";
const myPassword = "chirag123";
const myAPIKey = "0e55dc39-0826-4544-b5d4-ef97ac4003d2";
const myBearerToken = "bd122f53-27e9-4877-90ae-8732d85fc875";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try{
   const response = await axios.get("https://secrets-api.appbrewery.com/random");
   res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
   res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
   const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username: myUsername,
        password: myPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
   res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try{
   const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${myAPIKey}`);
   res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
   res.status(404).send(error.message);
  }
});

// const config = {
//    headers: { Authorization: `Bearer ${myBearerToken}` }
// };
app.get("/bearerToken", async (req, res) => {
  try{
   const response = await axios.get("https://secrets-api.appbrewery.com/secrets/1", {
    headers: { 
      Authorization: `Bearer ${myBearerToken}` 
    },
  });
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
   res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
