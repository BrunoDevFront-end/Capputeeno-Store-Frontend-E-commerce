const express = require("express");
const cors = require("cors");
const jsonGraphqlServer =
  require("json-graphql-server").default || require("json-graphql-server");

const data = require("./db");

const app = express();

/**
 * CORS correto para local + Vercel + produção
 */
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.48:3000",
    /\.vercel\.app$/, // permite qualquer deploy da Vercel
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/**
 * JSON GraphQL Server
 */
app.use("/graphql", jsonGraphqlServer(data));

/**
 * Health check (opcional, mas ajuda no Render)
 */
app.get("/", (req, res) => {
  res.send("🚀 API running");
});

/**
 * Porta do Render
 */
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
