const express = require('express');
const app = express();
const port = 3000;
const { execSync } = require('child_process');

app.get('/', (req, res) => {
  execSync('sh hook.sh');
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Hook running at 127.0.0.1:${port}`));
