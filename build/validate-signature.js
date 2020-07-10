"use strict";
exports.__esModule = true;
exports.validateSignature = void 0;
var verify_secret_1 = require("./verify-secret");
var SIGNATURE_HEADER_NAME = 'X-Hub-Signature';
exports.validateSignature = function (secret) { return function (req, res, next) {
    var payload = JSON.stringify(req.body);
    if (payload.length <= 2) {
        res.status(400);
        return next('Request body empty');
    }
    var signature = req.get(SIGNATURE_HEADER_NAME) || '';
    var checksum = Buffer.from(signature, 'utf8');
    if (verify_secret_1.verifySecret(payload, secret, checksum)) {
        next();
    }
    else {
        res.status(403);
        next("Request body digest did not match " + SIGNATURE_HEADER_NAME + " (" + checksum + ")");
    }
}; };
//# sourceMappingURL=validate-signature.js.map