require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const { execSync } = require('child_process');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const secret = process.env.GITHUB_HOOK_SECRET;
const sigHeaderName = 'X-Hub-Signature';

app.use(bodyParser.json());

function verifyPostData(req, res, next) {
  const payload = JSON.stringify(req.body);
  if (!payload) {
    return next('Request body empty');
  }

  const sig = req.get(sigHeaderName) || '';
  const hmac = crypto.createHmac('sha1', secret);
  const digest = Buffer.from(
    'sha1=' + hmac.update(payload).digest('hex'),
    'utf8'
  );
  const checksum = Buffer.from(sig, 'utf8');
  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    return next(
      `Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`
    );
  }
  return next();
}

app.post('/', verifyPostData, (req, res) => {
  execSync('sh push-hook.sh');
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Hook running at 127.0.0.1:${port}`));
