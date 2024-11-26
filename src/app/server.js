const express = require("express");
const path = require("path");
const app = express();

const appDir = path.join(__dirname, "dist/casa-financeiro-app");
app.use(express.static(appDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(appDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
