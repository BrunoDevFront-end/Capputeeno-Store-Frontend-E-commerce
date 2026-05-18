const express = require("express");
const { jsonGraphqlExpress } = require("json-graphql-server");
const data = require("./db");

const app = express();

app.use("/graphql", jsonGraphqlExpress(data));

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
