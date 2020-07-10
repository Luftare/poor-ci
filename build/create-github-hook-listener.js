"use strict";
exports.__esModule = true;
exports.createGithubHookListener = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var validate_signature_1 = require("./validate-signature");
exports.createGithubHookListener = function (_a) {
    var secret = _a.secret, onAuthorizedCall = _a.onAuthorizedCall;
    var app = express();
    app.use(bodyParser.json());
    app.post('/', validate_signature_1.validateSignature(secret), function (req, res) {
        onAuthorizedCall();
        res.sendStatus(200);
    });
    return app;
};
//# sourceMappingURL=create-github-hook-listener.js.map