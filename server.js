const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Разрешаем запросы из всех источников (для примера, не рекомендуется в production)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Роут для получения данных из db.json
app.get("/api/data", (req, res) => {
  const dbPath = path.join(__dirname, "db.json");
  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
