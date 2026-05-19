const express = require("express");
const cors = require("cors");
const jsonGraphqlServer =
  require("json-graphql-server").default || require("json-graphql-server");

const data = require("./db");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/graphql", jsonGraphqlServer(data));

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
