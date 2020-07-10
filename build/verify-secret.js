"use strict";
exports.__esModule = true;
exports.verifySecret = void 0;
var crypto_1 = require("crypto");
exports.verifySecret = function (payload, secret, checksum) {
    var hmac = crypto_1.createHmac('sha1', secret);
    var digestString = "sha1=" + hmac.update(payload).digest('hex');
    var digest = Buffer.from(digestString, 'utf8');
    return checksum.length === digest.length && crypto_1.timingSafeEqual(digest, checksum);
};
//# sourceMappingURL=verify-secret.js.map